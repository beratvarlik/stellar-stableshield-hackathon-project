// Single source of truth for which Stellar network this app talks to.
//
// StableShield has no real, KYC'd mainnet anchor partner yet, so wallet
// connect, balance reads (Horizon) and the SEP-24 deposit flow (anchor:
// testanchor.stellar.org, see sep24.ts) all run on TESTNET. Keeping them on
// the same network is what makes a completed test deposit actually show up
// in the balance shown on the dashboard.
//
// To go live on mainnet: point HORIZON_URL at https://horizon.stellar.org,
// swap USDC_ISSUER for Circle's mainnet issuer
// (GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN), set
// NETWORK_PASSPHRASE to the mainnet passphrase, and point sep24.ts's
// ANCHOR_DOMAIN at a real mainnet anchor.

export const NETWORK_LABEL = "Testnet";
export const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";
export const HORIZON_URL = "https://horizon-testnet.stellar.org";

// The USDC trustline issued by testanchor.stellar.org on testnet (confirmed
// against its stellar.toml) — this is the asset a completed deposit through
// that anchor actually mints, so it's what balance reads must match.
export const USDC_ASSET_CODE = "USDC";
export const USDC_ISSUER = "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5";
