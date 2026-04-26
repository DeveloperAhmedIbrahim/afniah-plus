import React from "react";
import ServiceCard from "@/components/services/ServiceCard";
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";

const WhatWeOffer = ({ whatWeOffer, services }) => {

    const { isRTL } = useLocalization();
    return (
        <div className="relative min-h-screen py-16 lg:py-24 bg-amber-100/50 overflow-hidden">
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
                        {whatWeOffer.toptitle}
                    </p>
                    <h2 className="text-3xl lg:text-5xl text-green-primary font-primary mb-4">
                        {whatWeOffer.title}
                    </h2>
                    <p className="text-gray-600 font-primary max-w-2xl mx-auto">
                        {whatWeOffer.subtitle}
                    </p>
                </motion.div>

                {/* Services Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhatWeOffer;
