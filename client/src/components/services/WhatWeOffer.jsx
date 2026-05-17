import React from "react";
import ServiceCard from "@/components/services/ServiceCard";
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";

const WhatWeOffer = ({ whatWeOffer, services }) => {

    const { isRTL } = useLocalization();
    return (
        <div className="relative min-h-screen py-16 lg:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 relative"
                >
                    <p className="text-golden-primary font-primary text-sm uppercase tracking-wider mb-3">
                        {whatWeOffer.toptitle}
                    </p>
                    <h2 className="text-3xl lg:text-5xl text-green-primary font-primary mb-4">
                        {whatWeOffer.title}
                    </h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "60px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="h-1 bg-golden-primary rounded-full mx-auto my-4"
                    />                    
                    <p className="text-gray-600 font-primary max-w-2xl mx-auto">
                        {whatWeOffer.subtitle}
                    </p>
                </motion.div>

                {/* Services Cards */}
                <div className="flex flex-wrap justify-center gap-8">
                    {services.map((service, index) => (
                        <div key={service.id} className="w-full md:w-[calc(33.333%-1.34rem)]">
                            <ServiceCard service={service} index={index} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhatWeOffer;
