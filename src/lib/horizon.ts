import type { Horizon } from "@stellar/stellar-sdk";
import { HORIZON_URL, USDC_ASSET_CODE, USDC_ISSUER } from "./network";

export interface BalanceResult {
  balance: number;
  /** Set when the read failed for a reason other than "account not found". */
  error: string | null;
}

let sdkPromise: Promise<typeof import("@stellar/stellar-sdk")> | null = null;
let serverPromise: Promise<Horizon.Server> | null = null;

// @stellar/stellar-sdk is large (XDR, crypto, RPC/contract code) — load it only
// once a balance is actually requested instead of on initial app bundle.
function getSdk() {
  if (!sdkPromise) {
    sdkPromise = import("@stellar/stellar-sdk");
  }
  return sdkPromise;
}

async function getServer(): Promise<Horizon.Server> {
  if (!serverPromise) {
    serverPromise = getSdk().then(({ Horizon }) => new Horizon.Server(HORIZON_URL));
  }
  return serverPromise;
}

function isUsdcBalance(
  balance: Horizon.HorizonApi.BalanceLine,
): balance is Horizon.HorizonApi.BalanceLineAsset {
  return (
    "asset_code" in balance &&
    balance.asset_code === USDC_ASSET_CODE &&
    balance.asset_issuer === USDC_ISSUER
  );
}

/**
 * Reads the connected account's USDC balance directly from Horizon.
 *
 * `balance` is 0 both for a genuinely empty/no-trustline account AND when the
 * read failed — callers MUST check `error` to tell those apart, since acting
 * on a failed read as if it were a real zero balance is exactly how "I have
 * funds but the app won't let me use them" bugs happen.
 */
export async function fetchUsdcBalance(publicKey: string): Promise<BalanceResult> {
  try {
    const server = await getServer();
    const account = await server.loadAccount(publicKey);
    const usdcLine = account.balances.find(isUsdcBalance);
    return { balance: usdcLine ? parseFloat(usdcLine.balance) : 0, error: null };
  } catch (e) {
    const { NotFoundError } = await getSdk();
    if (e instanceof NotFoundError) {
      // Account has never received any payment yet — a real, valid 0 balance.
      return { balance: 0, error: null };
    }
    console.error("Failed to fetch USDC balance from Horizon:", e);
    const message = e instanceof Error ? e.message : String(e);
    return { balance: 0, error: `Bakiye Horizon'dan okunamadı: ${message}` };
  }
}
