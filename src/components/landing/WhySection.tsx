import { Award, WalletMinimal, BadgeCheck, HeartHandshake, Timer, PiggyBank, BarChart3 } from "lucide-react";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { useLanguage } from "../../hooks/useLanguage";

const METRIC_STYLES = [
  { icon: HeartHandshake, iconClass: "bg-secondary/15 text-secondary", valueClass: "text-secondary" },
  { icon: Timer, iconClass: "bg-primary/10 text-primary", valueClass: "text-primary" },
  { icon: PiggyBank, iconClass: "bg-secondary-container text-on-secondary-container", valueClass: "text-secondary" },
];

export function WhySection() {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-surface py-10 lg:py-16 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div id="neden-stableshield" className="lg:col-span-6 flex flex-col gap-4 scroll-mt-24">
            <div className="inline-flex items-center gap-2 text-secondary text-label-sm uppercase tracking-wider">
              <Award size={18} />
              <span>{t.why.eyebrow}</span>
            </div>
            <h2 className="font-serif-display text-headline-lg text-primary tracking-tight">{t.why.title}</h2>
            <blockquote className="text-body-lg text-on-surface-variant leading-relaxed pl-4 shadow-[inset_4px_0_0_0_#1d6b4f]">
              {t.why.quote}
            </blockquote>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-lg bg-surface-container-low">
                <div className="flex items-center gap-2 text-primary text-title-md mb-0.5">
                  <WalletMinimal size={20} className="text-secondary" />
                  <span>{t.why.feature1Title}</span>
                </div>
                <p className="text-body-sm text-on-surface-variant">{t.why.feature1Desc}</p>
              </div>
              <div className="p-3.5 rounded-lg bg-surface-container-low">
                <div className="flex items-center gap-2 text-primary text-title-md mb-0.5">
                  <BadgeCheck size={20} className="text-secondary" />
                  <span>{t.why.feature2Title}</span>
                </div>
                <p className="text-body-sm text-on-surface-variant">{t.why.feature2Desc}</p>
              </div>
            </div>
            <div className="pt-1">
              <ConnectWalletButton
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-on-primary text-label-lg hover:bg-secondary transition-colors cursor-pointer shadow-sm disabled:cursor-not-allowed disabled:opacity-80"
                label={t.why.ctaLabel}
              />
            </div>
          </div>

          <div id="guvenlik-kalkan" className="lg:col-span-6 scroll-mt-24">
            <div className="rounded-xl bg-surface-container-lowest p-6 lg:p-8 shadow-lg flex flex-col gap-5">
              <div className="flex items-center justify-between pb-2">
                <div>
                  <h3 className="font-serif-display text-headline-sm text-primary">{t.why.metricsTitle}</h3>
                  <p className="text-body-sm text-on-surface-variant">{t.why.metricsSubtitle}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                  <BarChart3 size={22} />
                </div>
              </div>

              <div className="space-y-3">
                {t.why.metrics.map((metric, index) => {
                  const style = METRIC_STYLES[index];
                  return (
                    <div
                      key={metric.title}
                      className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${style.iconClass}`}>
                          <style.icon size={18} />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-title-md text-primary truncate">{metric.title}</span>
                          <span className="text-body-sm text-on-surface-variant">{metric.subtitle}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`block font-serif-display text-headline-sm font-bold tnum ${style.valueClass}`}>
                          {metric.value}
                        </span>
                        <span className="text-label-sm text-on-surface-variant">{metric.caption}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 rounded-lg bg-surface-container flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-on-surface text-label-sm">
                  <span>{t.why.chartTitle}</span>
                  <span className="text-secondary font-semibold">{t.why.chartCaption}</span>
                </div>
                <div className="h-12 w-full pt-1">
                  <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 300 50">
                    <path
                      d="M0,40 Q40,10 80,45 T160,20 T240,48 T300,35"
                      opacity="0.6"
                      stroke="#ba1a1a"
                      strokeDasharray="3 3"
                      strokeWidth="1.8"
                    />
                    <line stroke="#1d6b4f" strokeWidth="2.5" x1="0" x2="300" y1="18" y2="18" />
                    <circle cx="300" cy="18" fill="#0f3d2e" r="4" />
                  </svg>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant text-body-sm pt-0.5">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-0.5 bg-error inline-block" /> {t.why.chartUnprotected}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-secondary">
                    <span className="w-3 h-1 bg-secondary inline-block" /> {t.why.chartProtected}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
