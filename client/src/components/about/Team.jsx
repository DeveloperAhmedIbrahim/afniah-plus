import React from "react";
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";
import { ASSETS_URL } from "@/lib/utils";

const Team = ({ team, teamMembers }) => {
  const { isRTL } = useLocalization();
  return (
    <section className="relative py-16 ">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid Container */}
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
          isRTL ? 'lg:grid-flow-col-dense' : ''
        }`}>
          
          {/* Left Side - Sticky Content */}
          <div className={`space-y-6 text-justify ${
                isRTL ? "lg:col-start-2" : ""
              }`}>
            <motion.div
              initial={{ opacity: 0, y: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`sticky top-24 ${isRTL ? 'text-right' : 'text-left'}`}
            >
              <h2 className="inline-block text-3xl lg:text-5xl text-green-primary font-primary leading-tight mb-4 w-[300px]">
                {team?.title}
              </h2>
              <img className="inline-block ml-2 -mt-5" width={40} src="/assets/favicon/favicon.png"/>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100px" }}
                transition={{ duration: 1.2, delay: 0.6 }}
                viewport={{ once: true }}
                className="h-1 bg-golden-primary rounded-full mb-5"
              />                
              <p className="text-gray-600 font-primary leading-relaxed mb-8 text-justify text-lg">
                {team?.description}
              </p>
            </motion.div>
          </div>

          {/* Right Side - Team Grid */}
          <div className={`relative ${isRTL ? "lg:col-start-1" : ""}`}>
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
                  <div className="relative h-[300px] rounded-2xl overflow-hidden rounded-b-none">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${ASSETS_URL}/${member.image})`,
                      }}
                    />
                  </div>
                  <div className="border-l-4 border-golden-primary px-2 pb-4">
                    <div className="mt-2 text-green-primary text-lg">
                      {member.name}
                    </div>
                    <div className="text-golden-primary" style={{lineHeight: 0}}>
                      {member.designation}
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