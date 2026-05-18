import React from "react";
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";
import { ASSETS_URL } from "@/lib/utils";

const WhoWeAre = ({ whoWeAre }) => {
  const { isRTL } = useLocalization();
  console.log("WhoWeAre Component:", whoWeAre);
  return (
    <section className="relative overflow-hidden">
      <section className="relative min-h-screen py-16 ">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div
            className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
              isRTL ? "lg:grid-flow-col-dense" : ""
            }`}
          >
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`space-y-6  text-justify ${
                isRTL ? "lg:col-start-2" : ""
              }`}
            >
              {/* Heading */}
              <h2 className="text-3xl lg:text-4xl xl:text-5xl text-green-primary font-primary leading-tight z-10 text-left">
                {whoWeAre?.title}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100px" }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="h-1 bg-golden-primary rounded-full mb-5"
                />                
              </h2>

              {/* Description Paragraphs */}
              <div className="space-y-4 font-light text-lg font-primary text-justify">
                <p className="text-gray-600 leading-relaxe" dangerouslySetInnerHTML={{ __html: whoWeAre?.description }}></p>
              </div>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`relative ${isRTL ? "lg:col-start-1" : ""}`}
            >
              <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={`${ASSETS_URL}/${whoWeAre?.image}`}
                  alt="Team"
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-primary/30 to-transparent" />
              </div>

            </motion.div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default WhoWeAre;
