import creativity_education from '@/assets/images/curriculum/creativity-education.png';
import digital_education from '@/assets/images/curriculum/digital-education.png';
import general_education from '@/assets/images/curriculum/general-education.png';
import islamic_knowledge from '@/assets/images/curriculum/islamic-knowledge.png';
import language_education from '@/assets/images/curriculum/language-education.png';
import moral_education from '@/assets/images/curriculum/moral-education.png';
import HeroImg from '@/assets/images/hero_img.webp';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import Marquee from 'react-fast-marquee';

const Welcome = () => {
    const { institute, welcomeContent } = usePage().props;

    // Icon mapping for curriculum pillars
    const iconMap = {
        islamic_knowledge,
        general_education,
        language_education,
        digital_education,
        moral_education,
        creativity_education,
    };

    // Function to render individual sections based on type
    const renderSection = (content) => {
        if (!content || content.is_active === false) return null;

        switch (content.section_key) {
            case 'divider':
            case 'divider-invisible':
            case 'divider-line':
            case 'divider-decorative':
            case 'divider-colored':
                // Divider section with customizable spacing
                const spacing = content.data?.spacing || 'medium';
                const dividerType = content.data?.type || 'invisible';
                const backgroundColor = content.data?.backgroundColor || 'transparent';
                const pattern = content.data?.pattern || 'none';

                // Calculate spacing in pixels
                const spacingMap = {
                    small: '20px',
                    medium: '40px',
                    large: '60px',
                    'extra-large': '80px',
                    custom: content.data?.customSpacing || '40px',
                };

                const spacingValue = spacingMap[spacing];

                // Generate pattern CSS based on type
                const getPatternStyle = () => {
                    switch (pattern) {
                        case 'dots':
                            return {
                                backgroundImage: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
                                backgroundSize: '20px 20px',
                            };
                        case 'lines':
                            return {
                                backgroundImage: 'linear-gradient(90deg, #ccc 1px, transparent 1px)',
                                backgroundSize: '20px 100%',
                            };
                        case 'diagonal':
                            return {
                                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ccc 10px, #ccc 11px)',
                            };
                        default:
                            return {};
                    }
                };

                return (
                    <div key={content.id} className="w-full">
                        {dividerType === 'invisible' ? (
                            <div style={{ height: spacingValue }} />
                        ) : dividerType === 'line' ? (
                            <div
                                className="flex w-full items-center justify-center"
                                style={{ paddingTop: spacingValue, paddingBottom: spacingValue }}
                            >
                                <hr
                                    className="w-full border-gray-300"
                                    style={{
                                        borderColor: content.data?.lineColor || '#d1d5db',
                                        borderWidth: content.data?.lineWidth || '1px',
                                    }}
                                />
                            </div>
                        ) : dividerType === 'decorative' ? (
                            <div
                                className="flex w-full items-center justify-center"
                                style={{ paddingTop: spacingValue, paddingBottom: spacingValue }}
                            >
                                <div className="flex items-center">
                                    <hr className="flex-1 border-gray-300" style={{ borderColor: content.data?.lineColor || '#d1d5db' }} />
                                    <span className="px-4 text-gray-500">{content.data?.decorativeText || '●'}</span>
                                    <hr className="flex-1 border-gray-300" style={{ borderColor: content.data?.lineColor || '#d1d5db' }} />
                                </div>
                            </div>
                        ) : dividerType === 'colored' ? (
                            <div
                                className="w-full"
                                style={{
                                    height: spacingValue,
                                    backgroundColor: backgroundColor,
                                    ...getPatternStyle(),
                                }}
                            />
                        ) : (
                            <div style={{ height: spacingValue }} />
                        )}
                        {content.title && (
                            <div className="py-2 text-center">
                                <span className="text-sm text-gray-400">{content.title}</span>
                            </div>
                        )}
                    </div>
                );

            case 'hero':
                return (
                    <div key={content.id} className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-10">
                        <div className="order-2 flex w-full flex-col gap-6 lg:order-1 lg:w-[610px] lg:gap-15">
                            <div className="flex flex-col gap-4 text-center lg:gap-6 lg:text-left">
                                <h1 className="font-poppins text-3xl leading-tight font-semibold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                                    {content.content || 'ইসলামী শিক্ষায় একটি নতুন দিগন্ত'}
                                </h1>
                                <p className="font-poppins max-w-full px-2 text-sm leading-6 text-gray-600 sm:text-base lg:max-w-[593px] lg:px-0 lg:leading-7">
                                    {content.data?.subtitle ||
                                        `${institute?.name_bangla || '...........'} একটি আদর্শ ইসলামি শিক্ষা প্রতিষ্ঠান, যেখানে আধুনিক কারিকুলামের সঙ্গে রয়েছে নৈতিকতা, আধ্যাত্মিকতা ও সময়ের চাহিদা অনুসারে শিক্ষার সুষম সমন্বয়।`}
                                </p>
                            </div>
                        </div>
                        <div className="order-1 h-[250px] w-full overflow-hidden rounded-lg bg-gray-200 sm:h-[300px] md:h-[350px] lg:order-2 lg:h-[450px] lg:w-[588px]">
                            <img
                                src={content.data?.image || HeroImg}
                                alt="Madrasha Building"
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                                    e.target.src = '';
                                }}
                            />
                        </div>
                    </div>
                );

            case 'notice':
                return (
                    <div key={content.id} className="w-full">
                        <div
                            className="w-full overflow-hidden p-3 text-white sm:p-4"
                            style={{ backgroundColor: content.data?.backgroundColor || '#2563eb' }}
                        >
                            <Marquee speed={60} className="text-xs sm:text-sm md:text-base">
                                {(
                                    content.content ||
                                    'আগামী ১০ জুলাই হিফয বিভাগের ভর্তি পরীক্ষা অনুষ্ঠিত হবে | ঈদুল আজহার ছুটি ১৪–২২ জুন পর্যন্ত | নতুন শিক্ষাবর্ষ শুরু হবে ১ আগস্ট'
                                )
                                    .split('|')
                                    .map((text, index) => (
                                        <span key={index} className="mr-4 sm:mr-8">
                                            {text.trim()}
                                            {index < content.content.split('|').length - 1 && <span className="ml-4 sm:ml-8">|</span>}
                                        </span>
                                    ))}
                            </Marquee>
                        </div>
                        <hr className="invisible my-6" />
                    </div>
                );

            case 'stats':
                const stats = content.data?.stats || [
                    { label: 'আস্থাভাজন শিক্ষা প্রতিষ্ঠান', value: '২+' },
                    { label: 'ইসলামি ও সাধারণ বিষয়ে দক্ষ শিক্ষক', value: '১৮+' },
                    { label: 'শিক্ষার্থী নিয়মিত পাঠরত', value: '৫০০+' },
                    { label: 'শ্রেণি পর্যন্ত আধুনিক ও ইসলামি পাঠক্রম', value: '১ম -১০ম' },
                ];
                return (
                    <div
                        key={content.id}
                        className="flex flex-col items-start justify-between gap-4 rounded-lg bg-gray-100 p-4 sm:flex-row sm:gap-6 sm:p-6 lg:gap-8 lg:p-8"
                    >
                        {stats.map((stat, index) => (
                            <div key={index} className="flex min-w-0 flex-1 flex-col gap-2 border-l border-gray-300 pl-3 lg:gap-3.5">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-poppins text-2xl font-semibold text-gray-900 sm:text-3xl lg:text-4xl">{stat.value}</span>
                                </div>
                                <p className="font-satoshi text-sm font-medium text-gray-500 sm:text-base lg:text-lg">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                );

            case 'curriculum':
                const pillars = content.data?.pillars || [
                    { title: 'ইসলামি জ্ঞান', description: 'কুরআন, হাদীস, ফিকহ ও আদর্শ জীবনের পাঠ', icon: 'islamic_knowledge', color: 'pink' },
                    { title: 'সাধারণ শিক্ষাব্যবস্থা', description: 'বাংলা, গণিত, বিজ্ঞান, ইংরেজি', icon: 'general_education', color: 'teal' },
                    {
                        title: 'ভাষা শিক্ষা',
                        description: 'আরবি, বাংলা, ইংরেজি (ভাষার শুদ্ধ চর্চা ও অনুবাদ দক্ষতা)',
                        icon: 'language_education',
                        color: 'amber',
                    },
                    {
                        title: 'ডিজিটাল শিক্ষা',
                        description: 'আইসিটি, টাইপিং, ডিজাইন পরিচিতি (ICT basic integration)',
                        icon: 'digital_education',
                        color: 'purple',
                    },
                    { title: 'নৈতিক ও মানবিক গুণাবলি', description: 'আদব, আচরণ, আত্ম-উন্নয়ন', icon: 'moral_education', color: 'pink' },
                    {
                        title: 'সৃজনশীলতা ও সহ-শিক্ষা',
                        description: 'চিত্রাংকন, আলোচনা, গ্রুপ কার্যক্রম',
                        icon: 'creativity_education',
                        color: 'yellow',
                    },
                ];
                return (
                    <div key={content.id} className="flex flex-col items-center justify-between gap-8 py-12 sm:gap-10 sm:py-16 lg:gap-13 lg:py-25">
                        <h2 className="px-4 text-center text-2xl font-semibold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                            {content.content || 'আমাদের পাঠক্রমের স্তম্ভসমূহ'}
                        </h2>

                        <div className="flex w-full flex-col gap-4 lg:gap-5">
                            {/* First Row */}
                            <div className="flex flex-col gap-4 lg:flex-row lg:gap-5">
                                {pillars.slice(0, 3).map((pillar, index) => (
                                    <div
                                        key={index}
                                        className={`flex h-auto min-h-[200px] w-full flex-col items-center gap-4 rounded-lg bg-${pillar.color}-50 p-4 sm:min-h-[220px] sm:p-6 lg:h-53 lg:w-100 lg:gap-6`}
                                    >
                                        <img src={iconMap[pillar.icon]} alt={pillar.title} className="h-10 w-10 object-contain sm:h-12 sm:w-12" />
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <h3 className="font-poppins text-lg font-medium text-gray-900 sm:text-xl lg:text-2xl">{pillar.title}</h3>
                                            <p className="font-poppins text-sm text-gray-600 sm:text-base">{pillar.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Second Row */}
                            <div className="flex flex-col gap-4 lg:flex-row lg:gap-5">
                                {pillars.slice(3, 6).map((pillar, index) => (
                                    <div
                                        key={index}
                                        className={`flex h-auto min-h-[200px] w-full flex-col items-center gap-4 rounded-lg bg-${pillar.color}-50 p-4 sm:min-h-[220px] sm:p-6 lg:h-53 lg:w-100 lg:gap-6`}
                                    >
                                        <img src={iconMap[pillar.icon]} alt={pillar.title} className="h-10 w-10 object-contain sm:h-12 sm:w-12" />
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <h3 className="font-poppins text-lg font-medium text-gray-900 sm:text-xl lg:text-2xl">{pillar.title}</h3>
                                            <p className="font-poppins text-sm text-gray-600 sm:text-base">{pillar.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'hero-custom':
                // Custom hero section with similar structure to main hero
                return (
                    <div key={content.id} className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-10">
                        <div className="order-2 flex w-full flex-col gap-6 lg:order-1 lg:w-[610px] lg:gap-15">
                            <div className="flex flex-col gap-4 text-center lg:gap-6 lg:text-left">
                                <h1 className="font-poppins text-3xl leading-tight font-semibold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                                    {content.content || content.title || 'Custom Hero Section'}
                                </h1>
                                <p className="font-poppins max-w-full px-2 text-sm leading-6 text-gray-600 sm:text-base lg:max-w-[593px] lg:px-0 lg:leading-7">
                                    {content.data?.subtitle || content.data?.description || 'Custom hero section description'}
                                </p>
                            </div>
                        </div>
                        <div className="order-1 h-[250px] w-full overflow-hidden rounded-lg bg-gray-200 sm:h-[300px] md:h-[350px] lg:order-2 lg:h-[450px] lg:w-[588px]">
                            <img
                                src={content.data?.image || HeroImg}
                                alt={content.title || 'Custom Hero'}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                                    e.target.src = '';
                                }}
                            />
                        </div>
                    </div>
                );

            case 'notice-custom':
                // Custom notice section with marquee
                return (
                    <div key={content.id} className="w-full">
                        <div
                            className="w-full overflow-hidden p-3 text-white sm:p-4"
                            style={{ backgroundColor: content.data?.backgroundColor || '#2563eb' }}
                        >
                            <Marquee speed={content.data?.speed || 60} className="text-xs sm:text-sm md:text-base">
                                {(content.content || 'Custom notice content').split('|').map((text, index) => (
                                    <span key={index} className="mr-4 sm:mr-8">
                                        {text.trim()}
                                        {index < content.content.split('|').length - 1 && <span className="ml-4 sm:ml-8">|</span>}
                                    </span>
                                ))}
                            </Marquee>
                        </div>
                        <hr className="invisible my-6" />
                    </div>
                );

            case 'stats-custom':
                // Custom stats section
                const customStats = content.data?.stats || [
                    { label: 'Custom Stat 1', value: '0+' },
                    { label: 'Custom Stat 2', value: '0+' },
                    { label: 'Custom Stat 3', value: '0+' },
                    { label: 'Custom Stat 4', value: '0+' },
                ];
                return (
                    <div
                        key={content.id}
                        className="flex flex-col items-start justify-between gap-4 rounded-lg bg-gray-100 p-4 sm:flex-row sm:gap-6 sm:p-6 lg:gap-8 lg:p-8"
                    >
                        {customStats.map((stat, index) => (
                            <div key={index} className="flex min-w-0 flex-1 flex-col gap-2 border-l border-gray-300 pl-3 lg:gap-3.5">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-poppins text-2xl font-semibold text-gray-900 sm:text-3xl lg:text-4xl">{stat.value}</span>
                                </div>
                                <p className="font-satoshi text-sm font-medium text-gray-500 sm:text-base lg:text-lg">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                );

            case 'curriculum-custom':
                // Custom curriculum section with pillars
                const customPillars = content.data?.pillars || [
                    { title: 'Custom Pillar 1', description: 'Description for custom pillar 1', icon: 'islamic_knowledge', color: 'blue' },
                    { title: 'Custom Pillar 2', description: 'Description for custom pillar 2', icon: 'general_education', color: 'green' },
                    { title: 'Custom Pillar 3', description: 'Description for custom pillar 3', icon: 'language_education', color: 'purple' },
                ];
                return (
                    <div key={content.id} className="flex flex-col items-center justify-between gap-8 py-12 sm:gap-10 sm:py-16 lg:gap-13 lg:py-25">
                        <h2 className="px-4 text-center text-2xl font-semibold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                            {content.content || content.title || 'Custom Curriculum Section'}
                        </h2>

                        <div className="flex w-full flex-col gap-4 lg:gap-5">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                                {customPillars.map((pillar, index) => (
                                    <div
                                        key={index}
                                        className={`flex h-auto min-h-[200px] w-full flex-col items-center gap-4 rounded-lg bg-${pillar.color}-50 p-4 sm:min-h-[220px] sm:p-6 lg:gap-6`}
                                    >
                                        <img
                                            src={iconMap[pillar.icon] || iconMap['islamic_knowledge']}
                                            alt={pillar.title}
                                            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
                                        />
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <h3 className="font-poppins text-lg font-medium text-gray-900 sm:text-xl lg:text-2xl">{pillar.title}</h3>
                                            <p className="font-poppins text-sm text-gray-600 sm:text-base">{pillar.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                // Default custom sections design
                return (
                    <div key={content.id} className="space-y-6">
                        {/* Section Title */}
                        {(content.title || content.content) && (
                            <h2 className="text-center text-2xl font-semibold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                                {content.title || content.content}
                            </h2>
                        )}

                        {/* Section Content */}
                        {content.content && content.title && (
                            <div className="prose prose-lg mx-auto max-w-4xl text-center">
                                <p className="text-lg leading-relaxed text-gray-700">{content.content}</p>
                            </div>
                        )}

                        {/* Section Image */}
                        {content.data?.image && (
                            <div className="mx-auto h-[250px] w-full max-w-2xl overflow-hidden rounded-lg bg-gray-200 sm:h-[300px] md:h-[350px] lg:h-[400px]">
                                <img
                                    src={content.data.image}
                                    alt={content.title || 'Section Image'}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                                        e.target.src = '';
                                    }}
                                />
                            </div>
                        )}

                        {/* Section Data */}
                        {content.data && Object.keys(content.data).length > 0 && !content.data.image && (
                            <div className="space-y-4">
                                {content.data.items && Array.isArray(content.data.items) ? (
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {content.data.items.map((item, index) => (
                                            <div key={index} className="rounded-lg bg-gray-50 p-4">
                                                {item.title && <h3 className="mb-2 font-medium text-gray-900">{item.title}</h3>}
                                                {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                                                {item.value && <span className="text-lg font-semibold text-blue-600">{item.value}</span>}
                                            </div>
                                        ))}
                                    </div>
                                ) : content.data.text ? (
                                    <p className="text-center text-gray-600">{content.data.text}</p>
                                ) : content.data.subtitle && !content.data.image ? (
                                    <p className="text-center text-lg text-gray-600">{content.data.subtitle}</p>
                                ) : !content.data.image && !content.data.subtitle && !content.data.text && !content.data.items ? (
                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <h4 className="mb-2 font-medium text-gray-900">Additional Information:</h4>
                                        <pre className="text-sm whitespace-pre-wrap text-gray-600">{JSON.stringify(content.data, null, 2)}</pre>
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>
                );
        }
    };

    return (
        <>
            {/* Header */}
            <div className="mx-auto w-full space-y-12 px-4 sm:space-y-16 md:space-y-20 lg:w-[1300px] lg:space-y-24">
                <div className="flex items-center justify-between py-3 sm:py-5">
                    <ApplicationLogo className="h-12 w-12 rounded-full fill-current sm:h-16 sm:w-16 lg:h-20 lg:w-20" />
                    <div className="ml-auto">
                        <nav className="hidden space-x-3 sm:flex md:space-x-6">
                            <a href="/#" className="text-sm text-gray-700 transition-colors hover:text-blue-600 md:text-base">
                                Contact
                            </a>
                            <a href="/#" className="text-sm text-gray-700 transition-colors hover:text-blue-600 md:text-base">
                                Admission
                            </a>
                            <a href="/#" className="text-sm text-gray-700 transition-colors hover:text-blue-600 md:text-base">
                                About Us
                            </a>
                            <Link href={route('login')} className="text-sm text-gray-700 transition-colors hover:text-blue-600 md:text-base">
                                Login
                            </Link>
                        </nav>
                        {/* Mobile Menu Button */}
                        <div className="sm:hidden">
                            <Link
                                href={route('login')}
                                className="rounded-md bg-blue-600 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-700"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dynamic Content Sections */}
            {welcomeContent && welcomeContent.length > 0 ? (
                <>
                    {welcomeContent.map((content, index) => {
                        const section = renderSection(content);
                        if (!section) return null;

                        // Wrap notice section differently (full width)
                        if (content.section_key === 'notice') {
                            return section;
                        }

                        // Wrap other sections in container
                        return (
                            <div key={content.id} className="mx-auto w-full space-y-12 px-4 sm:space-y-16 md:space-y-20 lg:w-[1300px] lg:space-y-24">
                                {section}
                            </div>
                        );
                    })}
                </>
            ) : (
                // Fallback content if no dynamic content is available
                <>
                    {/* Notice Section - Full Width */}
                    <div className="w-full overflow-hidden p-3 text-white sm:p-4" style={{ backgroundColor: '#2563eb' }}>
                        <Marquee speed={60} className="text-xs sm:text-sm md:text-base">
                            <span className="mr-4 sm:mr-8">আগামী ১০ জুলাই হিফয বিভাগের ভর্তি পরীক্ষা অনুষ্ঠিত হবে</span>
                            <span className="ml-4 sm:ml-8">|</span>
                            <span className="mr-4 sm:mr-8">ঈদুল আজহার ছুটি ১৪–২২ জুন পর্যন্ত</span>
                            <span className="ml-4 sm:ml-8">|</span>
                            <span className="mr-4 sm:mr-8">নতুন শিক্ষাবর্ষ শুরু হবে ১ আগস্ট</span>
                        </Marquee>
                    </div>

                    <hr className="invisible my-6" />

                    <div className="mx-auto w-full space-y-12 px-4 sm:space-y-16 md:space-y-20 lg:w-[1300px] lg:space-y-24">
                        {/* Static fallback content can be added here if needed */}
                    </div>
                </>
            )}
        </>
    );
};

export default Welcome;
