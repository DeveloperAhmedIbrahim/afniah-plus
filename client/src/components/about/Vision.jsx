import React from "react";
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";

const Vision = () => {
  const { t, isRTL } = useLocalization();

  return (
    <section className="relative overflow-hidden">
      <section className="relative min-h-screen bg-gradient-to-r from-amber-50/50 via-orange-50/50 to-red-50/50 py-16 lg:py-24 overflow-hidden">
        {/* Animated Floating Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, 120, 0], y: [0, -60, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 -left-20 w-96 h-96 bg-golden-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -100, 0], y: [0, 80, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-32 right-0 w-80 h-80 bg-green-primary/15 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl"
          />
        </div>

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
                            className={`space-y-6 ${
                isRTL ? "lg:col-start-2 text-right" : "text-left"
              }`}
            >
              <div className="relative h-[420px] lg:h-[560px] rounded-2xl overflow-hidden shadow-2xl">
                {/* Main Image with Zoom */}
                <motion.img
                  src="/assets/hero/2.png"
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
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 left-8 w-32 h-32 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center"
                >
                  <img src="/assets/logo/logo.png" alt="Heritage" className="w-20" />
                </motion.div>

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
              {/* Decorative Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-6 relative"
              >
                <img
                  src="/assets/others/05.png"
                  alt=""
                  className={`w-70 absolute -top-10 right-0 -z-10 opacity-90 ${
                    isRTL ? "mr-0 ml-auto -scale-x-100" : ""
                  }`}
                />
              </motion.div>              
              {/* Title */}
              <div className="relative">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-4xl lg:text-5xl xl:text-6xl font-primary text-green-primary leading-tight"
                >
                  {t("about.vision.title") || "Our Vision"}
                </motion.h2>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100px" }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="h-1 bg-golden-primary rounded-full mt-2"
                />
              </div>

              {/* Paragraphs with Stagger Animation */}
              <div className="space-y-6 text-lg lg:text-xl font-light text-gray-700 leading-relaxed font-primary">
                {[
                  t("about.vision.paragraphs.0") ||
                    "To become the premier national reference in the development of specialized creative and documentary content, by offering cognitive and visual solutions that elevate the standards of cultural and institutional communication in the Kingdom.",
                  t("about.vision.paragraphs.1") ||
                    "We aspire to craft content that contributes to preserving national memory and enhancing the value of local identity using methods consistent with global best practices in design, publishing, and documentation, without losing touch with its cultural roots."
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: i * 0.3 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Vision;