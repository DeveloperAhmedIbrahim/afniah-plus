// contexts/LocalizationContext.js
import { m } from 'framer-motion';
import { list } from 'postcss';
import React, { createContext, useContext, useState, useEffect } from 'react';

// Translation data
const translations = {
    en: {
        // Navigation
        nav: {
            home: "Home",
            about: "About",
            projects: "Projects",
            services: "Services",
            contact: "Contact Us",
            privacyPolocy: "Privacy Policy",
            termsAndConditions: "Terms & Conditions",
        },
        // Services 
        service: {
            photography: 'Photography',
            documentation: 'Documentation',
            graphic: 'Graphic Designing',
            illustration: 'Illustration',
            calligraphy: 'Calligraphy',
            content: 'Content',
            publishing: 'Publishing',
            "printing-press": 'Printing | Press',
            rendering: 'Rendering',
        },
        // Hero Section
        hero: {
            title: "From The Depth Of Civilization, We Envision The Future.",
            subtitle: "From heritage, we craft the stories of the future.",
            button: "Explore Now",
            scrollDown: "Scroll Down"
        },
        // Why Affinah Section
        whyAffinah: {
            heading: "Why Afniah+?",
            description: "We don’t offer traditional services, but rather offer strategic partnerships based on a deep understanding of the local context and strict application of international standards. Afania+ stands out for the following reasons:",
            points: [
                {
                    icon: '⭐',
                    title: "Integrating Research and Creative Approaches:",
                    description: "Our team combines specialized research expertise in culture, language, and identity with creative design and production skills to deliver solutions rooted in knowledge and visually unique."
                },
                {
                    icon: '📋',
                    title: "High Flexibility and Immediate Responsiveness:",
                    description: "We work seamlessly with various types of projects (cultural, educational, governmental, commercial), designing a customized implementation path for each client based on their precise needs."
                },
                {
                    icon: '🏠',
                    title: "A comprehensive business model:",
                    description: "We offer all content services from concept to final product under one roof, reducing time wastage and improving communication efficiency."
                },
                {
                    icon: '✅',
                    title: "Identity-driven innovation:",
                    description: "We reproduce ideas and content in a modern and effective way that maintains authenticity and keeps pace with the demands of the digital age."
                },
            ],
            button: "Meet Our Philosophy"
        },

        project: {
            title01: 'Explore & Go Through',
            title02: 'The Afniah+ Projects',
            button: 'View All Projects',
            list: [
                {
                    title: "ALJANADRIYAH",
                    location: "ASIR",
                    image: '/assets/projects/1.png'
                },
                {
                    title: "ALJANADRIYAH",
                    location: "EASTERN REGION",
                    image: '/assets/projects/2.png'
                },
                {
                    title: "ALJANADRIYAH",
                    location: "NAJD",
                    image: '/assets/projects/3.png'
                },
                {
                    title: "ALJANADRIYAH",
                    location: "NAJRAN REGION",
                    image: '/assets/projects/4.png'
                },
                {
                    title: "ALJANADRIYAH",
                    location: "AL BAHA REGION",
                    image: '/assets/projects/5.png'
                },
                {
                    title: "ALJANADRIYAH",
                    location: "MAKKAH",
                    image: '/assets/projects/6.png'
                },
                {
                    title: "ALJANADRIYAH",
                    location: "TABUK REGION",
                    image: '/assets/projects/7.png'
                },
                {
                    title: "ALJANADRIYAH",
                    location: "AL MADINAH AL MUNAWARA",
                    image: '/assets/projects/8.png'
                },
            ]
        },

        location: {
            title01: "Where We're Based",
            title02: '& Why It Matters',
            title03: 'What Our Location Offers',
            points: [
                "Strategically positioned to reduce travel time and immerse guests in Egypt's most iconic destinations from the start.",
                "Collaborations with guides, artisans, and hosts ensure authenticity and support sustainable tourism.",
                "Our regional presence allows us to coordinate transfers, accommodations, and tours with unmatched efficiency."
            ],
            text: "Click on any pin to zoom to that location. Explore our multiple locations on the map."
        },
        
        footer: {
            tag: "From heritage, we craft the stories of the future.",
            address: "Al Qasim Al Khawarizmi Street, Rakah District, Dammam 34225, KSA"
        },
        // Common
        common: {
            loading: "Loading...",
            welcome: "Welcome",
            pages: "Pages",
            location: "Location",
            followUs: "Follow Us"
        }
    },
    ar: {
        // Navigation
        nav: {
            home: "الرئيسية",
            about: "حولنا",
            projects: "المشاريع",
            services: "خدمات",
            contact: "اتصل بنا",
            privacyPolocy: "سياسة الخصوصية",
            termsAndConditions: "الشروط والأحكام",
        },
        service: {
            photography: 'التصوير',
            documentation: 'التوثيق',
            graphic: 'الرسومات',
            illustration: 'الرسوم التوضيحية',
            calligraphy: 'الخط',
            content: 'المحتوى',
            publishing: 'النشر',
            "printing-press": 'الطباعة | المطبعة',
            rendering: 'التصيير',
        },
        // Hero Section
        hero: {
            title: "من عمق الحضارة.. نستشرف المستقب",
            subtitle: "من التراث.. نصنع قصص المستقبل",
            button: "اكتشف الآن",
            scrollDown: "انتقل لأسفل"
        },
        // Why Affinah Section
        whyAffinah: {
            heading: "لماذا أفنيه+؟",
            description: "نحن لا نقدم خدمات تقليدية، بل نبني شراكات استراتيجية قائمة على فهمٍ عميقٍ للسياق المحلي وتطبيقٍ صارمٍ للمعايير الدولية. تتميز أفنيه+ بالأسباب التالية:",
            points: [
                {
                    icon: '⭐',
                    title: "دمج البحث والأساليب الإبداعية:",
                    description: "يجمع فريقنا بين الخبرة البحثية المتخصصة في الثقافة واللغة والهوية، وبين مهارات التصميم والإنتاج الإبداعي لتقديم حلولٍ قائمةٍ على المعرفة ومتفردة بصرياً."
                },
                {
                    icon: '📋',
                    title: "مرونة عالية واستجابة فورية:",
                    description: "نعمل بسلاسة مع مختلف أنواع المشاريع (الثقافية، التعليمية، الحكومية، التجارية)، ونصمم مسار تنفيذٍ مخصص لكل عميل بناءً على احتياجاته الدقيقة."
                },
                {
                    icon: '🏠',
                    title: "نموذج عمل شامل:",
                    description: "نقدم جميع خدمات المحتوى من الفكرة إلى المنتج النهائي تحت سقفٍ واحد، مما يقلل من إهدار الوقت ويعزز كفاءة التواصل."
                },
                {
                    icon: '✅',
                    title: "ابتكار مستمد من الهوية:",
                    description: "نعيد إنتاج الأفكار والمحتوى بطريقةٍ عصرية وفعّالة تحافظ على الأصالة وتواكب متطلبات العصر الرقمي."
                },
            ],
            button: "تعرّف على فلسفتنا"
        },

        project: {
            title01: 'استكشف وتعرّف على',
            title02: 'مشروعات أفنيه+',
            button: 'عرض جميع المشروعات',

            list: [
                {
                    title: "الجنادرية",
                    location: "منطقة عسير",
                    image: '/assets/projects/1.png'
                },
                {
                    title: "الجنادرية",
                    location: "المنطقة الشرقية",
                    image: '/assets/projects/2.png'
                },
                {
                    title: "الجنادرية",
                    location: "منطقة نجد",
                    image: '/assets/projects/3.png'
                },
                {
                    title: "الجنادرية",
                    location: "منطقة نجران",
                    image: '/assets/projects/4.png'
                },
                {
                    title: "الجنادرية",
                    location: "منطقة الباحة",
                    image: '/assets/projects/5.png'
                },
                {
                    title: "الجنادرية",
                    location: "منطقة مكة المكرمة",
                    image: '/assets/projects/6.png'
                },
                {
                    title: "منطقة تبوك",
                    location: "منطقة",
                    image: '/assets/projects/7.png'
                },
                {
                    title: "الجنادرية",
                    location: "منطقة المدينة المنورة",
                    image: '/assets/projects/8.png'
                },
            ]
        },

        location: {
            title01: "موقعنا الجغرافي",
            title02: "ولماذا يُعدّ مهمًا",
            title03: "ما الذي يقدمه موقعنا",
            points: [
                "موقعنا الاستراتيجي يساهم في تقليل وقت السفر ويمنح الضيوف فرصة الانغماس في أبرز المعالم السياحية في مصر منذ البداية.",
                "تعاوننا مع المرشدين والحرفيين وأصحاب الضيافة المحليين يضمن الأصالة ويدعم السياحة المستدامة.",
                "وجودنا الإقليمي يتيح لنا تنسيق عمليات النقل والإقامة والجولات بكفاءة لا مثيل لها."
            ],
            text: "انقر على أي علامة لتكبير الموقع. استكشف مواقعنا المتعددة على الخريطة."
        },

        footer: {
            tag: "من التراث.. نصنع قصص المستقبل",
            address: "شارع القاسم الخوارزمي، حي الركاح، الدمام 34225، المملكة العربية السعودية"
        },
        // Common
        common: {
            loading: "جاري التحميل...",
            welcome: "مرحباً",
            pages: "الصفحات",
            location: "الموقع",
            followUs: "تابعنا"
        }
    }
};

