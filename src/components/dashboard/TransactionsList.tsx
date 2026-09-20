import { ArrowDown, ArrowUp, Check, Loader2, X } from "lucide-react";
import { useWallet } from "../../hooks/useWallet";
import { useLanguage } from "../../hooks/useLanguage";
import { formatDateShort, formatTRY } from "../../lib/format";

export function TransactionsList() {
  const { transactions } = useWallet();
  const { t } = useLanguage();

  return (
    <section
      aria-label={t.transactions.ariaLabel}
      className="rounded-2xl p-6 sm:p-7 bg-surface-container-lowest border border-surface-dim shadow-[0_4px_20px_-2px_rgba(15,61,46,0.05)]"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-primary">{t.transactions.title}</h2>
        <span className="text-xs text-on-surface-variant/60">{t.transactions.period}</span>
      </div>

      {transactions.length === 0 ? (
        <p className="text-body-sm text-on-surface-variant py-6 text-center">{t.transactions.empty}</p>
      ) : (
        <div className="divide-y divide-outline-variant/20">
          {transactions.map((tx) => {
            const isDeposit = tx.type === "deposit";
            const isFailed = tx.status === "failed";
            const isPending = tx.status === "pending";
            const label = t.transactions.labels[tx.labelKey] ?? tx.labelKey;
            return (
              <div
                key={tx.id}
                className={`py-3.5 flex items-center justify-between hover:bg-surface-container-low/60 rounded-lg px-2 -mx-2 transition-colors ${
                  isFailed ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isFailed
                        ? "bg-error-container/50 text-error"
                        : isDeposit
                          ? "bg-secondary-container/60 text-secondary"
                          : "bg-surface-container-highest text-on-surface-variant"
                    }`}
                  >
                    {isFailed ? (
                      <X size={16} />
                    ) : isDeposit ? (
                      <ArrowDown size={16} />
                    ) : (
                      <ArrowUp size={16} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">
                      {isDeposit ? t.transactions.deposit : t.transactions.withdraw}
                    </p>
                    <p className="text-[11px] text-on-surface-variant/70">{label}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`text-sm font-semibold font-mono tnum ${
                      isFailed ? "text-on-surface-variant line-through" : isDeposit ? "text-secondary" : "text-on-surface"
                    }`}
                  >
                    {isDeposit ? "+" : ""}
                    {formatTRY(tx.amountTRY)} TL
                  </span>
                  <div className="flex items-center justify-end space-x-1.5 text-xs text-on-surface-variant/70 mt-0.5">
                    <span>{formatDateShort(new Date(tx.dateISO))}</span>
                    {isPending ? (
                      <Loader2 size={12} className="text-bronze-600 animate-spin" />
                    ) : isFailed ? (
                      <span className="text-error font-semibold">{t.transactions.failed}</span>
                    ) : (
                      <Check size={12} className="text-secondary" strokeWidth={3} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
