import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const { t, isRTL } = useLocalization();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: t('contact.faq.items.0.question') || "What's Included In Your Tours?",
      answer: t('contact.faq.items.0.answer') || "Our tours include expert local guides, site entry, private transport, and hand-picked stays. Some also feature meals, cultural workshops, and Nile cruises. You'll find the full details with each itinerary."
    },
    {
      question: t('contact.faq.items.1.question') || "Is It Safe To Travel In Egypt?",
      answer: t('contact.faq.items.1.answer') || "Yes — we monitor local conditions closely and work only with licensed, trusted partners. Our Egypt-based team ensures every journey is safe, smooth, and culturally respectful."
    },
    {
      question: t('contact.faq.items.2.question') || "Do You Offer Private Or Custom Tours?",
      answer: t('contact.faq.items.2.answer') || "Absolutely. Whether you travel solo, as a couple, or in a group, we'll tailor the experience to your rhythm and interests — from remote oases to deep historical routes."
    }
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-stone-50 to-amber-50/30 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 -left-20 w-80 h-80 bg-golden-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-green-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
          isRTL ? 'lg:grid-flow-col-dense' : ''
        }`}>
          
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`relative ${isRTL ? 'lg:col-start-2' : ''}`}
          >
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/assets/hero/3.png"
                alt="Saudi Arabia Landscape"
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Decorative Elements */}
            <div className={`absolute -bottom-6 ${isRTL ? '-left-6' : '-right-6'} w-32 h-32 bg-golden-primary/20 rounded-full blur-3xl`} />
            <div className={`absolute -top-6 ${isRTL ? '-right-6' : '-left-6'} w-32 h-32 bg-green-primary/20 rounded-full blur-3xl`} />
          </motion.div>

          {/* Right Side - FAQ */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`space-y-8 ${isRTL ? 'lg:col-start-1 text-right' : 'text-left'}`}
          >
            {/* Title */}
            <div>
              <h2 className="text-3xl lg:text-5xl text-green-primary font-primary leading-tight">
                {t('contact.faq.title') || 'Frequent Acquired Questions'}
              </h2>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl overflow-hidden shadow-md"
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/50 transition-colors duration-200"
                  >
                    <span className="text-lg font-primary text-green-primary pr-4">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-amber-700" />
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-2">
                          <p className="text-gray-600 font-primary leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;