import { useState } from "react";
import { ArrowUp, CheckCircle2, Landmark } from "lucide-react";
import { Modal } from "../shared/Modal";
import { useWallet } from "../../hooks/useWallet";
import { useLanguage } from "../../hooks/useLanguage";
import { formatTRY, formatUSDC, tryToUsdc } from "../../lib/format";

interface WithdrawModalProps {
  onClose: () => void;
}

export function WithdrawModal({ onClose }: WithdrawModalProps) {
  const { balanceTRY, withdraw } = useWallet();
  const { t } = useLanguage();
  const [amount, setAmount] = useState("500");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const numericAmount = Number(amount.replace(/[^0-9]/g, "")) || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = withdraw(numericAmount);
    if (!result.ok) {
      setError(result.error ?? t.withdrawModal.genericError);
      return;
    }
    setError(null);
    setSuccess(true);
    setTimeout(onClose, 1000);
  };

  return (
    <Modal open onClose={onClose} title={t.withdrawModal.title}>
      {success ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <CheckCircle2 size={44} className="text-secondary" />
          <p className="text-title-md text-primary">{t.withdrawModal.successTitle}</p>
          <p className="text-body-sm text-on-surface-variant">
            {t.withdrawModal.successDesc(formatTRY(numericAmount))}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p className="text-body-md text-on-surface-variant">{t.withdrawModal.description}</p>

          <label className="flex flex-col gap-1.5">
            <span className="text-label-sm text-on-surface-variant uppercase">{t.withdrawModal.amountLabel}</span>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-container-low border border-outline-variant focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary-container transition-all">
              <Landmark size={18} className="text-on-surface-variant shrink-0" />
              <input
                autoFocus
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 min-w-0 bg-transparent text-title-lg text-primary font-bold tnum outline-none"
                aria-label={t.withdrawModal.amountAria}
              />
              <span className="text-title-md text-on-surface-variant shrink-0">₺</span>
            </div>
          </label>

          <button
            type="button"
            onClick={() => setAmount(String(Math.floor(balanceTRY)))}
            className="self-start text-label-sm text-secondary hover:underline cursor-pointer"
          >
            {t.withdrawModal.useAll(formatTRY(balanceTRY))}
          </button>

          <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
            <span className="text-label-sm text-on-surface-variant uppercase">
              {t.withdrawModal.vaultDeductLabel}
            </span>
            <span className="text-title-lg font-bold text-primary tnum">
              {formatUSDC(tryToUsdc(numericAmount))} $
            </span>
          </div>

          {error && <p className="text-body-sm text-error">{error}</p>}

          <button
            type="submit"
            disabled={numericAmount <= 0 || numericAmount > balanceTRY}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-surface-container-lowest border border-primary-container text-primary-container font-semibold text-sm hover:bg-surface-container-low transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowUp size={18} />
            <span>{t.withdrawModal.submitButton}</span>
          </button>
        </form>
      )}
    </Modal>
  );
}
