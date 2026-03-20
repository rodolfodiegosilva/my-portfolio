import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import i18n from '../i18n';

interface LanguageContextValue {
  language: string;
  isEnglish: boolean;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLang] = useState<string>(() =>
    localStorage.getItem('portfolio.language') || 'en'
  );

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('portfolio.language', language);
  }, [language]);

  const setLanguage = (lang: string) => setLang(lang);

  return (
    <LanguageContext.Provider value={{ language, isEnglish: language === 'en', setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
