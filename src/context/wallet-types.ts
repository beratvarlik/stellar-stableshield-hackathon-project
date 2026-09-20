import { createContext } from "react";

export type TransactionType = "deposit" | "withdraw";
export type TransactionStatus = "pending" | "confirmed" | "failed";
/** Key into `translations.tr(.en).transactions.labels` — translated at render time, not baked in as text. */
export type TransactionLabelKey = "usdc_vault" | "try_fast_transfer" | "initial_deposit";

export interface Transaction {
  id: string;
  type: TransactionType;
  labelKey: TransactionLabelKey;
  amountTRY: number;
  dateISO: string;
  status: TransactionStatus;
}

export interface DepositResult {
  ok: boolean;
  error?: string;
}

export interface ConnectResult {
  ok: boolean;
  error?: string;
}

export interface WalletContextValue {
  connected: boolean;
  connecting: boolean;
  address: string | null;
  balanceTRY: number;
  balanceUSDC: number;
  /** True while the live USDC balance is being fetched from Horizon. */
  balanceLoading: boolean;
  /** Set when the last balance read from Horizon failed (not the same as a real 0 balance). */
  balanceError: string | null;
  /** Set briefly when a pending withdraw is rolled back — the UI should surface and then clear it. */
  withdrawAlert: string | null;
  dismissWithdrawAlert: () => void;
  transactions: Transaction[];
  connect: () => Promise<ConnectResult>;
  disconnect: () => void;
  withdraw: (amountTRY: number) => DepositResult;
  /** Logs an already-settled deposit (e.g. a completed SEP-24 flow) into the transactions list. */
  recordDeposit: (amountTRY: number, labelKey?: TransactionLabelKey) => void;
  /** Re-reads the balance from Horizon — exposed so the UI can offer a retry after a failed read. */
  refreshBalance: () => void;
}

export const WalletContext = createContext<WalletContextValue | null>(null);
