import React from "react";
import ServiceCard from "@/components/services/ServiceCard";
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";
import { MapPin } from "lucide-react";

const WhatWeDone = () => {
    const { t, isRTL } = useLocalization();
    const projects = t('project.list');
    return (
        <div className="relative min-h-screen py-16 lg:py-24 bg-amber-100/50 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>
            {/* Floating Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-20 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-40 right-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 relative"
                >
                    <img
                        src="/assets/others/06.png"
                        alt=""
                        className={`absolute inset-0 m-auto w-60  -top-35 -z-10 opacity-90 ${isRTL ? "-scale-x-100" : ""
                            }`}
                    />
                    <p className="text-golden-primary font-primary text-sm uppercase tracking-wider mb-3">
                        {t('about.voices.tag')}
                    </p>
                    <h2 className="text-3xl lg:text-5xl text-green-primary font-primary mb-4">
                        {t('projects.whatWeDone.title')}
                    </h2>
                    <p className="text-gray-600 font-primary max-w-2xl mx-auto">
                        {t('projects.whatWeDone.description')}
                    </p>
                </motion.div>

                {/* Services Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
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
                      <div className={`absolute top-4 lg:top-6 ${isRTL ? 'right-4 lg:right-6' : 'left-4 lg:left-6'} flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 lg:px-4 py-1.5 lg:py-2 rounded-full shadow-sm transition-colors duration-300 group-hover:bg-green-primary`}>
                        <MapPin className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-stone-700 group-hover:text-white transition-colors duration-300" />
                        <span className="text-xs lg:text-sm font-medium text-stone-700 group-hover:text-white transition-colors duration-300">
                          {project.location}
                        </span>
                      </div>

                      {/* Bottom Content */}
                      <div className={`absolute bottom-0 left-0 right-0 p-4 lg:p-6 xl:p-8 w-full ${
                        isRTL ? 'text-right' : 'text-left'
                      }`}>
                        <h3 className="text-white text-lg sm:text-xl lg:text-2xl mb-4 lg:mb-6 leading-tight font-light">
                          {project.title}
                        </h3>
                       
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
                </div>
            </div>
        </div>
    );
};

export default WhatWeDone;
