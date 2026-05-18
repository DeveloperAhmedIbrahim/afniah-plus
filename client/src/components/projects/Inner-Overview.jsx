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
        <div className="relative py-16  overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16 relative"
                >
                    <p className="text-golden-primary font-primary text-sm uppercase tracking-wider mb-3 text-center">
                        {isRTL ? `نبذة عامة عن المشروع` : `Project Overview` }
                    </p>
                    <h2 className="text-3xl lg:text-5xl text-green-primary font-primary mb-4 text-center">
                        {project.title}
                    </h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "60px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="h-1 bg-golden-primary rounded-full mx-auto mt-4"
                    />                    
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
