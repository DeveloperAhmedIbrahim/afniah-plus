// components/common/LanguageSwitcher.js
import React, { useState } from 'react';
import { useLocalization } from '../../contexts/LocalizationContext';

const LanguageSwitcher = () => {
  const { language, changeLanguage, isRTL } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const currentLang = languages.find(lang => lang.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-all duration-300 text-green-primary"
      >
        <span className="text-lg">{currentLang?.flag}</span>
        {/* <span className="hidden md:block">{currentLang?.name}</span> */}
        <svg 
          className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className={`absolute top-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50 min-w-[130px] ${
            isRTL ? 'left-0' : 'right-0'
          }`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors duration-200 flex items-center space-x- ${
                language === lang.code ? 'bg-gray-200 text-golden-primary' : 'text-gray-700'
              } ${isRTL ? 'text-right space-x-reverse' : ''}`}
            >
              <span className="text-lg me-2">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;