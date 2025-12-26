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

        contact: {
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
        const initialLang = savedLang || (browserLang === "ar" ? "ar" : "en");
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
