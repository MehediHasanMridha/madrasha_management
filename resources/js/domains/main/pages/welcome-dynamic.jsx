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

    // Create a map of content by section key for easy access
    const contentBySection = {};
    if (welcomeContent) {
        welcomeContent.forEach((content) => {
            contentBySection[content.section_key] = content;
        });
    }

    // Helper function to get content or fallback to static
    const getContent = (sectionKey, fallback) => {
        return contentBySection[sectionKey] || fallback;
    };

    // Get dynamic content or use static fallbacks
    const heroContent = getContent('hero', {
        content: 'ইসলামী শিক্ষায় একটি নতুন দিগন্ত',
        data: {
            subtitle: `${institute?.name_bangla || '...........'} একটি আদর্শ ইসলামি শিক্ষা প্রতিষ্ঠান, যেখানে আধুনিক কারিকুলামের সঙ্গে রয়েছে নৈতিকতা, আধ্যাত্মিকতা ও সময়ের চাহিদা অনুসারে শিক্ষার সুষম সমন্বয়।`,
        },
    });

    const noticeContent = getContent('notice', {
        content: 'আগামী ১০ জুলাই হিফয বিভাগের ভর্তি পরীক্ষা অনুষ্ঠিত হবে | ঈদুল আজহার ছুটি ১৪–২২ জুন পর্যন্ত | নতুন শিক্ষাবর্ষ শুরু হবে ১ আগস্ট',
        data: { scrolling: true, backgroundColor: '#2563eb' },
    });

    const statsContent = getContent('stats', {
        data: {
            stats: [
                { label: 'আস্থাভাজন শিক্ষা প্রতিষ্ঠান', value: '২+' },
                { label: 'ইসলামি ও সাধারণ বিষয়ে দক্ষ শিক্ষক', value: '১৮+' },
                { label: 'শিক্ষার্থী নিয়মিত পাঠরত', value: '৫০০+' },
                { label: 'শ্রেণি পর্যন্ত আধুনিক ও ইসলামি পাঠক্রম', value: '১ম -১০ম' },
            ],
        },
    });

    const curriculumContent = getContent('curriculum', {
        content: 'আমাদের পাঠক্রমের স্তম্ভসমূহ',
        data: {
            pillars: [
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
                { title: 'সৃজনশীলতা ও সহ-শিক্ষা', description: 'চিত্রাংকন, আলোচনা, গ্রুপ কার্যক্রম', icon: 'creativity_education', color: 'yellow' },
            ],
        },
    });

    // Icon mapping for curriculum pillars
    const iconMap = {
        islamic_knowledge,
        general_education,
        language_education,
        digital_education,
        moral_education,
        creativity_education,
    };

    return (
        <>
            <div className="mx-auto w-full space-y-12 px-4 sm:space-y-16 md:space-y-20 lg:w-[1300px] lg:space-y-24">
                {/* Header */}
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

            {/* Notice Section - Full Width */}
            {noticeContent.is_active !== false && (
                <div
                    className="w-full overflow-hidden p-3 text-white sm:p-4"
                    style={{ backgroundColor: noticeContent.data?.backgroundColor || '#2563eb' }}
                >
                    <Marquee speed={60} className="text-xs sm:text-sm md:text-base">
                        {noticeContent.content.split('|').map((text, index) => (
                            <span key={index} className="mr-4 sm:mr-8">
                                {text.trim()}
                                {index < noticeContent.content.split('|').length - 1 && <span className="ml-4 sm:ml-8">|</span>}
                            </span>
                        ))}
                    </Marquee>
                </div>
            )}

            <hr className="invisible my-6" />

            <div className="mx-auto w-full space-y-12 px-4 sm:space-y-16 md:space-y-20 lg:w-[1300px] lg:space-y-24">
                {/* Hero Section */}
                {heroContent.is_active !== false && (
                    <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-10">
                        <div className="order-2 flex w-full flex-col gap-6 lg:order-1 lg:w-[610px] lg:gap-15">
                            <div className="flex flex-col gap-4 text-center lg:gap-6 lg:text-left">
                                <h1 className="font-poppins text-3xl leading-tight font-semibold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                                    {heroContent.content}
                                </h1>
                                <p className="font-poppins max-w-full px-2 text-sm leading-6 text-gray-600 sm:text-base lg:max-w-[593px] lg:px-0 lg:leading-7">
                                    {heroContent.data?.subtitle}
                                </p>
                            </div>
                        </div>
                        <div className="order-1 h-[250px] w-full overflow-hidden rounded-lg bg-gray-200 sm:h-[300px] md:h-[350px] lg:order-2 lg:h-[450px] lg:w-[588px]">
                            <img
                                src={HeroImg}
                                alt="Madrasha Building"
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                                    e.target.src = '';
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Statistics Section */}
                {statsContent.is_active !== false && statsContent.data?.stats && (
                    <div className="flex flex-col items-start justify-between gap-4 rounded-lg bg-gray-100 p-4 sm:flex-row sm:gap-6 sm:p-6 lg:gap-8 lg:p-8">
                        {statsContent.data.stats.map((stat, index) => (
                            <div key={index} className="flex min-w-0 flex-1 flex-col gap-2 border-l border-gray-300 pl-3 lg:gap-3.5">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-poppins text-2xl font-semibold text-gray-900 sm:text-3xl lg:text-4xl">{stat.value}</span>
                                </div>
                                <p className="font-satoshi text-sm font-medium text-gray-500 sm:text-base lg:text-lg">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Curriculum Pillars Section */}
                {curriculumContent.is_active !== false && (
                    <div className="flex flex-col items-center justify-between gap-8 py-12 sm:gap-10 sm:py-16 lg:gap-13 lg:py-25">
                        <h2 className="px-4 text-center text-2xl font-semibold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                            {curriculumContent.content}
                        </h2>

                        <div className="flex w-full flex-col gap-4 lg:gap-5">
                            {/* First Row */}
                            <div className="flex flex-col gap-4 lg:flex-row lg:gap-5">
                                {curriculumContent.data?.pillars?.slice(0, 3).map((pillar, index) => (
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
                                {curriculumContent.data?.pillars?.slice(3, 6).map((pillar, index) => (
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
                )}
            </div>
        </>
    );
};

export default Welcome;
