import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";

const ContactInfo = ({ social }) => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const { isRTL } = useLocalization();

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
                    <motion.div
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
                                <MapPin className="w-8 h-8" />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-primary text-gray-800 mb-4">
                                {isRTL ? `عنوان المكتب` : `Address`}
                            </h3>

                            {/* Content */}
                            <div className="space-y-1 text-sm text-gray-600 font-light">
                                <p>{social.address}</p>
                            </div>
                        </div>
                        {/* Subtle bottom glow */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                    <motion.div
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
                                <Mail className="w-8 h-8" />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-primary text-gray-800 mb-4">
                                {isRTL ? `البريد الإلكتروني` : `Email Address`}
                            </h3>

                            {/* Content */}
                            <div className="space-y-1 text-sm text-gray-600 font-light">
                                <a
                                    href={`mailto:${social.email}`}
                                    className="block hover:text-green-primary transition-colors"
                                >
                                    {social.email}
                                </a>
                            </div>
                        </div>
                        {/* Subtle bottom glow */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                    <motion.div
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
                                <Phone className="w-8 h-8" />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-primary text-gray-800 mb-4">
                                {isRTL ? `رقم التواصل` : `Phone Number`}
                            </h3>

                            {/* Content */}
                            <div className="space-y-1 text-sm text-gray-600 font-light">
                                <p>
                                    <a
                                        href={`tel:${social.contact}`}
                                        className="block hover:text-green-primary transition-colors"
                                    >
                                        {social.contact}
                                    </a>
                                </p>
                            </div>
                        </div>
                        {/* Subtle bottom glow */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>                                        
                </div>
            </div>
        </section>
    );
};

export default ContactInfo;