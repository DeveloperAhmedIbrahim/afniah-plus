import React from "react";
import { motion } from "framer-motion";
import { Archive, CheckCircle } from "lucide-react";
import { useLocalization } from "@/contexts/LocalizationContext";

const CaseStudy = ({ id }) => {
    const { t, isRTL } = useLocalization();

    return (
        <section className="relative py-16 lg:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div>
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "60px" }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="h-1 bg-golden-primary rounded-full mb-4"
                            />
                            <h2 className="text-3xl lg:text-4xl text-green-primary font-primary mb-4">
                                Case Study
                            </h2>
                        </div>

                        <p className="text-gray-600 font-primary text-lg leading-relaxed">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus aspernatur quasi dignissimos itaque cupiditate ut non ipsa eveniet? Suscipit amet beatae rerum reprehenderit minus natus harum fugiat accusantium, fugit repudiandae ullam aliquid perferendis labore quae pariatur? Dicta ullam numquam quis? Omnis quos nihil id quae ipsa, earum natus repellendus ratione.
                        </p>

                        <p className="text-gray-600 font-primary text-lg leading-relaxed">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus aspernatur quasi dignissimos itaque cupiditate ut non ipsa eveniet? Suscipit amet beatae rerum reprehenderit minus natus harum fugiat accusantium, fugit repudiandae ullam aliquid perferendis labore quae pariatur? Dicta ullam numquam quis? Omnis quos nihil id quae ipsa, earum natus repellendus ratione.
                        </p>                        

                        <p className="text-gray-600 font-primary text-lg leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dignissimos ullam officiis ex veniam, quod accusamus est consequatur nisi, quis sed autem in? Ex nisi minima obcaecati excepturi? Nemo dolores, totam impedit provident nostrum soluta. Porro blanditiis quos aspernatur nam ex nihil sit voluptatibus hic, fugiat ut? Eum, corporis rem!
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative h-[550px] rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="/assets/hero/1.png"
                                alt="Documentation"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent" />
                        </div>

                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-green-500/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CaseStudy;
