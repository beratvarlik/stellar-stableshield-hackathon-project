import { StellarWalletsKit } from "./stellarWalletsKit";
import { translations, type Language } from "../i18n/translations";

// The anchor to use for the SEP-24 interactive deposit flow. StableShield has
// no real anchor partner (yet), so this defaults to Stellar's own official
// reference anchor — a real, live SEP-24 server that lets the whole flow
// (SEP-10 auth, interactive widget, status polling) be exercised end to end.
// It runs on TESTNET, matching ./network.ts, so a completed deposit's USDC
// DOES show up in the balance read there. Swap both for mainnet equivalents
// (this domain for a real, KYC'd anchor; ./network.ts for mainnet Horizon +
// Circle's mainnet USDC issuer) once a production anchor is integrated.
export const ANCHOR_DOMAIN = "testanchor.stellar.org";
export const DEPOSIT_ASSET_CODE = "USDC";

export type Sep24Status =
  | "incomplete"
  | "pending_user_transfer_start"
  | "pending_anchor"
  | "pending_stellar"
  | "pending_external"
  | "pending_trust"
  | "completed"
  | "refunded"
  | "expired"
  | "error"
  | (string & {});

export interface Sep24Transaction {
  id: string;
  status: Sep24Status;
  message?: string;
  [key: string]: unknown;
}

const TERMINAL_STATUSES = new Set<Sep24Status>(["completed", "refunded", "expired", "error"]);

export function isTerminalStatus(status: Sep24Status): boolean {
  return TERMINAL_STATUSES.has(status);
}

/** Translated label for a SEP-24 transaction status, for the given UI language. */
export function getStatusLabel(status: Sep24Status, lang: Language): string {
  return translations[lang].sep24Status[status] ?? status;
}

interface AnchorInfo {
  webAuthEndpoint: string;
  transferServer: string;
  signingKey: string;
  networkPassphrase: string;
  homeDomain: string;
}

async function resolveAnchor(domain: string, lang: Language): Promise<AnchorInfo> {
  const { StellarToml } = await import("@stellar/stellar-sdk");
  const toml = await StellarToml.Resolver.resolve(domain, { timeout: 8000 });
  const { WEB_AUTH_ENDPOINT, TRANSFER_SERVER_SEP0024, SIGNING_KEY, NETWORK_PASSPHRASE } = toml;
  if (!WEB_AUTH_ENDPOINT || !TRANSFER_SERVER_SEP0024 || !SIGNING_KEY || !NETWORK_PASSPHRASE) {
    throw new Error(translations[lang].sep24Errors.unsupportedAnchor);
  }
  return {
    webAuthEndpoint: WEB_AUTH_ENDPOINT,
    transferServer: TRANSFER_SERVER_SEP0024,
    signingKey: SIGNING_KEY,
    networkPassphrase: NETWORK_PASSPHRASE,
    homeDomain: domain,
  };
}

/** SEP-10: authenticate the connected wallet with the anchor and return a JWT. */
async function authenticate(anchor: AnchorInfo, publicKey: string, lang: Language): Promise<string> {
  const errors = translations[lang].sep24Errors;
  const { WebAuth } = await import("@stellar/stellar-sdk");

  const challengeUrl = new URL(anchor.webAuthEndpoint);
  challengeUrl.searchParams.set("account", publicKey);
  challengeUrl.searchParams.set("home_domain", anchor.homeDomain);

  const challengeRes = await fetch(challengeUrl.toString());
  if (!challengeRes.ok) {
    throw new Error(errors.challengeFailed(challengeRes.status));
  }
  const { transaction } = (await challengeRes.json()) as { transaction?: string };
  if (!transaction) throw new Error(errors.invalidChallenge);

  // Verify the challenge was really issued (and signed) by the anchor before
  // asking the user's wallet to sign anything.
  WebAuth.readChallengeTx(
    transaction,
    anchor.signingKey,
    anchor.networkPassphrase,
    anchor.homeDomain,
    new URL(anchor.webAuthEndpoint).host,
  );

  const { signedTxXdr } = await StellarWalletsKit.signTransaction(transaction, {
    networkPassphrase: anchor.networkPassphrase,
    address: publicKey,
  });

  const tokenRes = await fetch(anchor.webAuthEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transaction: signedTxXdr }),
  });
  if (!tokenRes.ok) {
    throw new Error(errors.authRejected(tokenRes.status));
  }
  const { token } = (await tokenRes.json()) as { token?: string };
  if (!token) throw new Error(errors.noToken);
  return token;
}

