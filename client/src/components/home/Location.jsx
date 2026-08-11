import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";

const LocationSection = ({ location }) => {

  const { isRTL } = useLocalization();
  return (
    <motion.section
      className="py-16"
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
            <h2 className="text-3xl lg:text-5xl text-green-primary leading-tight">
              {location?.title || "Our Location"}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100px" }}
                transition={{ duration: 1.2, delay: 0.6 }}
                viewport={{ once: true }}
                className="h-1 bg-golden-primary rounded-full mb-5"
              />              
            </h2>
          </div>
          {location?.btn_link && (
            <div className="pe-20">
              <a className="btn-primary" target="_blank" rel="noopener noreferrer" href={location.btn_link}>
                {location?.btn_text || "View on Map"}
              </a>
            </div>
          )}
        </motion.div>
        {/* Main Content Grid */}
        <div className="">
          <a href="https://maps.app.goo.gl/SP1XGerEb1VPaxLf7" target="_blank" className="block">
            <img src={isRTL ? `assets/maps/ar.jpeg` : `assets/maps/en.jpeg`} alt="" />
          </a>
        </div>
      </div>

    </motion.section>
  );
};

export default LocationSection;