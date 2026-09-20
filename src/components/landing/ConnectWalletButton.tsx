import { useEffect, useState } from "react";
import { ArrowRight, Loader2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../../hooks/useWallet";
import { useLanguage } from "../../hooks/useLanguage";
import type { Translations } from "../../i18n/translations";

const ERROR_DISPLAY_MS = 6000;

/** Turns the kit/browser's raw connect error into a short, actionable message. */
function friendlyConnectError(raw: string | undefined, t: Translations): string {
  const lower = (raw ?? "").toLowerCase();
  if (lower.includes("freighter") || lower.includes("not installed") || lower.includes("not available")) {
    return t.connectButton.errorFreighterNotFound;
  }
  if (lower.includes("closed the modal")) {
    return t.connectButton.errorModalClosed;
  }
  if (lower.includes("declin") || lower.includes("reject") || lower.includes("denied")) {
    return t.connectButton.errorRejected;
  }
  if (lower.includes("network") || lower.includes("fetch") || lower.includes("timeout")) {
    return t.connectButton.errorNetwork;
  }
  return t.connectButton.errorGeneric;
}

function useAutoDismiss(message: string | null, onExpire: () => void) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onExpire, ERROR_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, [message, onExpire]);
}

function ConnectErrorHint({ message }: { message: string }) {
  return (
    <p role="alert" className="text-label-sm text-error max-w-[220px] leading-snug">
      {message}
    </p>
  );
}

interface ConnectWalletButtonProps {
  className: string;
  label?: string;
  connectedLabel?: string;
  icon?: React.ReactNode;
  showArrow?: boolean;
}

export function ConnectWalletButton({
  className,
  label,
  connectedLabel,
  icon,
  showArrow = true,
}: ConnectWalletButtonProps) {
  const { connected, connecting, connect } = useWallet();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useAutoDismiss(errorMessage, () => setErrorMessage(null));

  const handleClick = async () => {
    setErrorMessage(null);
    if (!connected) {
      const result = await connect();
      if (!result.ok) {
        setErrorMessage(friendlyConnectError(result.error, t));
        return;
      }
    }
    navigate("/dashboard");
  };

  return (
    <div className="inline-flex flex-col items-start gap-1.5">
      <button type="button" className={`${className} group`} onClick={handleClick} disabled={connecting}>
        {connecting ? <Loader2 size={18} className="animate-spin" /> : icon}
        <span>
          {connecting
            ? t.connectButton.connecting
            : connected
              ? (connectedLabel ?? t.connectButton.goToDashboard)
              : (label ?? t.connectButton.connect)}
        </span>
        {showArrow && !connecting && (
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        )}
      </button>
      {errorMessage && <ConnectErrorHint message={errorMessage} />}
    </div>
  );
}

export function ConnectWalletIconButton({ className }: { className: string }) {
  const { connected, connecting, connect } = useWallet();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useAutoDismiss(errorMessage, () => setErrorMessage(null));

  const handleClick = async () => {
    setErrorMessage(null);
    if (!connected) {
      const result = await connect();
      if (!result.ok) {
        setErrorMessage(friendlyConnectError(result.error, t));
        return;
      }
    }
    navigate("/dashboard");
  };

  return (
    <div className="inline-flex flex-col items-end gap-1.5">
      <button
        type="button"
        aria-label={connected ? t.connectButton.iconGoToDashboard : t.connectButton.iconConnect}
        className={className}
        onClick={handleClick}
        disabled={connecting}
      >
        {connecting ? <Loader2 size={18} className="animate-spin" /> : <User size={18} />}
      </button>
      {errorMessage && <ConnectErrorHint message={errorMessage} />}
    </div>
  );
}
