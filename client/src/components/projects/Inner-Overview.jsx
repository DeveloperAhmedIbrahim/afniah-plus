import React from "react";
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";

const Overview = ({ id }) => {
    const { t, isRTL } = useLocalization();

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
                    className="text-center mb-16 relative"
                >
                    <img
                        src="/assets/others/06.png"
                        alt=""
                        className={`absolute  m-auto w-60  top-0 inset-60 -z-10 opacity-90 ${isRTL ? "-scale-x-100" : ""
                            }`}
                    />
                    <p className="text-golden-primary font-primary text-sm uppercase tracking-wider mb-3">
                        Project Overview
                    </p>
                    <h2 className="text-3xl lg:text-5xl text-green-primary font-primary mb-4">
                        Project Title
                    </h2>
                    <p className="text-gray-600 font-primary max-w-2xl mx-auto">
                        Project Catrgory
                    </p>
                    <hr className="my-4" />
                    <p className="text-gray-600 font-primary mx-auto text-center text-xl">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, quidem dolorem! Ab officia itaque sunt minima animi fugit molestias ullam, pariatur dolores optio eligendi quo aliquam libero rem voluptatibus! Recusandae cum commodi, similique architecto illum quod inventore dolores soluta quam corporis aliquam magnam numquam ut expedita vel delectus aspernatur quo tempore. Tempora deleniti atque iste expedita nesciunt a, asperiores suscipit quisquam vitae exercitationem recusandae facere quasi ipsum eius aliquam quibusdam maxime tenetur qui porro rem, pariatur veritatis velit quod delectus. Doloribus reprehenderit ipsum voluptatibus eos, enim at temporibus nobis ipsam quae! Expedita sint reiciendis ullam facere deleniti in cum quae!
                    </p>                    
                </motion.div>
            </div>
        </div>
    );
};

export default Overview;
