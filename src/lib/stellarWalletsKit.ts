import { StellarWalletsKit, KitEventType, Networks } from "@creit.tech/stellar-wallets-kit";
import { FreighterModule } from "@creit.tech/stellar-wallets-kit/modules/freighter";
import { activeAddress } from "@creit.tech/stellar-wallets-kit/state";

// Runs once on first import (ESM modules are evaluated a single time) — safe to
// call at module scope since StellarWalletsKit is a static singleton class.
// Kept in lockstep with the Horizon/SEP-24 network in ./network.ts — see that
// file for why this app currently runs on testnet end to end.
StellarWalletsKit.init({
  network: Networks.TESTNET,
  modules: [new FreighterModule()],
  authModal: {
    showInstallLabel: true,
  },
});

export { StellarWalletsKit, KitEventType, activeAddress };
