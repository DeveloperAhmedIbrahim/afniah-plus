import React from "react";
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";
import { ASSETS_URL } from "@/lib/utils";

const ScopeOfWork = ({ project }) => {
    const { isRTL } = useLocalization();

    const hasImage = Boolean(project?.scope_image);

    return (
        <div className="relative py-16 lg:py-24 bg-amber-100/50 overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 lg:px-8">

                {/* ── Section heading ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center relative"
                >
                    <img
                        src="/assets/others/06.png"
                        alt=""
                        className={`absolute m-auto w-60 top-0 inset-60 -z-10 opacity-90 ${isRTL ? "-scale-x-100" : ""}`}
                    />
                    <p className="text-golden-primary font-primary text-sm uppercase tracking-wider mb-3">
                        {isRTL ? `تفاصيل المشروع` : `Project Details`}
                    </p>
                    <h2 className="text-3xl lg:text-4xl text-green-primary font-primary">
                        {isRTL ? `نطاق العمل` : `Scope of Work`}
                    </h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "60px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="h-1 bg-golden-primary rounded-full mx-auto mt-4"
                    />
                </motion.div>

                {/* ── Content: text + optional image ── */}
                {hasImage ? (
                    /* Two-column layout when image exists — mirrors CaseStudy */
                    <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? "direction-rtl" : ""}`}>
                        {/* Text side */}
                        <motion.div
                            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div
                                className="text-gray-600 font-primary text-xl leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: project.scope }}
                            />
                        </motion.div>

                        {/* Image side */}
                        <motion.div
                            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative h-[550px] rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={`${ASSETS_URL}/${project.scope_image}`}
                                    alt={isRTL ? "نطاق العمل" : "Scope of Work"}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent" />
                            </div>
                        </motion.div>
                    </div>
                ) : (
                    /* Centered single-column layout when no image — mirrors Overview description */
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div
                            className="text-gray-600 font-primary text-xl leading-relaxed text-center"
                            dangerouslySetInnerHTML={{ __html: project.scope }}
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ScopeOfWork;