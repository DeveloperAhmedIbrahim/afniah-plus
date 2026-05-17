import React from 'react'
import { motion } from "framer-motion";
import { useLocalization } from '@/contexts/LocalizationContext';


const CTASection = () => {
    const { isRTL } = useLocalization();
    return (
        <section className="relative py-25 bg-white-700/50 flex flex-col items-center text-center justify-center overflow-hidden mb-0" style={{ backgroundImage: 'url(/assets/others/07.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
            <div className='absolute inset-0 bg-white/80 z-0'></div>
            <div className="max-w-7xl mx-auto px-4 lg:px-8 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <a href='/contact' target='_blank' className="btn-primary">
                        {isRTL ? "اتصل بنا" : "Contact Us"}
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

export default CTASection
