import creativity_education from '@/assets/images/curriculum/creativity-education.png';
import digital_education from '@/assets/images/curriculum/digital-education.png';
import general_education from '@/assets/images/curriculum/general-education.png';
import islamic_knowledge from '@/assets/images/curriculum/islamic-knowledge.png';
import language_education from '@/assets/images/curriculum/language-education.png';
import moral_education from '@/assets/images/curriculum/moral-education.png';
import HeroImg from '@/assets/images/hero_img.webp'; // Ensure this path is correct
import ApplicationLogo from '@/Components/ApplicationLogo';
import StaticBtn from '@/Components/UI/StaticBtn';
import { Link } from '@inertiajs/react';
import Marquee from 'react-fast-marquee';
const Welcome = () => {
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
            <div className="w-full overflow-hidden bg-blue-600 p-3 text-white sm:p-4">
                <Marquee speed={60} className="text-xs sm:text-sm md:text-base">
                    <span className="mr-4 sm:mr-8">আগামী ১০ জুলাই হিফয বিভাগের ভর্তি পরীক্ষা অনুষ্ঠিত হবে</span>
                    <span className="mr-4 sm:mr-8">|</span>
                    <span className="mr-4 sm:mr-8">ঈদুল আজহার ছুটি ১৪–২২ জুন পর্যন্ত</span>
                    <span className="mr-4 sm:mr-8">|</span>
                    <span className="mr-4 sm:mr-8">নতুন শিক্ষাবর্ষ শুরু হবে ১ আগস্ট</span>
                </Marquee>
            </div>
            <hr className="invisible my-6" />
            <div className="mx-auto w-full space-y-12 px-4 sm:space-y-16 md:space-y-20 lg:w-[1300px] lg:space-y-24">
                {/* Hero Section */}
                <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-10">
                    <div className="order-2 flex w-full flex-col gap-6 lg:order-1 lg:w-[610px] lg:gap-15">
                        <div className="flex flex-col gap-4 text-center lg:gap-6 lg:text-left">
                            <h1 className="font-poppins text-3xl leading-tight font-semibold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                                ইসলামী শিক্ষায় একটি নতুন দিগন্ত
                            </h1>
                            <p className="font-poppins max-w-full px-2 text-sm leading-6 text-gray-600 sm:text-base lg:max-w-[593px] lg:px-0 lg:leading-7">
                                মাদ্রাসাতুল হেরা একটি আদর্শ ইসলামি শিক্ষা প্রতিষ্ঠান, যেখানে আধুনিক কারিকুলামের সঙ্গে রয়েছে নৈতিকতা, আধ্যাত্মিকতা ও
                                সময়ের চাহিদা অনুসারে শিক্ষার সুষম সমন্বয়।
                            </p>
                        </div>
                        <StaticBtn className="mx-auto w-fit text-sm sm:text-base lg:mx-0">এখনই রেজিস্ট্রেশন করুন</StaticBtn>
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
                {/* Statistics Section */}
                <div className="flex flex-col items-start justify-between gap-4 rounded-lg bg-gray-100 p-4 sm:flex-row sm:gap-6 sm:p-6 lg:gap-8 lg:p-8">
                    <div className="flex min-w-0 flex-1 flex-col gap-2 border-l border-gray-300 pl-3 lg:gap-3.5">
                        <div className="flex items-center gap-1.5">
                            <span className="font-poppins text-2xl font-semibold text-gray-900 sm:text-3xl lg:text-4xl">২+</span>
                        </div>
                        <p className="font-satoshi text-sm font-medium text-gray-500 sm:text-base lg:text-lg">আস্থাভাজন শিক্ষা প্রতিষ্ঠান</p>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-2 border-l border-gray-300 pl-3 lg:gap-3.5">
                        <div className="flex items-center gap-1.5">
                            <span className="font-poppins text-2xl font-semibold text-gray-900 sm:text-3xl lg:text-4xl">১৮+</span>
                        </div>
                        <p className="font-satoshi text-sm font-medium text-gray-500 sm:text-base lg:text-lg">ইসলামি ও সাধারণ বিষয়ে দক্ষ শিক্ষক</p>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-2 border-l border-gray-300 pl-3 lg:gap-3.5">
                        <div className="flex items-center gap-1.5">
                            <span className="font-poppins text-2xl font-semibold text-gray-900 sm:text-3xl lg:text-4xl">৫০০+</span>
                        </div>
                        <p className="font-satoshi text-sm font-medium text-gray-500 sm:text-base lg:text-lg">শিক্ষার্থী নিয়মিত পাঠরত</p>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-2 border-l border-gray-300 pl-3 lg:gap-3.5">
                        <div className="flex items-center gap-1.5">
                            <span className="font-poppins text-xl font-semibold text-gray-900 sm:text-2xl lg:text-4xl">১ম -১০ম</span>
                        </div>
                        <p className="font-satoshi text-sm font-medium text-gray-500 sm:text-base lg:text-lg">
                            শ্রেণি পর্যন্ত আধুনিক ও ইসলামি পাঠক্রম
                        </p>
                    </div>
                </div>
                {/* Curriculum Pillars Section */}
                <div className="flex flex-col items-center justify-between gap-8 py-12 sm:gap-10 sm:py-16 lg:gap-13 lg:py-25">
                    <h2 className="px-4 text-center text-2xl font-semibold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                        আমাদের পাঠক্রমের স্তম্ভসমূহ
                    </h2>

                    <div className="flex w-full flex-col gap-4 lg:gap-5">
                        {/* First Row */}
                        <div className="flex flex-col gap-4 lg:flex-row lg:gap-5">
                            {/* Islamic Knowledge */}
                            <div className="flex h-auto min-h-[200px] w-full flex-col items-center gap-4 rounded-lg bg-pink-50 p-4 sm:min-h-[220px] sm:p-6 lg:h-53 lg:w-100 lg:gap-6">
                                <img src={islamic_knowledge} alt="Islamic Knowledge" className="h-10 w-10 object-contain sm:h-12 sm:w-12" />
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <h3 className="font-poppins text-lg font-medium text-gray-900 sm:text-xl lg:text-2xl">ইসলামি জ্ঞান</h3>
                                    <p className="font-poppins text-sm text-gray-600 sm:text-base">কুরআন, হাদীস, ফিকহ ও আদর্শ জীবনের পাঠ</p>
                                </div>
                            </div>

                            {/* General Education */}
                            <div className="flex h-auto min-h-[200px] w-full flex-col items-center gap-4 rounded-lg bg-teal-50 p-4 sm:min-h-[220px] sm:p-6 lg:h-53 lg:w-100 lg:gap-6">
                                <img src={general_education} alt="General Education" className="h-10 w-10 object-contain sm:h-12 sm:w-12" />
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <h3 className="font-poppins text-lg font-medium text-gray-900 sm:text-xl lg:text-2xl">সাধারণ শিক্ষাব্যবস্থা</h3>
                                    <p className="font-poppins text-sm text-gray-600 sm:text-base">বাংলা, গণিত, বিজ্ঞান, ইংরেজি</p>
                                </div>
                            </div>

                            {/* Language Education */}
                            <div className="flex h-auto min-h-[200px] w-full flex-col items-center gap-4 rounded-lg bg-amber-50 p-4 sm:min-h-[220px] sm:p-6 lg:w-100 lg:gap-6">
                                <img src={language_education} alt="Language Education" className="h-10 w-10 object-contain sm:h-12 sm:w-12" />
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <h3 className="font-poppins text-lg font-medium text-gray-900 sm:text-xl lg:text-2xl">ভাষা শিক্ষা</h3>
                                    <p className="font-poppins text-sm text-gray-600 sm:text-base">
                                        আরবি, বাংলা, ইংরেজি (ভাষার শুদ্ধ চর্চা ও অনুবাদ দক্ষতা)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Second Row */}
                        <div className="flex flex-col gap-4 lg:flex-row lg:gap-5">
                            {/* Digital Education */}
                            <div className="flex h-auto min-h-[200px] w-full flex-col items-center gap-4 rounded-lg bg-purple-50 p-4 sm:min-h-[220px] sm:p-6 lg:h-53 lg:w-100 lg:gap-6">
                                <img src={digital_education} alt="Digital Education" className="h-10 w-10 object-contain sm:h-12 sm:w-12" />
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <h3 className="font-poppins text-lg font-medium text-gray-900 sm:text-xl lg:text-2xl">ডিজিটাল শিক্ষা</h3>
                                    <p className="font-poppins text-sm text-gray-600 sm:text-base">
                                        আইসিটি, টাইপিং, ডিজাইন পরিচিতি (ICT basic integration)
                                    </p>
                                </div>
                            </div>

                            {/* Moral Education */}
                            <div className="flex h-auto min-h-[200px] w-full flex-col items-center gap-4 rounded-lg bg-pink-100 p-4 sm:min-h-[220px] sm:p-6 lg:h-53 lg:w-100 lg:gap-6">
                                <img src={moral_education} alt="Moral Education" className="h-10 w-10 object-contain sm:h-12 sm:w-12" />
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <h3 className="font-poppins text-lg font-medium text-gray-900 sm:text-xl lg:text-2xl">নৈতিক ও মানবিক গুণাবলি</h3>
                                    <p className="font-poppins text-sm text-gray-600 sm:text-base">আদব, আচরণ, আত্ম-উন্নয়ন</p>
                                </div>
                            </div>

                            {/* Creativity Education */}
                            <div className="flex h-auto min-h-[200px] w-full flex-col items-center gap-4 rounded-lg bg-yellow-50 p-4 sm:min-h-[220px] sm:p-6 lg:h-53 lg:w-100 lg:gap-6">
                                <img src={creativity_education} alt="Creativity Education" className="h-10 w-10 object-contain sm:h-12 sm:w-12" />
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <h3 className="font-poppins text-lg font-medium text-gray-900 sm:text-xl lg:text-2xl">সৃজনশীলতা ও সহ-শিক্ষা</h3>
                                    <p className="font-poppins text-sm text-gray-600 sm:text-base">চিত্রাংকন, আলোচনা, গ্রুপ কার্যক্রম</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Welcome;
