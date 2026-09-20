import { Languages } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const targetLabel = language === "tr" ? "EN" : "TR";

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t.common.langToggleLabel}
      title={t.common.langToggleLabel}
      className={
        className ??
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container text-label-sm font-semibold transition-colors cursor-pointer"
      }
    >
      <Languages size={14} />
      <span>{targetLabel}</span>
    </button>
  );
}
