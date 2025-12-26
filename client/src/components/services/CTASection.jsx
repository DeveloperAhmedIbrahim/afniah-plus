import React from 'react'
import { motion } from "framer-motion";
import { useLocalization } from '@/contexts/LocalizationContext';


const CTASection = () => {
    const { isRTL } = useLocalization();
    return (
        <section className="relative py-25 bg-white-700/50 flex flex-col items-center text-center justify-center overflow-hidden mb-0" style={{ backgroundImage: 'url(/assets/hero/1.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
            <div className='absolute inset-0 bg-white/80 z-0'></div>
            <div className="footer-wave-top z-100">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                    <path style={{ fill: "#fcf7df", transform: "rotateY(0deg)", "transformOrigin": "center" }} d="M737.9,94.7L0,0v100h1000V0L737.9,94.7z"></path>
                </svg>
            </div>
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
            <div className="footer-wave-top z-100 bottom-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none" style={{ transform: "translateX(-50%) rotateX(180deg)" }}>
                    <path style={{ fill: "#FAFAF9", transform: "rotateY(0deg)", "transformOrigin": "center" }} d="M737.9,94.7L0,0v100h1000V0L737.9,94.7z"></path>
                </svg>
            </div>            
        </section>
    )
}

export default CTASection
