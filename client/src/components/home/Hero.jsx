// components/home/Hero.js
import React, { useState, useEffect } from "react";
import { useLocalization } from '../../contexts/LocalizationContext';

const HeroSection = () => {
  const { t, isRTL } = useLocalization();
  
  // Background images array
  const backgroundImages = [
    "/assets/hero/1.png",
    "/assets/hero/2.png",
    "/assets/hero/3.png",
    "/assets/hero/4.png",
    "/assets/hero/5.png",
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
          {/* Dark Overlay - RTL Fixed */}
          <div className={`absolute inset-0 ${
            isRTL 
              ? 'bg-gradient-to-l from-black/70 via-black/40 to-transparent' 
              : 'bg-gradient-to-r from-black/70 via-black/40 to-transparent'
          }`} />
        </div>

        {/* Hero Content - RTL Fixed */}
        <div className={`relative z-10 min-h-screen flex items-center ${isRTL ? 'justify-start' : 'justify-start'}`}>
          <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full">
            <div className={`max-w-2xl font-primary ${isRTL ? 'ml-0 mr-auto' : 'mr-0 ml-0'}`}>
              <h1
                className={`text-5xl md:text-6xl text-white mb-4 leading-tight transform transition-all duration-1000 delay-300 mt-5 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }
                `}
                style={{ 
                  lineHeight: isRTL ? "1.4" : "1.2"
                }}
              >
                {t('hero.title')}
              </h1>

              <p
                className={`text-xl text-gray-200 font-secondary mb-8 leading-relaxed transform transition-all duration-1000 delay-500 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ 
                  lineHeight: isRTL ? "1.8" : "1.6"
                }}
              >
                {t('hero.subtitle')}
              </p>

              <button
                className={`btn-secondary-outline ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                onClick={() => {
                  const projectSection = document.getElementById('projectSection');
                  if (projectSection) {
                    projectSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                {t('hero.button')}
              </button>
            </div>
          </div>
        </div>

       {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hover:cursor-pointer"
          onClick={() => {
            const aboutSection = document.getElementById('aboutSection');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        >
          <div className="flex flex-col items-center text-white/70">
            <span className="text-sm mb-2 font-light">
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