interface InteractiveDepositInit {
  url: string;
  id: string;
}

/** SEP-24: kick off an interactive deposit session and get the hosted UI URL. */
async function initiateInteractiveDeposit(
  anchor: AnchorInfo,
  token: string,
  publicKey: string,
  assetCode: string,
  lang: Language,
): Promise<InteractiveDepositInit> {
  const errors = translations[lang].sep24Errors;
  const form = new FormData();
  form.set("asset_code", assetCode);
  form.set("account", publicKey);
  form.set("lang", lang);

  const res = await fetch(`${anchor.transferServer}/transactions/deposit/interactive`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!res.ok) {
    throw new Error(errors.depositInitFailed(res.status));
  }
  const data = (await res.json()) as { url?: string; id?: string; type?: string };
  if (!data.url || !data.id) {
    throw new Error(errors.invalidDepositResponse);
  }
  return { url: data.url, id: data.id };
}

async function fetchTransaction(
  anchor: AnchorInfo,
  token: string,
  id: string,
  lang: Language,
): Promise<Sep24Transaction> {
  const url = new URL(`${anchor.transferServer}/transaction`);
  url.searchParams.set("id", id);
  const res = await fetch(url.toString(), { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(translations[lang].sep24Errors.statusFetchFailed(res.status));
  const data = (await res.json()) as { transaction: Sep24Transaction };
  return data.transaction;
}

const POLL_INTERVAL_MS = 3000;
const MAX_POLL_ATTEMPTS = 200; // ~10 minutes at the interval above

/** Polls the transaction until it reaches a terminal state or polling is stopped. Returns a stop function. */
function pollTransaction(
  anchor: AnchorInfo,
  token: string,
  id: string,
  lang: Language,
  onUpdate: (tx: Sep24Transaction) => void,
  onError: (message: string) => void,
): () => void {
  let stopped = false;
  let attempts = 0;

  const tick = async () => {
    if (stopped) return;
    attempts++;
    try {
      const tx = await fetchTransaction(anchor, token, id, lang);
      if (stopped) return;
      onUpdate(tx);
      if (isTerminalStatus(tx.status)) return;
    } catch (e) {
      console.error("SEP-24 status poll failed:", e);
      // Transient network hiccups shouldn't kill the whole flow — keep retrying.
    }
    if (!stopped && attempts < MAX_POLL_ATTEMPTS) {
      setTimeout(tick, POLL_INTERVAL_MS);
    } else if (!stopped) {
      onError(translations[lang].sep24Errors.pollTimeout);
    }
  };

  void tick();
  return () => {
    stopped = true;
  };
}

export interface StartDepositCallbacks {
  /** Fired once the interactive tab has been opened and status polling begins. */
  onAwaitingUser: (depositUrl: string) => void;
  onStatusUpdate: (tx: Sep24Transaction) => void;
  onError: (message: string) => void;
}

export interface StartDepositHandle {
  /** Stops polling — call this when the user cancels or the modal closes. */
  stop: () => void;
}

/**
 * Runs the full SEP-24 interactive deposit flow: resolves the anchor, performs
 * SEP-10 auth (signed by the connected wallet), opens the anchor's hosted
 * deposit UI in a new tab, and polls the transaction until it completes.
 */
export async function startInteractiveDeposit(
  publicKey: string,
  lang: Language,
  callbacks: StartDepositCallbacks,
): Promise<StartDepositHandle> {
  const anchor = await resolveAnchor(ANCHOR_DOMAIN, lang);
  const token = await authenticate(anchor, publicKey, lang);
  const { url, id } = await initiateInteractiveDeposit(anchor, token, publicKey, DEPOSIT_ASSET_CODE, lang);

  const tab = window.open(url, "_blank", "noopener,noreferrer");
  if (!tab) {
    throw new Error(translations[lang].sep24Errors.popupBlocked);
  }

  callbacks.onAwaitingUser(url);
  const stop = pollTransaction(anchor, token, id, lang, callbacks.onStatusUpdate, callbacks.onError);
  return { stop };
}
