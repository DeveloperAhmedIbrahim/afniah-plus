"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";

const About = () => {

  const { t, isRTL } = useLocalization();

  // Ref aur inView hook
  const ref = useRef(null);

  // Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50, rotateY: -15 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1]
      }
    })
  };

  const features = [
    {
      gradient: "from-purple-500 via-pink-500 to-red-500",
      glowColor: "shadow-purple-500/50",
      index: 0
    },
    {
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      glowColor: "shadow-cyan-500/50",
      index: 1
    },
    {
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      glowColor: "shadow-orange-500/50",
      index: 2
    },
    {
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      glowColor: "shadow-green-500/50",
      index: 3
    }
  ];

  return (
    <>
      {/* Main About Section */}
      <section className="relative overflow-hidden">
        {/* Main Content with gradient background */}
        <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-8 lg:p-16 flex justify-center">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
            {/* Left Side - Main Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ staggerChildren: 0.3 }}
              className="space-y-8 relative"
            >
              <motion.div className="relative" variants={fadeUp}>
                <img src="/assets/others/04.png" className="w-[350px] drop-shadow-2xl" alt="Overlay Icon" />
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl lg:text-6xl font-primary text-green-primary bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text  leading-tight z-10"
              >
                {t('whyAffinah.heading')}
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="text-lg text-gray-600 font-primary leading-relaxed max-w-lg"
              >
                {t('whyAffinah.description')}
              </motion.p>

              {/* CTA Button */}
              <motion.button
                variants={fadeUp}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                {t('whyAffinah.button')}
              </motion.button>
            </motion.div>

            {/* Right Side - Features */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    z: 50,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative"
                  style={{ perspective: "1000px" }}
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl rounded-3xl transition-opacity duration-500`}></div>
                  
                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl overflow-hidden">
                    {/* Animated border gradient */}
                    {/* <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                         style={{ padding: "2px", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }}>
                    </div> */}

                    <div className="flex items-start space-x-5 relative z-10">
                      {/* Icon with gradient */}
                      <motion.div 
                        className="flex-shrink-0"
                        whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className={`w-16 h-16 rounded-2xl flex justify-center items-center text-3xl transform group-hover:scale-110 transition-transform duration-300`}>
                          <img src={t(`whyAffinah.points.${i}.icon`)} width={40} alt="" />
                        </div>
                      </motion.div>

                      <div className="flex-1 space-y-2">
                        <h3 className="text-xl  font-primary text-golden-primary group-hover:text-green-primary group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300">
                          {t(`whyAffinah.points.${i}.title`)}
                        </h3>
                        <p className="text-gray-600 leading-relaxed font-primary text-sm group-hover:text-gray-600   transition-colors duration-300">
                          {t(`whyAffinah.points.${i}.description`)}
                        </p>
                      </div>
                    </div>

                    {/* Decorative corner elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-white/10 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;