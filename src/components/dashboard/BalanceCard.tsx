import { useState } from "react";
import { AlertTriangle, ArrowDown, ArrowUp, RefreshCw, ShieldCheck, X } from "lucide-react";
import { useWallet } from "../../hooks/useWallet";
import { useLanguage } from "../../hooks/useLanguage";
import { formatTRY, formatUSDC } from "../../lib/format";
import { DepositModal } from "./DepositModal";
import { WithdrawModal } from "./WithdrawModal";

export function BalanceCard() {
  const { balanceTRY, balanceUSDC, balanceLoading, balanceError, withdrawAlert, dismissWithdrawAlert, refreshBalance } =
    useWallet();
  const { t } = useLanguage();
  const [modal, setModal] = useState<"deposit" | "withdraw" | null>(null);

  return (
    <>
      <main className="rounded-2xl p-7 sm:p-9 text-center flex flex-col items-center bg-surface-container-lowest border border-surface-dim shadow-[0_4px_20px_-2px_rgba(15,61,46,0.05)]">
        <div className="text-xs tracking-wider uppercase font-semibold text-on-surface-variant/70 mb-1">
          {t.balanceCard.totalLabel}
        </div>
        {balanceLoading ? (
          <div className="h-[3.25rem] sm:h-[3.75rem] flex items-center mb-1">
            <div className="h-9 w-48 rounded-lg bg-surface-container-low animate-pulse" />
          </div>
        ) : balanceError ? (
          <div className="h-[3.25rem] sm:h-[3.75rem] flex items-center mb-1">
            <span className="font-serif-display text-4xl sm:text-5xl font-medium tracking-tight text-outline">
              —
            </span>
          </div>
        ) : (
          <div className="font-serif-display text-4xl sm:text-5xl font-medium tracking-tight text-bronze-600 mb-1 tnum">
            ₺ {formatTRY(balanceTRY)}
          </div>
        )}
        <div className="flex items-center space-x-2 text-sm text-on-surface-variant font-medium mb-5">
          <span>{t.balanceCard.protectedLabel}</span>
          <span className="text-outline-variant">•</span>
          {balanceLoading ? (
            <span className="inline-block h-4 w-20 rounded bg-surface-container-low animate-pulse" />
          ) : balanceError ? (
            <span className="text-xs text-on-surface-variant">{t.balanceCard.unverified}</span>
          ) : (
            <span className="text-xs font-mono text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded tnum">
              {formatUSDC(balanceUSDC)} USDC
            </span>
          )}
        </div>

        {withdrawAlert && (
          <div className="rounded-lg px-4 py-3 flex items-start gap-2.5 max-w-md shadow-xs mb-3 bg-error-container/40 border border-error/30 text-left w-full">
            <AlertTriangle size={16} className="text-error flex-shrink-0 mt-0.5" />
            <p className="flex-1 text-xs sm:text-[13px] font-medium text-error leading-snug">{withdrawAlert}</p>
            <button
              type="button"
              onClick={dismissWithdrawAlert}
              aria-label={t.balanceCard.dismissAlertAria}
              className="text-error/70 hover:text-error shrink-0 cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {balanceError ? (
          <div className="rounded-lg px-4 py-3 flex items-start gap-2.5 max-w-md shadow-xs mb-8 bg-error-container/40 border border-error/30 text-left">
            <AlertTriangle size={16} className="text-error flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-[13px] font-medium text-error leading-snug">
                {t.balanceCard.balanceErrorText}
              </p>
              <button
                type="button"
                onClick={refreshBalance}
                className="mt-1.5 inline-flex items-center gap-1.5 text-label-sm font-semibold text-error hover:underline cursor-pointer"
              >
                <RefreshCw size={12} />
                <span>{t.balanceCard.retry}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-full px-4 py-2 flex items-center space-x-2 max-w-md shadow-xs mb-8 bg-bronze-100 border border-bronze-border">
            <ShieldCheck size={16} className="text-bronze-600 flex-shrink-0" />
            <p className="text-xs sm:text-[13px] font-medium text-bronze-700 tracking-tight leading-none">
              {t.balanceCard.protectionBadge}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setModal("deposit")}
            className="w-full sm:w-44 py-3 px-5 bg-primary-container hover:bg-secondary active:scale-[0.98] text-on-primary font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <ArrowDown size={16} />
            <span>{t.balanceCard.depositButton}</span>
          </button>
          <button
            type="button"
            onClick={() => setModal("withdraw")}
            className="w-full sm:w-44 py-3 px-5 bg-surface-container-lowest hover:bg-surface-container-low active:scale-[0.98] text-primary-container font-semibold text-sm rounded-xl border border-primary-container/40 hover:border-primary-container transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <ArrowUp size={16} />
            <span>{t.balanceCard.withdrawButton}</span>
          </button>
        </div>
      </main>

      {modal === "deposit" && <DepositModal onClose={() => setModal(null)} />}
      {modal === "withdraw" && <WithdrawModal onClose={() => setModal(null)} />}
    </>
  );
}
