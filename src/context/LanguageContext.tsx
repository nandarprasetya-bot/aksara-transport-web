"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Locale = 'id' | 'en';

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (idText: string, enText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('id');

    useEffect(() => {
        const saved = localStorage.getItem('locale') as Locale;
        if (saved === 'id' || saved === 'en') {
            setLocaleState(saved);
        }
    }, []);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    const t = (idText: string, enText: string) => {
        return locale === 'en' ? enText : idText;
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        // Fallback for SSR/tests where provider is not up yet
        return {
            locale: 'id' as Locale,
            setLocale: () => {},
            t: (idText: string) => idText
        };
    }
    return context;
}
