import React from 'react'
import { motion } from 'framer-motion'

const Approach = ({ section02, section02Bullets }) => {
    
    return (
        <section className="relative py-16  bg-[#EDF2EF] overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl lg:text-5xl text-green-primary font-primary mb-4">
                        {section02?.title}
                    </h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "60px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="h-1 bg-golden-primary rounded-full mx-auto my-4"
                    />                    
                    <p className="text-gray-600 font-primary text-lg max-w-2xl mx-auto">
                        {section02?.subtitle}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {section02Bullets.map((item, index) => (
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
                                className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white"
                                dangerouslySetInnerHTML={{ __html: item.icon }}
                            >
                                                                
                                {/* <item.icon className="w-8 h-8 text-white" /> */}
                            </motion.div>

                            <h3 className="text-2xl text-green-primary font-primary mb-4">
                                {item.title}
                            </h3>

                            <p className="text-gray-600 font-primary leading-relaxed text-lg">
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
