import React from "react";
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";
import { ASSETS_URL } from "@/lib/utils";

const Vision = ({ vision }) => {
  const { isRTL } = useLocalization();

  return (
    <section className="relative overflow-hidden">
      <section className="relative min-h-screen py-16  overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
              isRTL ? "lg:grid-flow-col-dense" : ""
          }`}>
            
            {/* LEFT: Image - Fixed Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
                className={`space-y-6 text-justify ${
                isRTL ? "lg:col-start-2" : ""
              }`}
            >
              <div className="relative h-[420px] lg:h-[560px] rounded-2xl overflow-hidden shadow-2xl">
                {/* Main Image with Zoom */}
                <motion.img
                  src={`${ASSETS_URL}/${vision.image}`}
                  alt="Saudi Cultural Heritage"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.25 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-primary/40 via-transparent to-transparent" />

                {/* Floating Palm Icon */}
                {/* <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 left-8 w-32 h-32 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center"
                >
                  <img src="/assets/logo/logo.png" alt="Heritage" className="w-20" />
                </motion.div> */}

                {/* Decorative Rotating Circles */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-6 -left-6 w-28 h-28 bg-golden-primary/20 rounded-full blur-xl"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-8 -right-8 w-32 h-32 bg-amber-600/15 rounded-full blur-xl"
                />
              </div>
            </motion.div>

            {/* RIGHT: Text Content - Fixed Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              // className="space-y-8 order-2 lg:order-2 text-left"
              className={`relative ${isRTL ? "lg:col-start-1" : ""}`}
            >
              {/* Title */}
              <div className="relative">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-4xl lg:text-5xl xl:text-6xl font-primary text-green-primary leading-tight"
                >
                  {vision.title}
                </motion.h2>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100px" }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="h-1 bg-golden-primary rounded-full mb-5"
                />
              </div>

              {/* Paragraphs with Stagger Animation */}
              <div className="space-y-6 text-lg lg:text-xl font-light text-gray-700 leading-relaxed font-primary text-justify">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 2 * 0.3 + 0.5 }}
                    viewport={{ once: true }}
                    dangerouslySetInnerHTML={{ __html: vision?.description }}
                  >
                  </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Vision;