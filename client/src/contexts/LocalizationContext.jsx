import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const LocalizationContext = createContext();

// Provider component
export const LocalizationProvider = ({ children }) => {
    const [language, setLanguage] = useState("en");
    const [isRTL, setIsRTL] = useState(false);

    // Change language function
    const changeLanguage = (lang) => {
        setLanguage(lang);
        setIsRTL(lang === "ar");
        localStorage.setItem("selectedLanguage", lang);
        // Update document direction and lang attribute
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = lang;
    };

    // Initialize language from localStorage or browser
    useEffect(() => {
        const savedLang = localStorage.getItem("selectedLanguage");
        const browserLang = navigator.language.split("-")[0];
        const initialLang = savedLang || (browserLang === "ar" ? "ar" : "en");
        changeLanguage(initialLang);
    }, []);

    const value = {
        language,
        isRTL,
        changeLanguage,
    };

    return (
        <LocalizationContext.Provider value={value}>
            <div className={isRTL ? "rtl" : "ltr"}>{children}</div>
        </LocalizationContext.Provider>
    );
};

// Custom hook to use localization
export const useLocalization = () => {
    const context = useContext(LocalizationContext);
    if (!context) {
        throw new Error("useLocalization must be used within LocalizationProvider");
    }
    return context;
};
