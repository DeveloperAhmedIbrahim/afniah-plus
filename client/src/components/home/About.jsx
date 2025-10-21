"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";

const About = () => {

  const { t, isRTL } = useLocalization();

  // Ref aur inView hook
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Main About Section */}
      <section className="relative overflow-hidden">


        {/* Main Content with gradient background */}
        <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-8 lg:p-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side - Main Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ staggerChildren: 0.3 }}
              className="space-y-8 relative"
            >

              <motion.div className="relative" variants={fadeUp}>
                <img src="/assets/others/04.png" className="w-[350px]" alt="Overlay Icon" />
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl lg:text-5xl font-primary  text-green-primary leading-tight z-10"
              >
                {t('whyAffinah.heading')}
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="text-lg text-gray-600 font-secondary leading-relaxed max-w-lg"
              >
                {t('whyAffinah.description')}
              </motion.p>

              {/* CTA Button */}
              <motion.button
                variants={fadeUp}
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
              transition={{ staggerChildren: 0.3 }}
              className="space-y-3"
            >
              {/* Feature 1 */}
              <motion.div
                variants={fadeUp}
                className="flex items-start space-x-6 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg flex justify-center items-center text-xl">
                    {t('whyAffinah.points.0.icon')}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg  font-bold font-primary text-golden-primary mb-1">
                    {t('whyAffinah.points.0.title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-secondary text-sm">
                    {t('whyAffinah.points.0.description')}
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                variants={fadeUp}
                className="flex items-start space-x-6 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg flex justify-center items-center text-xl">
                    {t('whyAffinah.points.1.icon')}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-primary text-golden-primary mb-1">
                    {t('whyAffinah.points.1.title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-secondary text-sm">
                    {t('whyAffinah.points.1.description')}
                  </p>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                variants={fadeUp}
                className="flex items-start space-x-6 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg flex justify-center items-center text-xl">
                    {t('whyAffinah.points.2.icon')}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-primary text-golden-primary mb-1">
                    {t('whyAffinah.points.2.title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-secondary text-sm">
                    {t('whyAffinah.points.2.description')}
                  </p>
                </div>
              </motion.div>

              {/* Feature 4 */}
              <motion.div
                variants={fadeUp}
                className="flex items-start space-x-6 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg flex justify-center items-center text-xl">
                    {t('whyAffinah.points.3.icon')}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-primary text-golden-primary mb-1">
                    {t('whyAffinah.points.3.title')}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-secondary text-sm">
                    {t('whyAffinah.points.3.description')}
                  </p>
                </div>
              </motion.div>                            
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;