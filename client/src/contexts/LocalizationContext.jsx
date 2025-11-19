// contexts/LocalizationContext.js
import {
    BookOpen,
    Camera,
    Clock,
    Facebook,
    FileText,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Palette,
    PenTool,
    Phone,
    Shield,
    Twitter,
} from "lucide-react";
import { list } from "postcss";
import React, { createContext, useContext, useState, useEffect } from "react";

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
            photography: "Photography",
            documentation: "Documentation",
            graphic: "Graphic Designing",
            calligraphy: "Calligraphy",
            publishing: "Printing & Publishing",
        },
        // Hero Section
        hero: {
            title: "From The Depth Of Civilization, We Envision The Future.",
            subtitle: "From heritage, we craft the stories of the future.",
            button: "Explore Now",
            scrollDown: "Scroll Down",
        },
        // Why Affinah Section
        whyAffinah: {
            heading: "Why Afniah+?",
            description:
                "We don’t offer traditional services, but rather offer strategic partnerships based on a deep understanding of the local context and strict application of international standards. Afania+ stands out for the following reasons.",
            points: [
                {
                    icon: "/assets/icons/5.svg",
                    title: "Integrating Research and Creative Approaches:",
                    description:
                        "Our team combines specialized research expertise in culture, language, and identity with creative design and production skills to deliver solutions rooted in knowledge and visually unique.",
                },
                {
                    icon: "/assets/icons/6.svg",
                    title: "High Flexibility and Immediate Responsiveness:",
                    description:
                        "We work seamlessly with various types of projects (cultural, educational, governmental, commercial), designing a customized implementation path for each client based on their precise needs.",
                },
                {
                    icon: "/assets/icons/7.svg",
                    title: "A comprehensive business model:",
                    description:
                        "We offer all content services from concept to final product under one roof, reducing time wastage and improving communication efficiency.",
                },
                {
                    icon: "/assets/icons/8.svg",
                    title: "Identity-driven innovation:",
                    description:
                        "We reproduce ideas and content in a modern and effective way that maintains authenticity and keeps pace with the demands of the digital age.",
                },
            ],
            button: "Meet Our Philosophy",
        },

        project: {
            title01: "Explore & Go Through",
            title02: "The Afniah+ Projects",
            button: "View All Projects",
            list: [
                {
                    title: "ALJANADRIYAH",
                    location: "ASIR",
                    image: "/assets/projects/1.png",
                },
                {
                    title: "ALJANADRIYAH",
                    location: "EASTERN REGION",
                    image: "/assets/projects/2.png",
                },
                {
                    title: "ALJANADRIYAH",
                    location: "NAJD",
                    image: "/assets/projects/3.png",
                },
                {
                    title: "ALJANADRIYAH",
                    location: "NAJRAN REGION",
                    image: "/assets/projects/4.png",
                },
                {
                    title: "ALJANADRIYAH",
                    location: "AL BAHA REGION",
                    image: "/assets/projects/5.png",
                },
                {
                    title: "ALJANADRIYAH",
                    location: "MAKKAH",
                    image: "/assets/projects/6.png",
                },
                {
                    title: "ALJANADRIYAH",
                    location: "TABUK REGION",
                    image: "/assets/projects/7.png",
                },
                {
                    title: "ALJANADRIYAH",
                    location: "AL MADINAH AL MUNAWARA",
                    image: "/assets/projects/8.png",
                },
            ],
        },

        location: {
            title01: "Where We're Based",
            title02: "& Why It Matters",
            title03: "What Our Location Offers",
            points: [
                "Strategically positioned to reduce travel time and immerse guests in Egypt's most iconic destinations from the start.",
                "Collaborations with guides, artisans, and hosts ensure authenticity and support sustainable tourism.",
                "Our regional presence allows us to coordinate transfers, accommodations, and tours with unmatched efficiency.",
            ],
            text: "Click on any pin to zoom to that location. Explore our multiple locations on the map.",
        },

        // About Page
        about: {
            hero: {
                title: "About Us",
                subtitle: "Rooted in heritage, guided by passion.",
            },
            whoWeAre: {
                title: "Who We Are?",
                paragraphs: [
                    `Afniah+ is a Saudi company specializing in content development, documentation, and creative design. It combines research thinking and visual innovation to produce works with a profound intellectual dimension and high cultural value. We don›t just provide implementation services; we also act as a strategic partner, helping shape corporate messages and enhance the presence of our clients› visual and linguistic identities in a rapidly competitive landscape.`,
                    `We offer integrated solutions that include writing and editing, graphic design, visual and audio production, art di- rection, and printing, using flexible work methods based on international best practices in the fields of corporate publishing and cultural and media documentation.`,
                    `Our work targets cultural and official entities, educational institutions, national initiatives, and private sector projects that require rich and accurate content that takes into account the local context and meets international standards.`,
                ],
                button: "Meet The Team",
            },
            vision: {
                title: "Our Vision",
                paragraphs: [
                    `To become the premier national reference in the development of specialized creative and documentary content, by offering cognitive and visual solutions that elevate the standards of cultural and institutional communication in the Kingdom.`,
                    `We aspire to craft content that contributes to preserving national memory and enhancing the value of local identity using methods consistent with global best practices in design, publishing, and documentation, without losing touch with its cultural roots.`,
                ],
            },
            team: {
                title: "Meet the Visionaries Behind Afniah",
                subtitle:
                    "A passionate team of cultural experts, researchers, and creatives dedicated to preserving Saudi heritage through innovative storytelling and world-class documentation.",
                members: [
                    {
                        name: `Abdullah Al-Naim`,
                        designation: `General Manager`,
                        image: `/assets/team/1.jpg`,
                    },
                    {
                        name: `Abdullah Boshlibi`,
                        designation: `Cheif Executive Officer`,
                        image: `/assets/team/2.jpg`,
                    },
                    {
                        name: `Mohammad barada`,
                        designation: `Technical Manager`,
                        image: `/assets/team/3.jpg`,
                    },
                ],
            },
            voices: {
                tag: `Insights from the ground`,
                title: `Voices & views from Afniah+`,
                subtitle: `Stories, tips, and insights from the land we know best.`,
                articles: [
                    {
                        tag: `Taste`,
                        title: `What to Eat While You Travel`,
                        description: `From street snacks to traditional dishes, these are the flavors you can’t miss.`,
                        date: `May 8, 2025`,
                        image: `/assets/hero/1.png`,
                    },
                    {
                        tag: `History`,
                        title: `Stories Behind the Monuments`,
                        description: `Explore the ancient beliefs and gods that shaped the temples and tombs of Egypt.`,
                        date: `May 8, 2025`,
                        image: `/assets/hero/2.png`,
                    },
                    {
                        tag: `Culture`,
                        title: `Discovering Siwa Beyond the Desert`,
                        description: `A scenic view of the Siwa Oasis with palm trees, salt lakes, and desert dunes.`,
                        date: `May 8, 2025`,
                        image: `/assets/hero/3.png`,
                    },
                ],
            },
        },

        contact: {
            hero: {
                title: `Contact Us`,
                subtitle: `We're here to answer your questions and start your journey to Egypt.`,
            },
            info: [
                {
                    icon: MapPin,
                    title: `Office Address`,
                    detail: `Al Qasim Al Khawarizmi Street, Rakah District, Dammam 34225, KSA`,
                },
                {
                    icon: Mail,
                    title: `Email Address`,
                    detail: `info@afnps.com`,
                    isEmail: true,
                },
                {
                    icon: Phone,
                    title: `Contact Number`,
                    detail: `013 889 3060`,
                    isPhone: true,
                },
            ],
            form: {
                title: "Let's Plan Your Journey Together",
                desc: "We're here to turn your vision into reality — let's start the conversation.",
                name: "Name",
                email: "Email",
                phone: "Phone",
                subject: "Subject",
                message: "Message",
                send: "Send Message",
            },
        },

        services: {
            hero: {
                title: "Our Services",
                subtitle: "Here You Can Explore All The Services We Offer.",
            },
            whatWeOffer: {
                title: "What We Offer",
                description:
                    "Specialized services that bridge tradition and modernity.",
            },
            list: [
                {
                    id: "photography",
                    title: "Photography",
                    icon: Camera,
                    description:
                        "Professional photography services capturing the essence of Saudi heritage and culture through stunning visual storytelling.",
                    image: "/assets/hero/1.png",
                    color: "from-amber-500 to-orange-600",
                },
                {
                    id: "documentation",
                    title: "Documentation",
                    icon: FileText,
                    description:
                        "Comprehensive documentation services preserving cultural and institutional knowledge with accuracy and authenticity.",
                    image: "/assets/hero/2.png",
                    color: "from-green-500 to-emerald-600",
                    details: {
                        hero: {
                            title: "Documentation Services",
                            subtitle:
                                "Preserving knowledge and heritage through meticulous documentation and archival excellence",
                        },
                        overview: {
                            title: "Comprehensive Documentation Solutions",
                            description: [
                                "Our documentation services bridge the past and future, transforming cultural knowledge, institutional records, and research findings into accessible, well-organized archives. We combine traditional archival methods with modern digital solutions.",
                                "From ancient manuscripts to contemporary institutional records, we ensure every document is preserved with accuracy, cultural sensitivity, and compliance with international archival standards.",
                            ],
                            services: [
                                "Cultural Heritage Documentation",
                                "Research & Academic Documentation",
                                "Institutional Archive Management",
                                "Historical Records Digitization",
                                "Bilingual Documentation Services",
                                "Compliance & Standards Documentation",
                            ],
                        },
                        approach: {
                            title: "Our Documentation Approach",
                            description: "International best practices meet local expertise",
                            list: [
                                {
                                    icon: Shield,
                                    title: "Quality Assurance",
                                    description:
                                        "Every document undergoes rigorous quality checks ensuring accuracy, completeness, and compliance with archival standards.",
                                },
                                {
                                    icon: Clock,
                                    title: "Timely Delivery",
                                    description:
                                        "Efficient workflows and project management ensure documentation projects are completed on schedule without compromising quality.",
                                },
                                {
                                    icon: BookOpen,
                                    title: "Accessibility",
                                    description:
                                        "We create documentation systems that are easily navigable, searchable, and accessible for future generations.",
                                },
                            ],
                        },
                        process: {
                            title: "Documentation Workflow",
                            description: "International best practices meet local expertise",
                            steps: [
                                {
                                    step: "01",
                                    title: "Assessment & Planning",
                                    description:
                                        "Comprehensive evaluation of documentation needs, scope, and preservation requirements.",
                                },
                                {
                                    step: "02",
                                    title: "Data Collection",
                                    description:
                                        "Systematic gathering and organization of source materials with attention to detail and cultural context.",
                                },
                                {
                                    step: "03",
                                    title: "Processing & Digitization",
                                    description:
                                        "Professional documentation, editing, and digital archiving using industry-standard tools and protocols.",
                                },
                                {
                                    step: "04",
                                    title: "Delivery & Maintenance",
                                    description:
                                        "Final documentation delivery with ongoing support and archive maintenance solutions.",
                                },
                            ],
                        },
                    },
                },
                {
                    id: "graphic-designing",
                    title: "Graphic Designing",
                    icon: Palette,
                    description:
                        "Creative visual design solutions that blend modern aesthetics with traditional cultural elements.",
                    image: "/assets/hero/3.png",
                    color: "from-purple-500 to-pink-600",
                },
                {
                    id: "calligraphy",
                    title: "Calligraphy",
                    icon: PenTool,
                    description:
                        "Traditional Arabic calligraphy services celebrating the beauty of written Arabic art and heritage.",
                    image: "/assets/projects/1.png",
                    color: "from-blue-500 to-cyan-600",
                },
                {
                    id: "publishing",
                    title: "Printing & Publishing",
                    icon: BookOpen,
                    description:
                        "End-to-end publishing solutions from concept to print, delivering high-quality printed materials.",
                    image: "/assets/projects/2.png",
                    color: "from-red-500 to-rose-600",
                },
                {
                    id: "publishing",
                    title: "Printing & Publishing",
                    icon: BookOpen,
                    description:
                        "End-to-end publishing solutions from concept to print, delivering high-quality printed materials.",
                    image: "/assets/projects/2.png",
                    color: "from-teal-500 to-teal-600",
                },
            ],
            cta: {
                title: "Ready to Start Your Project?",
                description: [
                    "Let's Collaborate To Bring",
                    "Your Vision",
                    "With Our",
                    "Specialized Services",
                ],
                action: "Contact Us Today",
            },
        },

        projects: {
            hero: {
                title: "Our Projects",
                subtitle: "Here You Can Explore All Our Projects We Have Done.",
            },
            whatWeOffer: {
                title: "What We Offer",
                description:
                    "Specialized services that bridge tradition and modernity.",
            },
            list: [
                {
                    id: "photography",
                    title: "Photography",
                    icon: Camera,
                    description:
                        "Professional photography services capturing the essence of Saudi heritage and culture through stunning visual storytelling.",
                    image: "/assets/hero/1.png",
                    color: "from-amber-500 to-orange-600",
                },
                {
                    id: "documentation",
                    title: "Documentation",
                    icon: FileText,
                    description:
                        "Comprehensive documentation services preserving cultural and institutional knowledge with accuracy and authenticity.",
                    image: "/assets/hero/2.png",
                    color: "from-green-500 to-emerald-600",
                    details: {
                        hero: {
                            title: "Documentation Services",
                            subtitle:
                                "Preserving knowledge and heritage through meticulous documentation and archival excellence",
                        },
                        overview: {
                            title: "Comprehensive Documentation Solutions",
                            description: [
                                "Our documentation services bridge the past and future, transforming cultural knowledge, institutional records, and research findings into accessible, well-organized archives. We combine traditional archival methods with modern digital solutions.",
                                "From ancient manuscripts to contemporary institutional records, we ensure every document is preserved with accuracy, cultural sensitivity, and compliance with international archival standards.",
                            ],
                            services: [
                                "Cultural Heritage Documentation",
                                "Research & Academic Documentation",
                                "Institutional Archive Management",
                                "Historical Records Digitization",
                                "Bilingual Documentation Services",
                                "Compliance & Standards Documentation",
                            ],
                        },
                        approach: {
                            title: "Our Documentation Approach",
                            description: "International best practices meet local expertise",
                            list: [
                                {
                                    icon: Shield,
                                    title: "Quality Assurance",
                                    description:
                                        "Every document undergoes rigorous quality checks ensuring accuracy, completeness, and compliance with archival standards.",
                                },
                                {
                                    icon: Clock,
                                    title: "Timely Delivery",
                                    description:
                                        "Efficient workflows and project management ensure documentation projects are completed on schedule without compromising quality.",
                                },
                                {
                                    icon: BookOpen,
                                    title: "Accessibility",
                                    description:
                                        "We create documentation systems that are easily navigable, searchable, and accessible for future generations.",
                                },
                            ],
                        },
                        process: {
                            title: "Documentation Workflow",
                            description: "International best practices meet local expertise",
                            steps: [
                                {
                                    step: "01",
                                    title: "Assessment & Planning",
                                    description:
                                        "Comprehensive evaluation of documentation needs, scope, and preservation requirements.",
                                },
                                {
                                    step: "02",
                                    title: "Data Collection",
                                    description:
                                        "Systematic gathering and organization of source materials with attention to detail and cultural context.",
                                },
                                {
                                    step: "03",
                                    title: "Processing & Digitization",
                                    description:
                                        "Professional documentation, editing, and digital archiving using industry-standard tools and protocols.",
                                },
                                {
                                    step: "04",
                                    title: "Delivery & Maintenance",
                                    description:
                                        "Final documentation delivery with ongoing support and archive maintenance solutions.",
                                },
                            ],
                        },
                    },
                },
                {
                    id: "graphic-designing",
                    title: "Graphic Designing",
                    icon: Palette,
                    description:
                        "Creative visual design solutions that blend modern aesthetics with traditional cultural elements.",
                    image: "/assets/hero/3.png",
                    color: "from-purple-500 to-pink-600",
                },
                {
                    id: "calligraphy",
                    title: "Calligraphy",
                    icon: PenTool,
                    description:
                        "Traditional Arabic calligraphy services celebrating the beauty of written Arabic art and heritage.",
                    image: "/assets/projects/1.png",
                    color: "from-blue-500 to-cyan-600",
                },
                {
                    id: "publishing",
                    title: "Printing & Publishing",
                    icon: BookOpen,
                    description:
                        "End-to-end publishing solutions from concept to print, delivering high-quality printed materials.",
                    image: "/assets/projects/2.png",
                    color: "from-red-500 to-rose-600",
                },
                {
                    id: "publishing",
                    title: "Printing & Publishing",
                    icon: BookOpen,
                    description:
                        "End-to-end publishing solutions from concept to print, delivering high-quality printed materials.",
                    image: "/assets/projects/2.png",
                    color: "from-teal-500 to-teal-600",
                },
            ],
            cta: {
                title: "Ready to Start Your Project?",
                description: [
                    "Let's Collaborate To Bring",
                    "Your Vision",
                    "With Our",
                    "Specialized Services",
                ],
                action: "Contact Us Today",
            },
        },        

        footer: {
            tag: "From heritage, we craft the stories of the future.",
            address:
                "Al Qasim Al Khawarizmi Street, Rakah District, Dammam 34225, KSA",
            copyRight: "Afniah Publishing & Distribution Company",
        },

        social: [
            {
                name: "Facebook",
                icon: Facebook,
                link: `https://www.facebook.com/profile.php?id=61577329362259`,
            },
            {
                name: "Twitter",
                icon: Twitter,
                link: `https://x.com/AFNIAH_PLUS`,
            },
            {
                name: "Instagram",
                icon: Instagram,
                link: `https://www.instagram.com/afniah_plus`,
            },
            {
                name: "Linkedin",
                icon: Linkedin,
                link: `https://www.linkedin.com/company/afniahplus`,
            },
            {
                name: "Location",
                icon: MapPin,
                link: `https://maps.app.goo.gl/iQkxfEHsofw4XRoc8`,
            },
        ],
        // Common
        common: {
            loading: "Loading...",
            welcome: "Welcome",
            pages: "Pages",
            location: "Location",
            followUs: "Follow Us",
            contactNo: "013 889 3060",
        },
    },
    ar: {
        // Navigation
        nav: {
            home: "الرئيسية",
            about: "حولنا",
            projects: "المشاريع",
            services: "‫الخدمات‬",
            contact: "اتصل بنا",
            privacyPolocy: "سياسة الخصوصية",
            termsAndConditions: "الشروط والأحكام",
        },
        service: {
            photography: "التصوير",
            documentation: "التوثيق",
            graphic: "الرسومات",
            illustration: "الرسوم التوضيحية",
            calligraphy: "الخط",
            content: "المحتوى",
            publishing: "النشر",
            "printing-press": "الطباعة | المطبعة",
            rendering: "التصيير",
        },
        // Hero Section
        hero: {
            title: "من عمق الحضارة.. نستشرف ‫المستقبل‬",
            subtitle: "من التراث.. نصنع قصص المستقبل",
            button: "اكتشف الآن",
            scrollDown: "‫انتقل‬ ‫إلى‬ ‫الأسفل‬",
        },
        // Why Affinah Section
        whyAffinah: {
            heading: "لماذا أفنية+؟",
            description:
                "نحن لا نقدم خدمات تقليدية، بل نبني شراكات استراتيجية قائمة على فهمٍ عميقٍ للسياق المحلي وتطبيقٍ صارمٍ للمعايير الدولية. تتميز أفنية+ بالأسباب التالية:",
            points: [
                {
                    icon: "/assets/icons/5.svg",
                    title: "‫تكامل ‬‫المنهج‬ ‫البحثي‬ ‫والإبداعي‬",
                    description:
                        "‬‬يجمع فريقنا بين الخبرات البحثية المتخصصة في الثقافة واللغة والهوية، و المهارات الإبداعية في التصميم و الإنتاج، لنقدم حلولا متجذرة معرفيا ومتفردة بصريا.‬‬",
                },
                {
                    icon: "/assets/icons/6.svg",
                    title: "مرونة عالية واستجابة فورية",
                    description:
                        "نعمل بسلاسة مع مختلف أنواع المشاريع (الثقافية، التعليمية، الحكومية، التجارية)، ونصمم مسار تنفيذٍ مخصص لكل عميل بناءً على احتياجاته الدقيقة.",
                },
                {
                    icon: "/assets/icons/7.svg",
                    title: "نموذج عمل شامل",
                    description:
                        "نقدم جميع خدمات المحتوى من الفكرة إلى المنتج النهائي تحت سقفٍ واحد، مما يقلل من إهدار الوقت ويعزز كفاءة التواصل.",
                },
                {
                    icon: "/assets/icons/8.svg",
                    title: "ابتكار مستمد من الهوية",
                    description:
                        "نعيد إنتاج الأفكار والمحتوى بطريقةٍ عصرية وفعّالة تحافظ على الأصالة وتواكب متطلبات العصر الرقمي.",
                },
            ],
            button: "تعرّف على فلسفتنا",
        },

        project: {
            title01: "استكشف وتعرّف على",
            title02: "مشروعات أفنية+",
            button: "عرض جميع المشروعات",

            list: [
                {
                    title: "الجنادرية",
                    location: "منطقة عسير",
                    image: "/assets/projects/1.png",
                },
                {
                    title: "الجنادرية",
                    location: "المنطقة الشرقية",
                    image: "/assets/projects/2.png",
                },
                {
                    title: "الجنادرية",
                    location: "منطقة نجد",
                    image: "/assets/projects/3.png",
                },
                {
                    title: "الجنادرية",
                    location: "منطقة نجران",
                    image: "/assets/projects/4.png",
                },
                {
                    title: "الجنادرية",
                    location: "منطقة الباحة",
                    image: "/assets/projects/5.png",
                },
                {
                    title: "الجنادرية",
                    location: "منطقة مكة المكرمة",
                    image: "/assets/projects/6.png",
                },
                {
                    title: "الجنادرية",
                    location: "‫منطقة ‬‫تبوك‬",
                    image: "/assets/projects/7.png",
                },
                {
                    title: "الجنادرية",
                    location: "منطقة المدينة المنورة",
                    image: "/assets/projects/8.png",
                },
            ],
        },

        location: {
            title01: "موقعنا الجغرافي",
            title02: "ولماذا يُعدّ مهمًا",
            title03: "ما الذي يقدمه موقعنا",
            points: [
                "موقعنا الاستراتيجي يساهم في تقليل وقت السفر ويمنح الضيوف فرصة الانغماس في أبرز المعالم السياحية في مصر منذ البداية.",
                "تعاوننا مع المرشدين والحرفيين وأصحاب الضيافة المحليين يضمن الأصالة ويدعم السياحة المستدامة.",
                "وجودنا الإقليمي يتيح لنا تنسيق عمليات النقل والإقامة والجولات بكفاءة لا مثيل لها.",
            ],
            text: "انقر على أي علامة لتكبير الموقع. استكشف مواقعنا المتعددة على الخريطة.",
        },

        // About Page
        about: {
            hero: {
                title: "من نحن",
                subtitle: "متجذرون في التراث، ونسير بشغف.",
            },

            whoWeAre: {
                title: "من نحن",
                paragraphs: [
                    `أفنية+ هي شركة سعودية متخصصة في تطوير المحتوى والتوثيق والتصميم الإبداعي. تجمع بين التفكير البحثي والابتكار البصري لإنتاج أعمال ذات بُعد فكري عميق وقيمة ثقافية عالية. نحن لا نقدم خدمات التنفيذ فقط، بل نعمل كشريك استراتيجي يساهم في تشكيل رسائل الشركات وتعزيز حضور الهوية البصرية واللغوية لعملائنا في مشهد تنافسي سريع التطور.`,
                    `نقدم حلولاً متكاملة تشمل الكتابة والتحرير، والتصميم الجرافيكي، والإنتاج المرئي والصوتي، والإخراج الفني والطباعة، من خلال أساليب عمل مرنة تستند إلى أفضل الممارسات الدولية في مجالات النشر المؤسسي والتوثيق الثقافي والإعلامي.`,
                    `يستهدف عملنا الجهات الثقافية والرسمية، والمؤسسات التعليمية، والمبادرات الوطنية، ومشروعات القطاع الخاص التي تتطلب محتوى ثرياً ودقيقاً يراعي السياق المحلي ويلبي المعايير الدولية.`,
                ],
                button: "تعرف على الفريق",
            },

            vision: {
                title: "‫رؤيتنــــا‬",
                paragraphs: [
                    `أن نصبح المرجع الوطني الأول في مجال تطوير المحتوى الإبداعي و التوثيقي المتخصص، من خلال تقديم حلول معرفية وبصرية ترتقي بمعايير التواصل الثقافي و المؤسسي في المملكة.`,
                    `‫نطمح إلى صياغة محتوى يسهم في حفظ الذاكرة الوطنية، ويعزز من قيمة الهوية المحلية بأساليب تنسجم مع أفضل الممارسات العالمية في التصميم، النشر، والتوثيق، دون أن تفقد ارتباطها بجذورها الثقافية.‬`,
                ],
            },

            team: {
                title: "تعرف على رواد أفنية",
                subtitle:
                    "فريق شغوف من الخبراء الثقافيين والباحثين والمبدعين، يعملون على حفظ التراث السعودي من خلال السرد الإبداعي والتوثيق بمعايير عالمية.",

                members: [
                    {
                        name: `عبدالله النعيم`,
                        designation: `المدير العام`,
                        image: `/assets/team/1.jpg`,
                    },
                    {
                        name: `عبدالله بوشليبي`,
                        designation: `الرئيس التنفيذي`,
                        image: `/assets/team/2.jpg`,
                    },
                    {
                        name: `محمد برادة`,
                        designation: `المدير الفني`,
                        image: `/assets/team/3.jpg`,
                    },
                ],
            },

            voices: {
                tag: `رؤى من الأرض`,
                title: `أصوات وآراء من أفنية+`,
                subtitle: `قصص، نصائح، ورؤى من الأرض التي نعرفها جيدًا.`,

                articles: [
                    {
                        tag: `طعام`,
                        title: `ماذا تأكل أثناء السفر`,
                        description: `من الوجبات السريعة في الشوارع إلى الأطباق التقليدية، هذه هي النكهات التي لا يمكنك تفويتها.`,
                        date: `٨ مايو ٢٠٢٥`,
                        image: `/assets/hero/1.png`,
                    },
                    {
                        tag: `تاريخ`,
                        title: `القصص وراء المعالم`,
                        description: `استكشف المعتقدات القديمة والآلهة التي شكلت المعابد والمقابر في مصر.`,
                        date: `٨ مايو ٢٠٢٥`,
                        image: `/assets/hero/2.png`,
                    },
                    {
                        tag: `ثقافة`,
                        title: `اكتشاف سيوة خارج الصحراء`,
                        description: `منظر خلاب لواحة سيوة مع أشجار النخيل، البحيرات المالحة، وكثبان الصحراء.`,
                        date: `٨ مايو ٢٠٢٥`,
                        image: `/assets/hero/3.png`,
                    },
                ],
            },
        },

        contact: {
            hero: {
                title: `تواصل معنا`,
                subtitle: `نحن هنا للإجابة على استفساراتك وبدء رحلتك إلى مصر.`,
            },
            info: [
                {
                    icon: MapPin,
                    title: `عنوان المكتب`,
                    detail: `شارع القاسم الخوارزمي، حي الراكة، الدمام 34225، المملكة العربية السعودية`,
                },
                {
                    icon: Mail,
                    title: `البريد الإلكتروني`,
                    detail: `info@afnps.com`,
                    isEmail: true,
                },
                {
                    icon: Phone,
                    title: `رقم التواصل`,
                    detail: `3060 889 013`,
                    isPhone: true,
                },
            ],
            form: {
                title: "لنخطط رحلتك معاً",
                desc: "نحن هنا لتحويل رؤيتك إلى حقيقة — دعنا نبدأ الحوار.",
                name: "الاسم",
                email: "البريد الإلكتروني",
                phone: "رقم الهاتف",
                subject: "الموضوع",
                message: "الرسالة",
                send: "إرسال الرسالة",
            },
        },

        services: {
            hero: {
                title: "خدماتنا",
                subtitle: "هنا يمكنك استكشاف جميع الخدمات التي نقدمها.",
            },
            whatWeOffer: {
                title: "ما الذي نقدمه",
                description: "خدمات متخصصة تجمع بين الأصالة والحداثة.",
            },
            list: [
                {
                    id: "photography",
                    title: "التصوير الفوتوغرافي",
                    icon: Camera,
                    description:
                        "خدمات تصوير احترافية تلتقط جوهر التراث والثقافة السعودية من خلال سرد بصري مذهل.",
                    image: "/assets/hero/1.png",
                    color: "from-amber-500 to-orange-600",
                },
                {
                    id: "documentation",
                    title: "التوثيق",
                    icon: FileText,
                    description:
                        "خدمات توثيق شاملة لحفظ المعرفة الثقافية والمؤسسية بدقة وموثوقية.",
                    image: "/assets/hero/2.png",
                    color: "from-green-500 to-emerald-600",
                    details: {
                        hero: {
                            title: "خدمات التوثيق",
                            subtitle:
                                "حفظ المعرفة والتراث من خلال توثيق دقيق وتميّز أرشيفي رفيع المستوى",
                        },
                        overview: {
                            title: "حلول توثيق شاملة",
                            description: [
                                "تجسر خدماتنا في التوثيق الماضي بالمستقبل، حيث نحول المعرفة الثقافية والسجلات المؤسسية والبحوث العلمية إلى أرشيفات منظمة وسهلة الوصول. نحن ندمج بين الأساليب الأرشيفية التقليدية والحلول الرقمية الحديثة.",
                                "بدءًا من المخطوطات القديمة وصولًا إلى السجلات المؤسسية المعاصرة، نضمن حفظ كل وثيقة بدقة وحس ثقافي عالٍ، مع الالتزام بالمعايير الدولية للتوثيق والأرشفة.",
                            ],
                            services: [
                                "توثيق التراث الثقافي",
                                "توثيق البحوث والأعمال الأكاديمية",
                                "إدارة الأرشيف المؤسسي",
                                "رقمنة السجلات التاريخية",
                                "خدمات التوثيق ثنائية اللغة",
                                "توثيق الالتزام بالمعايير والمواصفات الدولية",
                            ],
                        },
                        approach: {
                            title: "منهجية التوثيق لدينا",
                            description: "أفضل الممارسات العالمية تلتقي بالخبرة المحلية",
                            list: [
                                {
                                    icon: Shield,
                                    title: "ضمان الجودة",
                                    description:
                                        "يخضع كل مستند لعمليات تدقيق صارمة لضمان الدقة والاكتمال والالتزام بمعايير الأرشفة الدولية.",
                                },
                                {
                                    icon: Clock,
                                    title: "التسليم في الوقت المحدد",
                                    description:
                                        "تضمن آليات العمل الفعّالة وإدارة المشاريع إنجاز أعمال التوثيق ضمن الجدول الزمني دون المساس بالجودة.",
                                },
                                {
                                    icon: BookOpen,
                                    title: "سهولة الوصول",
                                    description:
                                        "نُنشئ أنظمة توثيق يسهل تصفحها والبحث فيها والوصول إليها للأجيال القادمة.",
                                },
                            ],
                        },
                        process: {
                            title: "آلية عمل التوثيق",
                            description: "أفضل الممارسات العالمية تلتقي بالخبرة المحلية",
                            steps: [
                                {
                                    step: "01",
                                    title: "التقييم والتخطيط",
                                    description:
                                        "تقييم شامل لاحتياجات التوثيق ونطاق العمل ومتطلبات الحفظ والأرشفة.",
                                },
                                {
                                    step: "02",
                                    title: "جمع البيانات",
                                    description:
                                        "جمع وتنظيم المواد المصدرية بطريقة منهجية مع مراعاة التفاصيل والسياق الثقافي.",
                                },
                                {
                                    step: "03",
                                    title: "المعالجة والرقمنة",
                                    description:
                                        "توثيق احترافي وتحرير وأرشفة رقمية باستخدام أدوات وبروتوكولات معتمدة دولياً.",
                                },
                                {
                                    step: "04",
                                    title: "التسليم والصيانة",
                                    description:
                                        "تسليم الوثائق النهائية مع تقديم الدعم المستمر وحلول صيانة الأرشيف.",
                                },
                            ],
                        },
                    },
                },
                {
                    id: "graphic-designing",
                    title: "التصميم الجرافيكي",
                    icon: Palette,
                    description:
                        "حلول تصميم إبداعية تمزج بين الجماليات الحديثة والعناصر الثقافية التقليدية.",
                    image: "/assets/hero/3.png",
                    color: "from-purple-500 to-pink-600",
                },
                {
                    id: "calligraphy",
                    title: "الخط العربي",
                    icon: PenTool,
                    description:
                        "خدمات الخط العربي التقليدي التي تحتفي بجمال فنون الكتابة العربية وتراثها العريق.",
                    image: "/assets/projects/1.png",
                    color: "from-blue-500 to-cyan-600",
                },
                {
                    id: "publishing",
                    title: "الطباعة والنشر",
                    icon: BookOpen,
                    description:
                        "حلول نشر متكاملة من الفكرة إلى الطباعة، لتقديم مواد مطبوعة عالية الجودة.",
                    image: "/assets/projects/2.png",
                    color: "from-red-500 to-rose-600",
                },
                {
                    id: "publishing",
                    title: "الطباعة والنشر",
                    icon: BookOpen,
                    description:
                        "حلول نشر متكاملة من الفكرة إلى الطباعة، لتقديم مواد مطبوعة عالية الجودة.",
                    image: "/assets/projects/2.png",
                    color: "from-teal-500 to-teal-600",
                },
            ],
            cta: {
                title: "هل أنت جاهز لبدء مشروعك؟",
                description: [
                    "دعنا نتعاون لتحقيق",
                    "رؤيتك",
                    "من خلال",
                    "خدماتنا المتخصصة",
                ],
                action: "تواصل معنا اليوم",
            },
        },

        footer: {
            tag: "من التراث.. نصنع قصص المستقبل",
            address:
                "شارع القاسم الخوارزمي، حي الراكة، الدمام 34225، المملكة العربية السعودية",
            copyRight: "شركة أفنية للنشر والتوزيع",
        },

        social: [
            {
                name: "Facebook",
                icon: Facebook,
                link: `https://www.facebook.com/profile.php?id=61577329362259`,
            },
            {
                name: "Twitter",
                icon: Twitter,
                link: `https://x.com/AFNIAH_PLUS`,
            },
            {
                name: "Instagram",
                icon: Instagram,
                link: `https://www.instagram.com/afniah_plus`,
            },
            {
                name: "Linkedin",
                icon: Linkedin,
                link: `https://www.linkedin.com/company/afniahplus`,
            },
            {
                name: "Location",
                icon: MapPin,
                link: `https://maps.app.goo.gl/iQkxfEHsofw4XRoc8`,
            },
        ],

        // Common
        common: {
            loading: "جاري التحميل...",
            welcome: "مرحباً",
            pages: "الصفحات",
            location: "الموقع",
            followUs: "تابعنا",
            contactNo: "3060 889 013",
        },
    },
};

