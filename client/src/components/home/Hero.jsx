// components/home/Hero.js
import React, { useState, useEffect } from "react";
import { useLocalization } from '../../contexts/LocalizationContext';
import LanguageSwitcher from '../common/LanguageSwitcher';

const HeroSection = () => {
  const { t, isRTL } = useLocalization();
  
  // Background images array
  const backgroundImages = [
    "/assets/hero/view-of-the-great-pyramid-of-giza.jpg",
    "/assets/hero/view-of-the-nile-river.jpg",
    "/assets/hero/view-of-the-valley-of-the-kings.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Change background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Load animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        {/* Language Switcher */}
        {/* <div className={`absolute top-6 z-30 ${isRTL ? 'left-6' : 'right-6'}`}>
          <LanguageSwitcher />
        </div> */}

        {/* Background Images with Animation */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-2000 ease-in-out ${
                index === currentImageIndex
                  ? "opacity-100 scale-110"
                  : "opacity-0 scale-100"
              }`}
              style={{
                backgroundImage: `url(${image})`,
                transitionDuration: "2000ms",
              }}
            />
          ))}
          {/* Dark Overlay */}
          <div className={`absolute inset-0 ${
            isRTL 
              ? 'bg-gradient-to-l from-black/70 via-black/40 to-transparent' 
              : 'bg-gradient-to-r from-black/70 via-black/40 to-transparent'
          }`} />
        </div>

        {/* Hero Content - Consistent with other sections */}
        <div className={`relative z-10 min-h-screen flex items-center ${isRTL ? 'justify-end' : ''}`}>
          <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full">
            <div className={`max-w-2xl ${isRTL ? 'mr-0 ml-auto text-right' : ''}`}>
              <h1
                className={`text-5xl md:text-6xl text-white mb-6 leading-tight transform transition-all duration-1000 delay-300 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ 
                  fontFamily: isRTL ? "Arial, sans-serif" : "Georgia, serif",
                  lineHeight: isRTL ? "1.4" : "1.2"
                }}
              >
                {t('hero.title')}
              </h1>

              <p
                className={`text-xl text-gray-200 mb-8 leading-relaxed transform transition-all duration-1000 delay-500 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                } ${isRTL ? 'text-right' : 'text-left'}`}
                style={{ 
                  fontFamily: isRTL ? "Arial, sans-serif" : "inherit",
                  lineHeight: isRTL ? "1.8" : "1.6"
                }}
              >
                {t('hero.subtitle')}
              </p>

              <button
                className={`bg-transparent border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold text-lg shadow-lg transform hover:scale-105 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ 
                  transitionDelay: "700ms",
                  fontFamily: isRTL ? "Arial, sans-serif" : "inherit"
                }}
              >
                {t('hero.button')}
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className={`absolute bottom-10 hidden lg:block ${isRTL ? 'left-10' : 'right-10'}`}>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse opacity-60" />
        </div>

        <div className={`absolute top-1/3 hidden lg:block ${isRTL ? 'left-1/4' : 'right-1/4'}`}>
          <div className="w-1 h-1 bg-amber-300 rounded-full animate-ping opacity-40" />
        </div>

        {/* Image Indicators */}
        <div className={`absolute bottom-8 flex space-x-2 z-20 ${isRTL ? 'right-8 space-x-reverse' : 'left-8'}`}>
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? "scale-125" : "hover:opacity-70"
              }`}
              style={{
                backgroundColor:
                  index === currentImageIndex
                    ? "#704328"
                    : "rgba(255, 255, 255, 0.5)",
              }}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center text-white/70">
            <span className="text-sm mb-2 font-light" style={{ fontFamily: isRTL ? "Arial, sans-serif" : "inherit" }}>
              {t('hero.scrollDown')}
            </span>
            <div className="w-px h-12 bg-white/30 relative overflow-hidden">
              <div
                className="absolute top-0 w-px h-6 bg-white animate-pulse"
                style={{
                  animation: "scroll 2s infinite",
                }}
              />
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateY(0);
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateY(24px);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default HeroSection;