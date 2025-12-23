import React from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Shield,
  Clock,
} from "lucide-react";
import { useLocalization } from '@/contexts/LocalizationContext';

const Approach = ({ id }) => {
      const { t, isRtl } = useLocalization();
    
    return (
        <section className="relative py-16 lg:py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl text-green-primary font-primary mb-4">
                        {t(`services.list.${id}.details.approach.title`)}
                    </h2>
                    <p className="text-gray-600 font-primary text-lg max-w-2xl mx-auto">
                        {t(`services.list.${id}.details.approach.description`)}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {t(`services.list.${id}.details.approach.list`).map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="w-16 h-16 bg-gradient-to-br from-golden-primary to-golden-primary rounded-2xl flex items-center justify-center mb-6 text-white"
                                dangerouslySetInnerHTML={{ __html: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-icon lucide-shield"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>' }}
                            >
                                                                
                                {/* <item.icon className="w-8 h-8 text-white" /> */}
                            </motion.div>

                            <h3 className="text-2xl text-green-primary font-primary mb-4">
                                {item.title}
                            </h3>

                            <p className="text-gray-600 font-primary leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Approach