// Create context
const LocalizationContext = createContext();

// Provider component
export const LocalizationProvider = ({ children }) => {
    const [language, setLanguage] = useState("en");
    const [isRTL, setIsRTL] = useState(false);

    // Change language function
    const changeLanguage = (lang) => {
        setLanguage(lang);
        setIsRTL(lang === "ar");
        localStorage.setItem("selectedLanguage", lang);

        // Update document direction and lang attribute
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = lang;
    };

    // Get translation function
    const t = (key) => {
        const keys = key.split(".");
        let translation = translations[language];

        for (const k of keys) {
            translation = translation?.[k];
        }

        return translation || key;
    };

    // Initialize language from localStorage or browser
    useEffect(() => {
        const savedLang = localStorage.getItem("selectedLanguage");
        const browserLang = navigator.language.split("-")[0];
        // const initialLang = savedLang || (browserLang === "ar" ? "ar" : "en");
        const initialLang = "en";

        changeLanguage(initialLang);
    }, []);

    const value = {
        language,
        isRTL,
        changeLanguage,
        t,
        translations: translations[language],
    };

    return (
        <LocalizationContext.Provider value={value}>
            <div className={isRTL ? "rtl" : "ltr"}>{children}</div>
        </LocalizationContext.Provider>
    );
};

// Custom hook to use localization
export const useLocalization = () => {
    const context = useContext(LocalizationContext);
    if (!context) {
        throw new Error("useLocalization must be used within LocalizationProvider");
    }
    return context;
};
