import React from "react";
import { motion } from "framer-motion";
import { ASSETS_URL } from "@/lib/utils";

const Process = ({ section03, section03Bullets }) => {
    return (
        <section className="relative py-16  overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={`${ASSETS_URL}/${section03.image}`}
                                alt="Process"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl lg:text-4xl text-green-primary font-primary mb-4">
                                {section03?.title}
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "80px" }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="h-1 bg-golden-primary rounded-full my-4"
                                />                                
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {section03Bullets.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex gap-6"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-golden-primary rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                            {index+1}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl text-green-primary font-primary mb-2">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-600 font-primary leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Process;
