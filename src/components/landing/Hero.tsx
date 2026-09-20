import { useState } from "react";
import { Lock, Bolt, ShieldCheck, Landmark, LockKeyholeOpen, BadgeCheck } from "lucide-react";
import { ShieldLogo } from "../shared/ShieldLogo";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { formatUSDC, tryToUsdc } from "../../lib/format";
import { useLanguage } from "../../hooks/useLanguage";

export function Hero() {
  const { t } = useLanguage();
  const [tryInput, setTryInput] = useState("50000");
  const amount = Number(tryInput.replace(/[^0-9]/g, "")) || 0;
  const usdc = tryToUsdc(amount);

  return (
    <section className="relative w-full overflow-hidden bg-surface pt-6 pb-12 lg:pt-8 lg:pb-16">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[520px] h-[520px] rounded-full bg-secondary/10 blur-3xl animate-shield-radiance" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-40 overflow-hidden">
        <svg className="w-[200%] h-full animate-wave-slow -ml-[50%]" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 400">
          <path
            d="M0,190 C180,80 320,310 520,130 C720,-20 860,260 1080,180 C1260,110 1380,240 1440,190"
            fill="none"
            stroke="#1d6b4f"
            strokeOpacity="0.35"
            strokeWidth="1.8"
          />
          <path
            d="M0,230 C220,330 400,100 620,260 C800,380 980,110 1200,210 C1340,280 1410,160 1440,220"
            fill="none"
            stroke="#717974"
            strokeOpacity="0.25"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 flex flex-col items-start z-10">
            <div className="inline-flex items-center gap-space-sm px-space-md py-1 rounded-full bg-secondary-container text-on-secondary-container shadow-sm mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
              </span>
              <span className="text-label-sm tracking-widest uppercase">{t.hero.badge}</span>
            </div>
            <h1 className="font-serif-display text-display-lg-mobile lg:text-display-lg text-primary tracking-tight max-w-3xl leading-[1.08] mb-3">
              {t.hero.title}
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl leading-relaxed mb-6">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <ConnectWalletButton
                className="inline-flex items-center justify-center gap-space-sm px-6 py-3 rounded-lg bg-primary-container text-on-primary text-label-lg shadow-md hover:bg-secondary transition-all transform active:scale-95 cursor-pointer disabled:cursor-not-allowed disabled:opacity-80"
                label={t.hero.ctaLabel}
                icon={<Lock size={20} className="transition-transform group-hover:scale-110" />}
              />
              <div className="inline-flex items-center justify-center gap-2 px-space-md py-2.5 rounded-lg bg-surface-container text-on-surface-variant text-label-sm shadow-sm">
                <ShieldCheck size={16} className="text-secondary" />
                <span>{t.hero.feeBadge}</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 pt-4 text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-body-sm">
                  {t.hero.anchorStatusLabel} <strong>{t.hero.anchorStatusValue}</strong>
                </span>
              </div>
              <div className="hidden sm:inline text-outline-variant">•</div>
              <div className="flex items-center gap-2">
                <Bolt size={16} className="text-secondary" />
                <span className="text-body-sm">
                  {t.hero.settlementLabel} <strong>{t.hero.settlementValue}</strong>
                </span>
              </div>
              <div className="hidden sm:inline text-outline-variant">•</div>
              <div className="flex items-center gap-2">
                <LockKeyholeOpen size={16} className="text-secondary" />
                <span className="text-body-sm">
                  {t.hero.reserveLabel} <strong>{t.hero.reserveValue}</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 relative flex justify-center lg:justify-end">
            <div className="absolute -top-10 -right-8 w-72 h-72 opacity-[0.08] pointer-events-none select-none">
              <ShieldLogo size={288} className="w-full h-full grayscale" />
            </div>
            <div className="relative w-full max-w-sm rounded-xl bg-surface-container-lowest p-5 shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <ShieldLogo size={20} />
                  </div>
                  <div>
                    <div className="text-title-md text-primary leading-tight">{t.hero.liveCardTitle}</div>
                    <div className="text-body-sm text-on-surface-variant">{t.hero.liveCardSubtitle}</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container text-label-sm uppercase">
                  {t.hero.liveCardBadge}
                </span>
              </div>

              <div className="space-y-2.5 pt-1">
                <label className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between cursor-text">
                  <div className="flex-1 min-w-0">
                    <span className="block text-label-sm text-on-surface-variant uppercase">
                      {t.hero.inputAmountLabel}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={tryInput}
                        onChange={(e) => setTryInput(e.target.value)}
                        className="w-full bg-transparent text-title-lg text-primary font-bold tnum outline-none min-w-0"
                        aria-label={t.hero.inputAriaLabel}
                      />
                      <span className="text-title-lg text-primary font-bold shrink-0">₺</span>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded bg-surface-container-highest text-primary text-label-sm flex items-center gap-1 shrink-0">
                    <span>TRY</span>
                    <Landmark size={14} />
                  </div>
                </label>

                <div className="flex items-center justify-center -my-2 relative z-10">
                  <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
                    <Lock size={15} />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-primary text-on-primary flex items-center justify-between">
                  <div>
                    <span className="block text-label-sm text-primary-fixed-dim uppercase">
                      {t.hero.lockedUsdcLabel}
                    </span>
                    <span className="text-title-lg text-primary-fixed font-bold tnum">{formatUSDC(usdc)} $</span>
                  </div>
                  <div className="px-2.5 py-1 rounded bg-tertiary-container text-on-tertiary text-label-sm flex items-center gap-1">
                    <span>USDC</span>
                    <BadgeCheck size={14} className="text-secondary-fixed" />
                  </div>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-label-sm text-on-surface-variant">
                  <span>{t.hero.protectionRatioLabel}</span>
                  <span className="font-bold text-secondary">{t.hero.protectionRatioValue}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden flex">
                  <div className="bg-secondary h-full w-full" />
                </div>
              </div>
              <div className="text-center text-body-sm text-on-surface-variant">{t.hero.bridgeNote}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
