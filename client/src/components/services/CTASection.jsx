import React from 'react'
import { motion } from "framer-motion";
import { useLocalization } from '@/contexts/LocalizationContext';
import { Link } from 'react-router-dom';


const CTASection = () => {
    const { t, isRTL } = useLocalization();
    return (
        <section className="relative min-h-screen py-16 bg-white-700/50 flex flex-col items-center text-center justify-center overflow-hidden mb-50" style={{ backgroundImage: 'url(/assets/hero/1.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
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
                    <h2 className="text-4xl lg:text-5xl text-green-primary mb-6 shadow-lg font-bold px-10 py-5">
                        {t('services.cta.title')}
                    </h2>
                    <p className="text-green-primary text-xl font-light mb-15 max-w-2xl mx-auto  shadow-lg px-10 py-5">
                        <b>{t('services.cta.description.0')}</b>
                        <br />
                        <br />
                        <b className='text-3xl underline'>{t('services.cta.description.1')}</b>
                        <br />
                        <br />
                        <b>{t('services.cta.description.2')}</b>
                        <br />                        
                        <br />                        
                        <b className='text-3xl underline'>{t('services.cta.description.3')}</b>
                    </p>
                    <a href='/contact' target='_blank' className="btn-primary">
                        {t('services.cta.action')}
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
