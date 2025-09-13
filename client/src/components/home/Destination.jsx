"use client";
import React, { useState } from "react";
import { MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const destinations = [
  {
    title: "Sacred Temples Of Abu Simbel",
    category: "Archaeology & Monuments",
    location: "Abu Simbel",
    image:
      "https://images.unsplash.com/photo-1571581781190-05e5b5730b02?w=800&h=600&fit=crop&auto=format",
  },
  {
    title: "White Desert Safari Expedition",
    category: "Adventure & Nature",
    location: "White Desert",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format",
  },
  {
    title: "Wonders Of The Pyramids",
    category: "Culture & Heritage",
    location: "Giza",
    image:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73a2e?w=800&h=600&fit=crop&auto=format",
  },
  {
    title: "Secrets Of The Siwa Oasis",
    category: "Desert & Wellness",
    location: "Siwa Oasis",
    image:
      "https://images.unsplash.com/photo-1594736797933-d0a9ba0f6e48?w=800&h=600&fit=crop&auto=format",
  },
];

export default function DestinationSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  return (
    <motion.div
      className="bg-brown-300 py-16 overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }} // animate once when 20% visible
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-5xl font-serif text-stone-900 leading-tight max-w-2xl font-light">
            Explore Egypt, One <br className="hidden lg:block" />
            Destination At A Time
          </h2>
          <button className="border-2 font-primary border-amber-800 text-amber-800 px-8 py-3 rounded-full hover:bg-amber-800 hover:text-white transition-all duration-300 text-lg font-medium whitespace-nowrap">
            View All Destinations
          </button>
        </motion.div>

        {/* Slider Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white cursor-pointer z-20 transition-all duration-300 hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white cursor-pointer z-20 transition-all duration-300 hover:scale-105"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>

          {/* Slides */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {destinations.map((destination, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                >
                  <div className="relative h-[400px] md:h-[500px] overflow-hidden group cursor-pointer rounded-2xl">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${destination.image})`,
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Location Pin */}
                    <div className="absolute top-6 left-6 flex items-center space-x-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                      <MapPin className="w-4 h-4 text-stone-700" />
                      <span className="text-sm font-medium text-stone-700">
                        {destination.location}
                      </span>
                    </div>

                    {/* Bottom Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="text-amber-300 text-sm font-medium mb-3 uppercase tracking-wide">
                        {destination.category}
                      </div>
                      <h3 className="text-white text-2xl md:text-3xl font-serif mb-6 leading-tight font-light">
                        {destination.title}
                      </h3>

                      {/* Arrow Button */}
                      <div className="flex justify-end">
                        <div className="bg-white/20 backdrop-blur-sm hover:bg-white/30 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 border border-white/30">
                          <ChevronRight className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pagination Dots */}
        <motion.div
          className="flex justify-center space-x-2 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {destinations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-amber-800 scale-125" : "bg-stone-400/50"
              }`}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
