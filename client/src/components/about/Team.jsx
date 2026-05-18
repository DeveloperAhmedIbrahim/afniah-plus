import React from "react";
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";
import { ArrowRight } from "lucide-react";
import { ASSETS_URL } from "@/lib/utils";

const Team = ({ team, teamMembers }) => {
  const { isRtl } = useLocalization();
  return (
    <section className="relative py-16 ">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Main Grid Container */}
        <div className={`grid lg:grid-cols-12 gap-8 lg:gap-12 ${
          isRtl ? 'lg:grid-flow-col-dense' : ''
        }`}>
          
          {/* Left Side - Sticky Content */}
          <div className={`lg:col-span-4 ${isRtl ? 'lg:col-start-8' : ''}`}>
            <motion.div
              initial={{ opacity: 0, y: isRtl ? 50 : -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`sticky top-24 ${isRtl ? 'text-right' : 'text-left'}`}
            >
              <h2 className="text-3xl lg:text-5xl text-green-primary font-primary leading-tight mb-4">
                {team?.title}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100px" }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="h-1 bg-golden-primary rounded-full mb-5"
                />                
              </h2>
              <p className="text-gray-600 font-primary leading-relaxed mb-8 text-justify">
                {team?.description}
              </p>
            </motion.div>
          </div>

          {/* Right Side - Team Grid */}
          <div className={`lg:col-span-8 ${isRtl ? 'lg:col-start-1' : ''}`}>
            <div className="grid md:grid-cols-3 gap-8 md:gap-1">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${ASSETS_URL}/${member.image})`,
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Content */}
                    <div className={`absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-center w-full`}>
                      <h3 className="text-xl text-white font-primary mb-2">
                        {member.name}
                      </h3>
                      <p className="text-white/80 font-primary text-sm leading-relaxed mb-6 ">
                        {member.designation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Team;