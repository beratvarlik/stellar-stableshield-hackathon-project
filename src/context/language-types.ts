import { createContext } from "react";
import type { Language, Translations } from "../i18n/translations";

export interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  t: Translations;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
