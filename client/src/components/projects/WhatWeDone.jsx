import React from "react";
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ASSETS_URL } from "@/lib/utils";

const WhatWeDone = ({portfolio, projects}) => {
  const { isRTL } = useLocalization();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen py-16  bg-amber-100/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <p className="text-golden-primary font-primary text-sm uppercase tracking-wider mb-3">
            {portfolio?.toptitle}
          </p>
          <h2 className="text-3xl lg:text-5xl text-green-primary font-primary mb-4">
            {portfolio?.title}
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="h-1 bg-golden-primary rounded-full mx-auto mt-4"
            />            
          </h2>
          <p className="text-gray-600 font-primary max-w-2xl mx-auto">
            {portfolio?.subtitle}
          </p>
        </motion.div>

        {/* Services Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="group cursor-pointer h-full"
                onClick={() => navigate(`/project/${project.id}`)}
              >
                <div className="relative h-100  overflow-hidden rounded-xl lg:rounded-2xl shadow-lg">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${ASSETS_URL}/${project.featured_image})`,
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="                    
                    absolute inset-0 
                    bg-gradient-to-t 
                    from-green-primary 
                    via-green-primary/60 
                    to-transparent 
                    opacity-0 
                    group-hover:opacity-100 
                    transition duration-500" 
                  />

                  {/* Gradient Overlay */}
                  <div
                      className={`absolute inset-0 bg-gradient-to-t bg-green-primary opacity-50 transition-opacity duration-500`}
                  />                  

                  {/* Location Pin */}
                  <div
                    className={`absolute top-4 lg:top-6 ${
                      isRTL ? "right-4 lg:right-6" : "left-4 lg:left-6"
                    } flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 lg:px-4 py-1.5 lg:py-2 rounded-full shadow-sm transition-colors duration-300 group-hover:bg-green-primary`}
                  >
                    <MapPin className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-stone-700 group-hover:text-white transition-colors duration-300" />
                    <span className="text-xs lg:text-sm font-medium text-stone-700 group-hover:text-white transition-colors duration-300">
                      {project.location}
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className={`absolute bottom-0 left-0 right-0 p-4 lg:p-6 xl:p-8 w-full`}>
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
