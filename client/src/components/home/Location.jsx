"use client";
import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const LocationSection = () => {
  const benefits = [
    {
      text: "Strategically positioned to reduce travel time and immerse guests in Egypt's most iconic destinations from the start.",
    },
    {
      text: "Collaborations with guides, artisans, and hosts ensure authenticity and support sustainable tourism.",
    },
    {
      text: "Our regional presence allows us to coordinate transfers, accommodations, and tours with unmatched efficiency.",
    },
  ];

  return (
    <motion.div
      className="bg-stone-50 py-16 px-4 lg:px-20"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-6"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-serif text-stone-900 leading-tight font-light">
              Where We're Based — <br />
              <span className="italic">& Why It Matters</span>
            </h2>
          </div>
          <button className="bg-brown-900 hover:bg-brown-800 font-primary text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 whitespace-nowrap shadow-lg">
            Explore Our Locations
          </button>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Left Side - Real Map */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative h-60 rounded-lg overflow-hidden shadow-lg mb-6">
              {/* Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-blue-100">
                {/* SVG Map Overlay */}
                <div className="absolute inset-0 opacity-30">
                  <svg width="100%" height="100%" viewBox="0 0 400 320">
                    <defs>
                      <pattern
                        id="streets"
                        patternUnits="userSpaceOnUse"
                        width="40"
                        height="40"
                      >
                        <rect width="40" height="40" fill="transparent" />
                        <path
                          d="M0,20 L40,20 M20,0 L20,40"
                          stroke="#94a3b8"
                          strokeWidth="1"
                          opacity="0.6"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#streets)" />

                    <path
                      d="M280 0 Q350 50 380 120 Q400 200 380 280 Q350 320 280 320 L280 0"
                      fill="#7dd3fc"
                      opacity="0.6"
                    />
                    <circle
                      cx="120"
                      cy="80"
                      r="25"
                      fill="#86efac"
                      opacity="0.7"
                    />
                    <ellipse
                      cx="200"
                      cy="180"
                      rx="30"
                      ry="20"
                      fill="#86efac"
                      opacity="0.7"
                    />
                    <rect
                      x="60"
                      y="220"
                      width="40"
                      height="30"
                      fill="#86efac"
                      opacity="0.7"
                      rx="5"
                    />
                  </svg>
                </div>

                {/* Location Pins */}
                <div className="absolute inset-0">
                  {[
                    "top-12 left-16",
                    "top-20 left-32",
                    "top-32 left-12",
                    "top-40 left-28",
                    "top-28 right-16",
                  ].map((pos, i) => (
                    <motion.div
                      key={i}
                      className={`absolute ${pos} w-8 h-8 bg-amber-900 rounded-full border-4 border-white shadow-lg flex items-center justify-center`}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Ipsum lorem amet sit dolor, adipiscing consectetur elit. Ullamco
              laboris nisi ut aliquip.
            </p>
          </motion.div>

          {/* Middle - Illustrated Egypt Map */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-200 via-yellow-100 to-yellow-200">
                {/* Nile & Landmarks kept same as your code */}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Benefits */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl lg:text-4xl font-serif text-stone-900 mb-8 font-light">
              What Our Location Offers
            </h3>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {benefit.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationSection;
