import { useNavigate } from "react-router-dom";
import { ShieldLogo } from "../shared/ShieldLogo";
import { LanguageToggle } from "../shared/LanguageToggle";
import { useWallet } from "../../hooks/useWallet";
import { useLanguage } from "../../hooks/useLanguage";
import { shortenAddress } from "../../lib/wallet";
import { NETWORK_LABEL } from "../../lib/network";

export function TopBar() {
  const { address, disconnect } = useWallet();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleDisconnect = () => {
    disconnect();
    navigate("/");
  };

  return (
    <header className="rounded-xl px-5 py-3.5 flex items-center justify-between bg-surface-container-lowest border border-surface-dim shadow-[0_4px_20px_-2px_rgba(15,61,46,0.05)]">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex items-center space-x-3 cursor-pointer text-left"
        aria-label={t.topBar.homeAria}
      >
        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
          <ShieldLogo size={32} />
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-serif-display font-semibold text-lg tracking-tight text-primary">
            StableShield
          </span>
          <span className="text-[11px] font-medium bg-surface-container-low text-secondary px-2 py-0.5 rounded border border-secondary-container hidden sm:inline-block">
            {t.topBar.vaultBadge}
          </span>
          <span
            className="text-[11px] font-semibold bg-bronze-100 text-bronze-700 px-2 py-0.5 rounded border border-bronze-border uppercase tracking-wide"
            title={t.topBar.testnetTooltip}
          >
            {NETWORK_LABEL}
          </span>
        </div>
      </button>

      <div className="flex items-center space-x-2 sm:space-x-3">
        <LanguageToggle />
        <div
          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-secondary-container/80 text-xs font-mono text-primary shadow-sm"
          title={address ?? undefined}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
          </span>
          <span className="font-medium tracking-wide">{address ? shortenAddress(address) : ""}</span>
        </div>
        <button
          type="button"
          onClick={handleDisconnect}
          aria-label={t.topBar.disconnectAria}
          className="text-xs font-medium text-on-surface-variant hover:text-error bg-surface-container-lowest hover:bg-error-container/40 border border-outline-variant hover:border-error/40 px-3 py-1.5 rounded-lg transition-colors duration-150 ease-in-out cursor-pointer"
        >
          {t.topBar.disconnect}
        </button>
      </div>
    </header>
  );
}
