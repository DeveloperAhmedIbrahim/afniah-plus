import React from "react";
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";

const Overview = ({ project }) => {
    const { isRTL } = useLocalization();
    const categories = [
        { value: 'Residential Complexes', labelEn: 'Residential Complexes', labelAr: 'مجمعات سكنية' },
        { value: 'Urban Planning', labelEn: 'Urban Planning', labelAr: 'تخطيط عمراني' },
        { value: 'Hospitality & Resorts', labelEn: 'Hospitality & Resorts', labelAr: 'الضيافة والمنتجعات' },
        { value: 'Mosque', labelEn: 'Mosque', labelAr: 'مساجد' },
        { value: 'Museums', labelEn: 'Museums', labelAr: 'متاحف' },
        { value: 'Healthcare', labelEn: 'Healthcare', labelAr: 'الرعاية الصحية' },
        { value: 'Education', labelEn: 'Education', labelAr: 'تعليم' },
    ];    

    return (
        <div className="relative py-16 lg:py-24 bg-amber-100/50 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>
            {/* Floating Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-20 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-40 right-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
                />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16 relative"
                >
                    <img
                        src="/assets/others/06.png"
                        alt=""
                        className={`absolute  m-auto w-60  top-0 inset-60 -z-10 opacity-90 ${isRTL ? "-scale-x-100" : ""
                            }`}
                    />
                    <p className="text-golden-primary font-primary text-sm uppercase tracking-wider mb-3 text-center">
                        {isRTL ? `نظرة عامة على المشروع` : `Project Overview` }
                    </p>
                    <h2 className="text-3xl lg:text-5xl text-green-primary font-primary mb-4 text-center">
                        {project.title}
                    </h2>
                    <p className="text-gray-600 font-primary max-w-2xl mx-auto text-center">
                        {categories.find(cat => cat.value === project.category)?.[isRTL ? 'labelAr' : 'labelEn']}
                    </p>
                    <hr className="my-4" />
                    <p className="text-gray-600 font-primary mx-auto text-xl" dangerouslySetInnerHTML={{ __html: project.description }}></p>                    
                </motion.div>
            </div>
        </div>
    );
};

export default Overview;
