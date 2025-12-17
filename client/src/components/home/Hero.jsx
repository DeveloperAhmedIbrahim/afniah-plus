// components/home/Hero.js
import React, { useState, useEffect } from "react";
import { useLocalization } from '../../contexts/LocalizationContext';
import { ASSETS_URL } from "@/lib/utils";

const HeroSection = ({ hero, gallery, isLoaded }) => {
  const { t, isRTL } = useLocalization();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change background image every 5 seconds
  useEffect(() => {
    console.log(isLoaded);
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % 5
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isLoaded]);


  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute bg-green-primary/70 w-full h-full z-50 d-flex justify-center items-center" style={{ display: isLoaded ? 'none' : 'flex' }}>
            <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                <svg aria-hidden="true" class="inline w-10 h-10 text-neutral-tertiary animate-spin fill-golden-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/> */}
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        {/* Background Images with Animation */}
        <div className="absolute inset-0">
          {gallery.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-2000 ease-in-out ${
                index === currentImageIndex
                  ? "opacity-100 scale-110"
                  : "opacity-0 scale-100"
              }`}
              style={{
                backgroundImage: `url(${ASSETS_URL}/${image.image})`,
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
                {hero?.title}
              </h1>

              <p
                className={`text-xl text-gray-200 font-primary mb-8 leading-relaxed transform transition-all duration-1000 delay-500 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ 
                  lineHeight: isRTL ? "1.8" : "1.6"
                }}
              >
                {hero?.subtitle}
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
                {hero?.btn_text}
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