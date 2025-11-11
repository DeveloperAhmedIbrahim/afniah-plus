import React from "react";
import { motion } from "framer-motion";
import { Archive, CheckCircle } from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";

const Overview = ({ id }) => {
    const { t, isRtl } = useLocalization();

    return (
        <section className="relative py-16 lg:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div>
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "60px" }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="h-1 bg-golden-primary rounded-full mb-4"
                            />
                            <h2 className="text-3xl lg:text-4xl text-green-primary font-primary mb-4">
                                {t(`services.list.${id}.details.overview.title`)}
                            </h2>
                        </div>

                        <p className="text-gray-600 font-primary text-lg leading-relaxed">
                            {t(`services.list.${id}.details.overview.description.0`)}
                        </p>

                        <p className="text-gray-600 font-primary text-lg leading-relaxed">
                            {t(`services.list.${id}.details.overview.description.1`)}
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            {t(`services.list.${id}.details.overview.services`).map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-2"
                                >
                                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700 font-primary text-sm">
                                        {service}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative h-[550px] rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="/assets/hero/3.png"
                                alt="Documentation"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent" />

                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute top-50 left-8 right-8 bg-white/50 backdrop-blur-md rounded-xl p-6"
                            >
                                <div className="flex items-center gap-4">
                                    <Archive className="w-12 h-12 text-golden-primary" />
                                    <div>
                                        <div className="text-2xl font-bold text-green-primary font-primary">
                                            10,000+
                                        </div>
                                        <div className="text-sm text-gray-600 font-primary">
                                            Documents Archived
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-green-500/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Overview;
