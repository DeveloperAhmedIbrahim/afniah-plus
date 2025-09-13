// contexts/LocalizationContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Translation data
const translations = {
    en: {
        // Navigation
        nav: {
            home: "Home",
            about: "About",
            destination: "Destination",
            contact: "Contact",
            planning: "Start Planning"
        },
        // Hero Section
        hero: {
            title: "Travel Through Stories, Not Just Places",
            subtitle: "Our immersive Egypt tours connect you with history, culture, and the people who bring them to life.",
            button: "Explore Egypt Now",
            scrollDown: "Scroll Down"
        },
        // Common
        common: {
            loading: "Loading...",
            welcome: "Welcome"
        }
    },
    ar: {
        // Navigation
        nav: {
            home: "الرئيسية",
            about: "حولنا",
            destination: "الوجهات",
            contact: "اتصل بنا",
            planning: "ابدأ التخطيط"
        },        
        // Hero Section
        hero: {
            title: "سافر عبر القصص، وليس فقط الأماكن",
            subtitle: "جولاتنا الغامرة في مصر تربطك بالتاريخ والثقافة والأشخاص الذين يجعلونها حية.",
            button: "اكتشف مصر الآن",
            scrollDown: "انتقل لأسفل"
        },
        // Common
        common: {
            loading: "جاري التحميل...",
            welcome: "مرحباً"
        }
    }
};

// Create context
const LocalizationContext = createContext();

// Provider component
export const LocalizationProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [isRTL, setIsRTL] = useState(false);

    // Change language function
    const changeLanguage = (lang) => {
        setLanguage(lang);
        setIsRTL(lang === 'ar');
        localStorage.setItem('selectedLanguage', lang);

        // Update document direction and lang attribute
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    };

    // Get translation function
    const t = (key) => {
        const keys = key.split('.');
        let translation = translations[language];

        for (const k of keys) {
            translation = translation?.[k];
        }

        return translation || key;
    };

    // Initialize language from localStorage or browser
    useEffect(() => {
        const savedLang = localStorage.getItem('selectedLanguage');
        const browserLang = navigator.language.split('-')[0];
        const initialLang = savedLang || (browserLang === 'ar' ? 'ar' : 'en');

        changeLanguage(initialLang);
    }, []);

    const value = {
        language,
        isRTL,
        changeLanguage,
        t,
        translations: translations[language]
    };

    return (
        <LocalizationContext.Provider value={value}>
            <div className={isRTL ? 'rtl' : 'ltr'}>
                {children}
            </div>
        </LocalizationContext.Provider>
    );
};

// Custom hook to use localization
export const useLocalization = () => {
    const context = useContext(LocalizationContext);
    if (!context) {
        throw new Error('useLocalization must be used within LocalizationProvider');
    }
    return context;
};