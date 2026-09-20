// Single source of truth for which Stellar network this app talks to.
//
// StableShield has no real, KYC'd mainnet anchor partner yet, so wallet
// connect, balance reads (Horizon) and the SEP-24 deposit flow (anchor: see
// ANCHOR_DOMAIN in sep24.ts) default to TESTNET. Keeping them on the same
// network is what makes a completed test deposit actually show up in the
// balance shown on the dashboard.
//
// All three values below are overridable via Vite env vars (e.g. Vercel
// project settings) without touching code:
//   VITE_HORIZON_URL        → Horizon endpoint for balance reads
//   VITE_NETWORK_PASSPHRASE → the network passphrase Horizon/the anchor use
//   VITE_ANCHOR_URL         → the anchor's domain or SEP-24 URL (see sep24.ts)
//
// USDC_ISSUER is NOT env-configurable: it must match whichever anchor mints
// the USDC (VITE_ANCHOR_URL) — if you point at a different anchor, update
// this constant to that anchor's own USDC issuer (check its stellar.toml).

function readEnv(key: string, fallback: string): string {
  const value = import.meta.env[key];
  return typeof value === "string" && value.trim() !== "" ? value.trim() : fallback;
}

export const NETWORK_PASSPHRASE = readEnv("VITE_NETWORK_PASSPHRASE", "Test SDF Network ; September 2015");
export const HORIZON_URL = readEnv("VITE_HORIZON_URL", "https://horizon-testnet.stellar.org");

const MAINNET_PASSPHRASE = "Public Global Stellar Network ; September 2015";
export const NETWORK_LABEL = NETWORK_PASSPHRASE === MAINNET_PASSPHRASE ? "Mainnet" : "Testnet";

// The USDC trustline issued by testanchor.stellar.org on testnet (confirmed
// against its stellar.toml) — this is the asset a completed deposit through
// that anchor actually mints, so it's what balance reads must match.
export const USDC_ASSET_CODE = "USDC";
export const USDC_ISSUER = "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5";
