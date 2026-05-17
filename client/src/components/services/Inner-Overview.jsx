import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { ASSETS_URL } from "@/lib/utils";

const Overview = ({ section01, section01Bullets }) => {
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
                            <h2 className="text-3xl lg:text-4xl text-green-primary font-primary mb-4">
                                {section01?.title}
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "80px" }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="h-1 bg-golden-primary rounded-full my-4"
                                />                                
                            </h2>
                        </div>

                        <p className="text-gray-600 font-primary text-lg leading-relaxed" dangerouslySetInnerHTML={{__html:section01?.description}}>
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            {section01Bullets.map((bullet, index) => (
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
                                        {bullet.bullet_text}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative h-[550px] rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={`${ASSETS_URL}/${section01.image}`}
                                className="w-full h-full object-cover"
                            />                            
                            <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent" />

                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute top-50 left-8 right-8 bg-white/50 backdrop-blur-md rounded-xl p-6"
                            >
                                <div className="flex items-center gap-4">
                                    <div 
                                    className="w-12 h-12 text-golden-primary [&>svg]:w-full [&>svg]:h-full" 
                                    dangerouslySetInnerHTML={{__html: section01.stats_icon}}
                                    ></div>                                    
                                    {/* <div className="w-12 h-12 text-golden-primary" dangerouslySetInnerHTML={{__html: section01.stats_icon}}></div> */}
                                    <div>
                                        <div className="text-2xl font-bold text-green-primary font-primary">
                                            {section01.stats_count}+
                                        </div>
                                        <div className="text-sm text-gray-600 font-primary">
                                            {section01.stats_title}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Overview;
