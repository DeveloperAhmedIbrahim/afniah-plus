import React from "react";
import { motion } from "framer-motion";
import { useLocalization } from "@/contexts/LocalizationContext";
import { ArrowRight, Calendar, User } from "lucide-react";

const Voices = () => {
  const { t, isRTL } = useLocalization();

  return (
    <section className="relative overflow-hidden bg-white/50 py-50 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
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
            className={`absolute inset-0 m-auto w-60  -top-35 -z-10 opacity-90 ${
              isRTL ? "-scale-x-100" : ""
            }`}
          />
          <p className="text-golden-primary font-primary text-sm uppercase tracking-wider mb-3">
            {t('about.voices.tag')}
          </p>
          <h2 className="text-3xl lg:text-5xl text-green-primary font-primary mb-4">
            {t('about.voices.title')}
          </h2>
          <p className="text-gray-600 font-primary max-w-2xl mx-auto">
            {t('about.voices.subtitle')}
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t('about.voices.articles').map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Tag Badge */}
                  <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                    <span className="bg-golden-primary text-white text-xs font-primary px-3 py-1 rounded-full">
                      {article.tag}
                    </span>
                  </div>
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className={`p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-gray-500 text-xs font-primary mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl text-green-primary font-primary mb-3 leading-tight group-hover:text-golden-primary transition-colors duration-300">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 font-primary text-sm leading-relaxed mb-4">
                    {article.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Voices;