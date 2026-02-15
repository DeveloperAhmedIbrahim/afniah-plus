import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { ASSETS_URL } from '@/lib/utils';

const Gallery = ({ gallery }) => {
    const { isRTL } = useLocalization();

    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openGallery = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeGallery = () => {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
    };

    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1) % gallery.length);
    };

    const goPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;
            if (e.key === 'Escape') closeGallery();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
        <div className="relative min-h-screen py-16 lg:py-24 bg-amber-100/50 overflow-hidden">
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
                    <p className="text-golden-primary font-primary text-sm uppercase tracking-wider mb-3">
                        {isRTL ? `معرض المشروع` : `Project Gallery`}
                    </p>
                    <h2 className="text-3xl lg:text-5xl text-green-primary font-primary mb-4">
                        {isRTL ? `كل زاوية تروي قصة` : `Every angle tells a story`}
                    </h2>
                    <p className="text-gray-600 font-primary max-w-2xl mx-auto">
                        {isRTL ? `لحظات تبرز الجمال وتخلّد أثره` : `see the timeless beauty of real time clicks.`}
                    </p>
                    <hr className="my-4" />
                    {/* Gallery Grid */}
                    <div className="max-w-7xl mx-auto p-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
                            {gallery.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
                                    onClick={() => openGallery(index)}
                                >
                                    <img
                                        src={ASSETS_URL+'/'+image.image}
                                        alt={image.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Maximize2 className="text-white" size={32} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Lightbox Modal */}
                    {isOpen && (
                        <div className="fixed inset-0 bg-black z-200 flex flex-col">
                            {/* Top Bar */}
                            <div className="absolute w-full z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
                                <div className="text-white text-sm font-medium">
                                    {currentIndex + 1} / {gallery.length}
                                </div>
                                <button
                                    onClick={closeGallery}
                                    className="text-white hover:text-gray-300 transition-colors"
                                >
                                    <X size={32} />
                                </button>
                            </div>

                            {/* Main Image Container */}
                            <div className="flex-1 flex items-center justify-center p-12">
                                <img
                                    src={ASSETS_URL+'/'+gallery[currentIndex].image}
                                    alt={gallery[currentIndex].title}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>

                            {/* Bottom Title Bar */}
                            {gallery[currentIndex].title && (
                                <div className="absolute bottom-0 w-full text-center z-50 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                    <p className="text-white text-center text-sm">
                                        {gallery[currentIndex].title}
                                    </p>
                                </div>
                            )}

                            {/* Navigation Arrows */}
                            <button
                                onClick={goPrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/30 hover:bg-black/50 rounded-full p-3 z-50"
                            >
                                <ChevronLeft size={40} />
                            </button>

                            <button
                                onClick={goNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black/30 hover:bg-black/50 rounded-full p-3 z-50"
                            >
                                <ChevronRight size={40} />
                            </button>

                            {/* Thumbnail Strip at Bottom */}
                            <div className="absolute bottom-16 w-full z-50 px-4">
                                <div className="flex gap-2 justify-center overflow-x-auto pb-2">
                                    {gallery.map((image, index) => (
                                        <div
                                            key={image.id}
                                            onClick={() => setCurrentIndex(index)}
                                            className={`flex-shrink-0 w-16 h-16 cursor-pointer rounded overflow-hidden border-2 transition-all ${index === currentIndex
                                                    ? 'border-white scale-110'
                                                    : 'border-transparent opacity-60 hover:opacity-100'
                                                }`}
                                        >
                                            <img
                                                src={ASSETS_URL+'/'+image.image}
                                                alt={image.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Gallery;
