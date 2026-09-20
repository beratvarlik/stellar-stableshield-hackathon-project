import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations, type Language } from "../i18n/translations";
import { LanguageContext } from "./language-types";

const STORAGE_KEY = "stableshield.lang";
const DEFAULT_LANGUAGE: Language = "tr";

function loadLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "en" || stored === "tr" ? stored : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => loadLanguage());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // localStorage unavailable — non-fatal, choice just won't persist.
    }
    document.documentElement.lang = language;
    document.title = translations[language].meta.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", translations[language].meta.description);
    }
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "tr" ? "en" : "tr"));
  }, []);

  const value = useMemo(
    () => ({ language, toggleLanguage, t: translations[language] }),
    [language, toggleLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
