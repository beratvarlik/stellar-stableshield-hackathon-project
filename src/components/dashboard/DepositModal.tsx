import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ExternalLink, Loader2, XCircle } from "lucide-react";
import { Modal } from "../shared/Modal";
import { useWallet } from "../../hooks/useWallet";
import { useLanguage } from "../../hooks/useLanguage";
import { usdcToTry } from "../../lib/format";
import {
  startInteractiveDeposit,
  isTerminalStatus,
  getStatusLabel,
  type Sep24Transaction,
  type StartDepositHandle,
} from "../../lib/sep24";

interface DepositModalProps {
  onClose: () => void;
}

type Phase = "starting" | "awaiting_user" | "completed" | "failed";

/** SEP-24 transactions report the settled amount as `amount_out` (USDC received) — fall back to `amount_in` if an anchor omits it. Returns null rather than guessing when neither is a usable number. */
function extractDepositAmountUSDC(tx: Sep24Transaction): number | null {
  const raw = tx.amount_out ?? tx.amount_in;
  if (typeof raw !== "string" && typeof raw !== "number") return null;
  const n = typeof raw === "number" ? raw : parseFloat(raw);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function DepositModal({ onClose }: DepositModalProps) {
  const { address, recordDeposit, refreshBalance } = useWallet();
  const { language, t } = useLanguage();
  const [phase, setPhase] = useState<Phase>(() => (address ? "starting" : "failed"));
  const [statusText, setStatusText] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(() =>
    address ? null : t.depositModal.notConnected,
  );
  const [depositUrl, setDepositUrl] = useState<string | null>(null);
  const handleRef = useRef<StartDepositHandle | null>(null);

  useEffect(() => {
    if (!address) return; // reflected by the initial state above
    let cancelled = false;

    startInteractiveDeposit(address, language, {
      onAwaitingUser: (url: string) => {
        if (cancelled) return;
        setPhase("awaiting_user");
        setDepositUrl(url);
      },
      onStatusUpdate: (tx: Sep24Transaction) => {
        if (cancelled) return;
        setStatusText(getStatusLabel(tx.status, language));
        if (tx.status === "completed") {
          setPhase("completed");
          const usdc = extractDepositAmountUSDC(tx);
          if (usdc !== null) {
            recordDeposit(usdcToTry(usdc));
          }
          refreshBalance();
        } else if (isTerminalStatus(tx.status)) {
          setPhase("failed");
          setErrorMessage(tx.message ?? getStatusLabel(tx.status, language));
        }
      },
      onError: (message: string) => {
        if (cancelled) return;
        setPhase("failed");
        setErrorMessage(message);
      },
    })
      .then((handle) => {
        if (cancelled) {
          handle.stop();
          return;
        }
        handleRef.current = handle;
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setPhase("failed");
        setErrorMessage(e instanceof Error ? e.message : t.depositModal.genericStartError);
      });

    return () => {
      cancelled = true;
      handleRef.current?.stop();
    };
  }, [address, language, recordDeposit, refreshBalance, t]);

  return (
    <Modal open onClose={onClose} title={t.depositModal.title}>
      {phase === "starting" && (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <Loader2 size={40} className="text-secondary animate-spin" />
          <p className="text-title-md text-primary">{t.depositModal.startingTitle}</p>
          <p className="text-body-sm text-on-surface-variant max-w-xs">{t.depositModal.startingDesc}</p>
        </div>
      )}

      {phase === "awaiting_user" && (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <Loader2 size={40} className="text-secondary animate-spin" />
          <p className="text-title-md text-primary">{t.depositModal.awaitingTitle}</p>
          <p className="text-body-sm text-on-surface-variant max-w-xs">{t.depositModal.awaitingDesc}</p>
          {statusText && (
            <span className="mt-1 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-label-sm">
              {statusText}
            </span>
          )}
          {depositUrl && (
            <a
              href={depositUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-label-sm text-secondary hover:underline"
            >
              <ExternalLink size={14} />
              <span>{t.depositModal.reopenTab}</span>
            </a>
          )}
        </div>
      )}

      {phase === "completed" && (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <CheckCircle2 size={44} className="text-secondary" />
          <p className="text-title-md text-primary">{t.depositModal.completedTitle}</p>
          <p className="text-body-sm text-on-surface-variant">{t.depositModal.completedDesc}</p>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-semibold text-sm hover:bg-secondary transition-all cursor-pointer"
          >
            {t.depositModal.close}
          </button>
        </div>
      )}

      {phase === "failed" && (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <XCircle size={44} className="text-error" />
          <p className="text-title-md text-primary">{t.depositModal.failedTitle}</p>
          <p className="text-body-sm text-error max-w-xs">{errorMessage}</p>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant text-primary font-semibold text-sm hover:bg-surface-container-low transition-all cursor-pointer"
          >
            {t.depositModal.close}
          </button>
        </div>
      )}
    </Modal>
  );
}