// Create context
const LocalizationContext = createContext();

// Provider component
export const LocalizationProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [isRTL, setIsRTL] = useState(false);

    // Change language function
    const changeLanguage = (lang) => {
        setLanguage(lang);
        setIsRTL(lang === 'ar');
        localStorage.setItem('selectedLanguage', lang);

        // Update document direction and lang attribute
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    };

    // Get translation function
    const t = (key) => {
        const keys = key.split('.');
        let translation = translations[language];

        for (const k of keys) {
            translation = translation?.[k];
        }

        return translation || key;
    };

    // Initialize language from localStorage or browser
    useEffect(() => {
        const savedLang = localStorage.getItem('selectedLanguage');
        const browserLang = navigator.language.split('-')[0];
        const initialLang = savedLang || (browserLang === 'ar' ? 'ar' : 'en');

        changeLanguage(initialLang);
    }, []);

    const value = {
        language,
        isRTL,
        changeLanguage,
        t,
        translations: translations[language]
    };

    return (
        <LocalizationContext.Provider value={value}>
            <div className={isRTL ? 'rtl' : 'ltr'}>
                {children}
            </div>
        </LocalizationContext.Provider>
    );
};

// Custom hook to use localization
export const useLocalization = () => {
    const context = useContext(LocalizationContext);
    if (!context) {
        throw new Error('useLocalization must be used within LocalizationProvider');
    }
    return context;
};