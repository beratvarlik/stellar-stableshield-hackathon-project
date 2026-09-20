import { Shield } from "lucide-react";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { useLanguage } from "../../hooks/useLanguage";

export function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-primary py-10 text-on-primary relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-10 flex items-center justify-center">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <circle cx="50" cy="50" fill="none" r="40" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" fill="none" r="25" stroke="currentColor" strokeWidth="0.3" />
        </svg>
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1.5 max-w-2xl text-center md:text-left">
          <h3 className="font-serif-display text-headline-lg text-on-primary">{t.cta.title}</h3>
          <p className="text-body-lg text-primary-fixed-dim">{t.cta.subtitle}</p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <ConnectWalletButton
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary-container text-on-secondary-container text-label-lg hover:bg-secondary-fixed transition-colors cursor-pointer shadow-md disabled:cursor-not-allowed disabled:opacity-80"
            label={t.cta.buttonLabel}
            connectedLabel={t.cta.buttonConnectedLabel}
            icon={<Shield size={20} />}
            showArrow={false}
          />
        </div>
      </div>
    </section>
  );
}
