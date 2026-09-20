import { Workflow, Wallet, Shield, ArrowRight, ShieldCheck, Landmark, ArrowLeftRight } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

const STEP_STYLES = [
  {
    icon: Wallet,
    iconClass: "bg-secondary-container text-on-secondary-container",
    footer: (label: string) => (
      <>
        <div className="flex items-center gap-2">
          <span className="text-title-md text-primary font-bold">TRY</span>
          <ArrowRight size={16} className="text-secondary" />
          <span className="text-title-md text-secondary font-bold">USDC</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface text-label-sm">
          {label}
        </span>
      </>
    ),
  },
  {
    icon: Shield,
    iconClass: "bg-primary text-primary-fixed",
    footer: (label: string) => (
      <>
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-secondary" />
          <span className="text-label-sm text-primary font-semibold">1:1</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container text-label-sm">
          {label}
        </span>
      </>
    ),
  },
  {
    icon: ArrowLeftRight,
    iconClass: "bg-surface-container-highest text-primary",
    footer: (label: string) => (
      <>
        <div className="flex items-center gap-2">
          <Landmark size={18} className="text-secondary" />
          <span className="text-label-sm text-primary font-semibold">FAST</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface text-label-sm">
          {label}
        </span>
      </>
    ),
  },
];

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="nasil-calisir" className="w-full bg-surface-container-low py-10 lg:py-14 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-8 flex flex-col gap-1">
          <div className="inline-flex items-center gap-2 text-secondary text-label-sm uppercase tracking-wider">
            <Workflow size={18} />
            <span>{t.howItWorks.eyebrow}</span>
          </div>
          <h2 className="font-serif-display text-headline-lg text-primary tracking-tight">{t.howItWorks.title}</h2>
          <p className="text-body-lg text-on-surface-variant">{t.howItWorks.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {t.howItWorks.steps.map((step, index) => {
            const style = STEP_STYLES[index];
            return (
              <div
                key={step.number}
                className="group relative rounded-xl bg-surface-container-lowest p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${style.iconClass}`}>
                      <style.icon size={22} />
                    </div>
                    <span className="font-serif-display text-headline-sm text-outline-variant font-medium">
                      {step.number}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-serif-display text-headline-sm text-primary group-hover:text-secondary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-body-md text-on-surface-variant leading-relaxed">{step.description}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 bg-surface-container-low rounded-lg p-3 flex items-center justify-between">
                  {style.footer(step.footerBadge)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
