import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { StellarWalletsKit, KitEventType, activeAddress } from "../lib/stellarWalletsKit";
import { fetchUsdcBalance } from "../lib/horizon";
import { tryToUsdc, usdcToTry } from "../lib/format";
import { useLanguage } from "../hooks/useLanguage";
import {
  WalletContext,
  type ConnectResult,
  type DepositResult,
  type Transaction,
  type TransactionLabelKey,
  type WalletContextValue,
} from "./wallet-types";

const TRANSACTIONS_STORAGE_KEY = "stableshield.transactions.v1";
const WITHDRAW_CONFIRM_DELAY_MS = 2000;
const WITHDRAW_ALERT_DISPLAY_MS = 7000;

function loadTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Transaction[];
  } catch {
    return [];
  }
}

function persistTransactions(transactions: Transaction[]) {
  try {
    if (transactions.length === 0) {
      localStorage.removeItem(TRANSACTIONS_STORAGE_KEY);
    } else {
      localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions));
    }
  } catch {
    // localStorage unavailable (private mode, etc.) — non-fatal, state just won't persist.
  }
}

function daysAgoISO(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

function createSeedTransactions(): Transaction[] {
  return [
    {
      id: "seed-1",
      type: "withdraw",
      labelKey: "try_fast_transfer",
      amountTRY: -200,
      dateISO: daysAgoISO(5),
      status: "confirmed",
    },
    {
      id: "seed-2",
      type: "deposit",
      labelKey: "usdc_vault",
      amountTRY: 500,
      dateISO: daysAgoISO(8),
      status: "confirmed",
    },
    {
      id: "seed-3",
      type: "deposit",
      labelKey: "usdc_vault",
      amountTRY: 1200,
      dateISO: daysAgoISO(23),
      status: "confirmed",
    },
    {
      id: "seed-4",
      type: "deposit",
      labelKey: "initial_deposit",
      amountTRY: 2500,
      dateISO: daysAgoISO(41),
      status: "confirmed",
    },
  ];
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const { t } = useLanguage();

  // Read synchronously so a returning, already-authorized user renders as
  // connected on first paint instead of flashing a "disconnected" frame.
  const [address, setAddress] = useState<string | null>(() => activeAddress.value ?? null);
  const [connecting, setConnecting] = useState(false);
  // The ONLY source of truth for the on-chain portion of the balance — always
  // the wallet's real USDC balance as reported by Horizon.
  const [liveUsdcBalance, setLiveUsdcBalance] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [balanceError, setBalanceError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>(() => loadTransactions());
  // Optimistic local overlay for in-flight/just-confirmed withdrawals — see
  // `withdraw` below. Reset on every (re)connect since it only makes sense
  // for the current session.
  const [localAdjustmentTRY, setLocalAdjustmentTRY] = useState(0);
  const [withdrawAlert, setWithdrawAlert] = useState<string | null>(null);

  // Guards against a stale Horizon response overwriting state after the
  // wallet has since disconnected or switched to a different address.
  const fetchTokenRef = useRef(0);

  const refreshBalanceFor = useCallback(async (forAddress: string) => {
    const token = ++fetchTokenRef.current;
    setBalanceLoading(true);
    const result = await fetchUsdcBalance(forAddress);
    if (fetchTokenRef.current !== token) return; // address changed again while this was in flight
    setLiveUsdcBalance(result.balance);
    setBalanceError(result.error);
    setBalanceLoading(false);
  }, []);

  const refreshBalance = useCallback(() => {
    if (address) void refreshBalanceFor(address);
  }, [address, refreshBalanceFor]);

  useEffect(() => {
    const unsubscribe = StellarWalletsKit.on(KitEventType.STATE_UPDATED, (event) => {
      const newAddress = event.payload.address ?? null;
      setAddress(newAddress);
      setLocalAdjustmentTRY(0);
      setWithdrawAlert(null);

      if (!newAddress) {
        fetchTokenRef.current++;
        setLiveUsdcBalance(0);
        setBalanceLoading(false);
        setBalanceError(null);
        setTransactions([]);
        return;
      }

      setTransactions((prev) => {
        if (prev.length > 0) return prev;
        const stored = loadTransactions();
        return stored.length > 0 ? stored : createSeedTransactions();
      });
      void refreshBalanceFor(newAddress);
    });
    return unsubscribe;
  }, [refreshBalanceFor]);

  useEffect(() => {
    persistTransactions(address ? transactions : []);
  }, [address, transactions]);

  useEffect(() => {
    if (!withdrawAlert) return;
    const timer = setTimeout(() => setWithdrawAlert(null), WITHDRAW_ALERT_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, [withdrawAlert]);

  const connect = useCallback(async (): Promise<ConnectResult> => {
    setConnecting(true);
    try {
      await StellarWalletsKit.authModal();
      return { ok: true };
    } catch (e) {
      const message = e instanceof Error ? e.message : (e as { message?: string })?.message;
      return { ok: false, error: message ?? t.walletErrors.connectFailed };
    } finally {
      setConnecting(false);
    }
  }, [t]);

  const disconnect = useCallback(() => {
    void StellarWalletsKit.disconnect();
  }, []);

  const dismissWithdrawAlert = useCallback(() => {
    setWithdrawAlert(null);
  }, []);

  // Called once a SEP-24 deposit's polling reports `completed` (see
  // DepositModal.tsx) so it shows up in the transactions list — the
  // transaction is already real and settled by that point (the anchor
  // confirmed it), so it's logged straight as "confirmed", unlike withdraw's
  // optimistic/pending flow.
  const recordDeposit = useCallback((amountTRY: number, labelKey: TransactionLabelKey = "usdc_vault") => {
    if (!Number.isFinite(amountTRY) || amountTRY <= 0) return;
    const tx: Transaction = {
      id: crypto.randomUUID(),
      type: "deposit",
      labelKey,
      amountTRY,
      dateISO: new Date().toISOString(),
      status: "confirmed",
    };
    setTransactions((prev) => [tx, ...prev]);
  }, []);

  const balanceTRY = usdcToTry(liveUsdcBalance) + localAdjustmentTRY;

  // Withdraw doesn't submit a real Stellar payment yet (no anchor SEP-24
  // withdraw integration), so there's no real transaction to await. What IS
  // real: the balance drops the moment the user confirms (optimistic) and the
  // record appears in the transactions list as pending. In the background we
  // re-read Horizon for this account — the one genuine, non-fabricated signal
  // we have without a live anchor withdraw is whether that read still
  // succeeds. A real failure there (network/Horizon outage) rolls the balance
  // back and surfaces an alert; otherwise the record is marked confirmed.
  // Once a real anchor withdraw exists, swap this check for its actual
  // completion/failure callback (mirrors how sep24.ts drives deposit).
  const withdraw = useCallback(
    (amountTRY: number): DepositResult => {
      if (!address) return { ok: false, error: t.walletErrors.notConnected };
      if (!Number.isFinite(amountTRY) || amountTRY <= 0) {
        return { ok: false, error: t.walletErrors.invalidAmount };
      }
      if (amountTRY > balanceTRY) {
        return { ok: false, error: t.walletErrors.insufficientBalance };
      }

      const txId = crypto.randomUUID();
      const initiatedFor = address;
      const tx: Transaction = {
        id: txId,
        type: "withdraw",
        labelKey: "try_fast_transfer",
        amountTRY: -amountTRY,
        dateISO: new Date().toISOString(),
        status: "pending",
      };

      setTransactions((prev) => [tx, ...prev]);
      setLocalAdjustmentTRY((prev) => prev - amountTRY); // optimistic — visible immediately

      setTimeout(async () => {
        const check = await fetchUsdcBalance(initiatedFor);

        setTransactions((prev) => {
          // Wallet disconnected/switched (or this session was otherwise reset)
          // since the withdrawal was initiated — that reset already cleared
          // the optimistic adjustment and this record, nothing left to do.
          if (!prev.some((tx2) => tx2.id === txId)) return prev;

          if (check.error) {
            setLocalAdjustmentTRY((adj) => adj + amountTRY); // roll back
            setWithdrawAlert(t.walletErrors.withdrawRolledBack(check.error!));
            return prev.map((tx2) => (tx2.id === txId ? { ...tx2, status: "failed" } : tx2));
          }
          return prev.map((tx2) => (tx2.id === txId ? { ...tx2, status: "confirmed" } : tx2));
        });
      }, WITHDRAW_CONFIRM_DELAY_MS);

      return { ok: true };
    },
    [address, balanceTRY, t],
  );

  const value = useMemo<WalletContextValue>(
    () => ({
      connected: address !== null,
      connecting,
      address,
      balanceTRY,
      balanceUSDC: tryToUsdc(balanceTRY),
      balanceLoading,
      balanceError,
      withdrawAlert,
      dismissWithdrawAlert,
      transactions,
      connect,
      disconnect,
      withdraw,
      recordDeposit,
      refreshBalance,
    }),
    [
      address,
      connecting,
      balanceTRY,
      balanceLoading,
      balanceError,
      withdrawAlert,
      dismissWithdrawAlert,
      transactions,
      connect,
      disconnect,
      withdraw,
      recordDeposit,
      refreshBalance,
    ],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}
