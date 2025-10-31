import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";

const ContactInfo = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const { t } = useLocalization();

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 60, scale: 0.95 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: i * 0.2,
                duration: 0.6,
                ease: "easeOut",
            },
        }),
    };

    return (
        <section
            ref={containerRef}
            className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {t('contact.info').map((card, index) => {
                        const Icon = card.icon;

                        return (
                            <motion.div
                                key={index}
                                custom={index}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                variants={cardVariants}
                                whileHover={{
                                    y: -8,
                                    scale: 1.03,
                                    transition: { duration: 0.3 },
                                }}
                                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
                            >
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-green-primary/5 to-golden-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative p-8 text-center">
                                    {/* Icon Circle */}
                                    <div className="mx-auto mb-5 w-16 h-16 bg-green-primary rounded-full flex items-center justify-center text-white shadow-md transform group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-8 h-8" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-primary text-gray-800 mb-4">
                                        {card.title}
                                    </h3>

                                    {/* Content */}
                                    <div className="space-y-1 text-sm text-gray-600 font-light">
                                        {card.isEmail ? (
                                            <>
                                                <a
                                                    href={`mailto:${card.detail}`}
                                                    className="block hover:text-green-primary transition-colors"
                                                >
                                                    {card.detail}
                                                </a>
                                                <a
                                                    href={`mailto:${card.line2}`}
                                                    className="block hover:text-green-primary transition-colors"
                                                >
                                                    {card.line2}
                                                </a>
                                            </>
                                        ) : card.isPhone ? (
                                            <>
                                                <a
                                                    href={`tel:${card.detail.replace(/[^+\d]/g, "")}`}
                                                    className="block hover:text-green-primary transition-colors"
                                                >
                                                    {card.detail}
                                                </a>
                                            </>
                                        ) : (
                                            <>
                                                <p>{card.detail}</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Subtle bottom glow */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ContactInfo;