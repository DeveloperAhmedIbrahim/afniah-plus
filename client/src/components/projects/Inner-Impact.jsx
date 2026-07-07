import React from "react";
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";
import { ASSETS_URL } from "@/lib/utils";

const Impact = ({ project }) => {
    const { isRTL } = useLocalization();

    const hasImage = Boolean(project?.impact_image);

    return (
        <section className="relative py-16  overflow-hidden">
            <div className="relative max-w-7xl mx-auto">

                {/* ── Section heading ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <p className="text-golden-primary font-primary text-sm uppercase tracking-wider mb-3">
                        {isRTL ? `نتائج المشروع` : `Project Results`}
                    </p>
                    <h2 className="text-3xl lg:text-4xl text-green-primary font-primary">
                        {isRTL ? `أثر المشروع` : `Project Impact`}
                    </h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "60px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="h-1 bg-golden-primary rounded-full mx-auto mt-4"
                    />
                </motion.div>

                {/* ── Content: image + text (image leads — opposite to ScopeOfWork) ── */}
                {hasImage ? (
                    /* Two-column layout: image LEFT, text RIGHT — inverted from CaseStudy */
                    <div className={`grid lg:grid-cols-2 gap-12 items-center ${isRTL ? "direction-rtl" : ""}`}>
                        {/* Image side */}
                        <motion.div
                            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative order-2 lg:order-1"
                        >
                            <div className="relative h-[550px] rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={`${ASSETS_URL}/${project.impact_image}`}
                                    alt={isRTL ? "أثر المشروع" : "Project Impact"}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent" />
                            </div>
                        </motion.div>

                        {/* Text side */}
                        <motion.div
                            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6 order-1 lg:order-2"
                        >
                            <div
                                className="text-gray-600 font-primary text-xl leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: project.impact }}
                            />
                        </motion.div>
                    </div>
                ) : (
                    /* Centered single-column layout when no image */
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div
                            className="text-gray-600 font-primary text-xl leading-relaxed text-center"
                            dangerouslySetInnerHTML={{ __html: project.impact }}
                        />
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Impact;