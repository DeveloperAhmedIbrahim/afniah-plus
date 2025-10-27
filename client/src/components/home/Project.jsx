"use client";
import React, { useState, useEffect, useRef } from "react";
import { MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";

export default function ProjectSection() {
  const { t, isRtl } = useLocalization();
  
  const projects = t('project.list');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const sliderRef = useRef(null);

  // Responsive slides per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto play slider
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying, slidesPerView]);

  const maxSlide = Math.max(0, projects.length - slidesPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const next = prev + 1;
      return next > maxSlide ? 0 : next;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const previous = prev - 1;
      return previous < 0 ? maxSlide : previous;
    });
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) {
      setIsAutoPlaying(true);
      return;
    }

    if (distance > 0 && currentSlide < maxSlide) {
      nextSlide();
    } else if (distance < 0 && currentSlide > 0) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToSlide = (index) => {
    if (index > maxSlide) return;
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const slideWidth = 100 / slidesPerView;
  const translateValue = isRtl 
    ? currentSlide * slideWidth 
    : -currentSlide * slideWidth;

  return (
    <motion.section
      className="bg-green-primary/30 py-16"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <motion.div
          className={`flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6 ${
            isRtl ? 'lg:flex-row-reverse' : ''
          }`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl lg:text-5xl text-green-primary leading-tight max-w-2xl font-light ${
            isRtl ? 'text-right' : 'text-left'
          }`}>
            {t('project.title01')} <br className="hidden lg:block" />
            {t('project.title02')}
          </h2>
          <button className="btn-primary-outline">
            {t('project.button')}
          </button>
        </motion.div>

        {/* Slider Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Arrows - Show only when needed */}
          {currentSlide > 0 && (
            <button
              onClick={prevSlide}
              className={`absolute ${isRtl ? 'right-2 lg:right-4' : 'left-2 lg:left-4'} top-1/2 transform -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white cursor-pointer z-20 transition-all duration-300 hover:scale-110 active:scale-95`}
              aria-label="Previous slide"
            >
              {isRtl ? (
                <ChevronRight className="w-5 h-5 text-gray-800" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              )}
            </button>
          )}

          {currentSlide < maxSlide && (
            <button
              onClick={nextSlide}
              className={`absolute ${isRtl ? 'left-2 lg:left-4' : 'right-2 lg:right-4'} top-1/2 transform -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white cursor-pointer z-20 transition-all duration-300 hover:scale-110 active:scale-95`}
              aria-label="Next slide"
            >
              {isRtl ? (
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-800" />
              )}
            </button>
          )}

          {/* Slides */}
          <div 
            className="overflow-hidden"
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove} 
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(${translateValue}%)`,
                direction: isRtl ? 'rtl' : 'ltr'
              }}
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2 lg:px-3"
                  style={{ width: `${slideWidth}%` }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer h-full"
                  >
                    <div className="relative h-150  overflow-hidden rounded-xl lg:rounded-2xl shadow-lg">
                      {/* Background Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${project.image})`,
                        }}
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Location Pin */}
                      <div className={`absolute top-4 lg:top-6 ${isRtl ? 'right-4 lg:right-6' : 'left-4 lg:left-6'} flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 lg:px-4 py-1.5 lg:py-2 rounded-full shadow-sm transition-colors duration-300 group-hover:bg-green-primary`}>
                        <MapPin className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-stone-700 group-hover:text-white transition-colors duration-300" />
                        <span className="text-xs lg:text-sm font-medium text-stone-700 group-hover:text-white transition-colors duration-300">
                          {project.location}
                        </span>
                      </div>

                      {/* Bottom Content */}
                      <div className={`absolute bottom-0 left-0 right-0 p-4 lg:p-6 xl:p-8 w-full ${
                        isRtl ? 'text-right' : 'text-left'
                      }`}>
                        <h3 className="text-white text-lg sm:text-xl lg:text-2xl mb-4 lg:mb-6 leading-tight font-light">
                          {project.title}
                        </h3>

                        {/* Arrow Button */}
                        <div className={`flex ${isRtl ? 'justify-start' : 'justify-end'}`}>
                          <div className="bg-white/20 backdrop-blur-sm hover:bg-green-primary w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 border border-white/30">
                            <ChevronRight className={`w-5 h-5 lg:w-6 lg:h-6 text-white ${isRtl ? 'rotate-180' : ''}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pagination Dots */}
        <motion.div
          className="flex justify-center gap-2 mt-8 lg:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {Array.from({ length: maxSlide + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? "bg-golden-primary scale-125" 
                  : "bg-stone-400/50 hover:bg-stone-400/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}