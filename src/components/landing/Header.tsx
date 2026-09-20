import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ShieldLogo } from "../shared/ShieldLogo";
import { LanguageToggle } from "../shared/LanguageToggle";
import { ConnectWalletButton, ConnectWalletIconButton } from "./ConnectWalletButton";
import { useLanguage } from "../../hooks/useLanguage";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { id: "nasil-calisir", label: t.header.navHowItWorks },
    { id: "guvenlik-kalkan", label: t.header.navSecurity },
    { id: "neden-stableshield", label: t.header.navWhy },
    { id: "sss", label: t.header.navFaq },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-gutter">
        <div className="flex items-center gap-space-md">
          <ShieldLogo size={32} />
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="font-serif-display text-headline-sm font-semibold tracking-tight text-primary">
                StableShield
              </span>
              <span className="hidden sm:inline-flex items-center px-space-xs py-0.5 rounded-lg bg-secondary-container text-on-secondary-container text-label-sm">
                {t.header.badgeAnchor}
              </span>
            </div>
            <span className="text-body-sm text-on-surface-variant">{t.header.tagline}</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-gutter">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-title-md text-on-surface-variant hover:text-on-surface transition-colors py-space-xs px-space-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-space-md">
          <LanguageToggle className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high text-label-sm font-semibold transition-colors cursor-pointer" />
          <ConnectWalletButton
            className="hidden sm:inline-flex items-center justify-center px-space-lg py-space-sm bg-primary-container text-on-primary text-label-lg rounded-lg shadow-sm hover:bg-secondary transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-80"
            showArrow={false}
          />
          <ConnectWalletIconButton className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary cursor-pointer hover:bg-secondary transition-colors disabled:cursor-not-allowed" />
          <button
            type="button"
            aria-label={menuOpen ? t.header.menuClose : t.header.menuOpen}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-primary hover:bg-surface-container-low transition-colors cursor-pointer"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden border-t border-outline-variant/40 bg-surface animate-fade-in-up">
          <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className="text-title-md text-on-surface-variant hover:text-on-surface py-3 border-b border-outline-variant/20 last:border-none"
              >
                {item.label}
              </a>
            ))}
            <LanguageToggle className="sm:hidden mt-3 inline-flex items-center justify-center gap-1.5 px-space-lg py-space-sm rounded-lg bg-surface-container-low text-on-surface text-label-lg font-semibold transition-colors cursor-pointer" />
            <ConnectWalletButton
              className="sm:hidden mt-3 inline-flex items-center justify-center gap-2 px-space-lg py-space-sm bg-primary-container text-on-primary text-label-lg rounded-lg shadow-sm hover:bg-secondary transition-all cursor-pointer disabled:cursor-not-allowed"
              showArrow={false}
            />
          </div>
        </nav>
      )}
    </header>
  );
}
