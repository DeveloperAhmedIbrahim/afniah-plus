import React from 'react'
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { ASSETS_URL } from '@/lib/utils';

const ServiceCard = ({ service, index }) => {
    return (
        <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <div className="group relative h-[450px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${ASSETS_URL}/${service.featured_image})` }}
                />

                {/* Gradient Overlay */}
                <div
                    className={`absolute inset-0 bg-gradient-to-t bg-green-primary opacity-60 group-hover:opacity-75 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                    >
                        <div 
                            className="w-12 h-12 text-white [&>svg]:w-full [&>svg]:h-full" 
                            dangerouslySetInnerHTML={{__html: service.icon}}
                        >
                        </div>                        
                        {/* <div className='w-12 h-12 text-white mb-4' dangerouslySetInnerHTML={{__html: service.icon}} ></div>                        */}
                        {/* <service.icon className="w-12 h-12 text-white mb-4" /> */}
                        <h3 className="text-3xl text-white mb-2">
                            {service.title}
                        </h3>
                        <p className="text-white/90 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {service.description}
                        </p>
                        <div className="flex items-center text-white">
                            <Link to={`/services/${service.id}`} className="flex items-center font-medium group">
                                <span className="mr-2">Learn More</span>
                                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-white/30 rounded-tr-2xl" />
            </div>
        </motion.div>
    )
}

export default ServiceCard
