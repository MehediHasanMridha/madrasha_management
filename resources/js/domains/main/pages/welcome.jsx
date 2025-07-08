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
        <div className="mx-auto w-full space-y-24 px-4 lg:w-[1300px]">
            {/* Header */}
            <div className="flex items-center justify-between py-5">
                <ApplicationLogo className="h-20 w-20 rounded-full fill-current" />
                <div className="ml-auto">
                    <nav className="flex space-x-6">
                        <a href="/contact" className="text-gray-700 transition-colors hover:text-blue-600">
                            Contact
                        </a>
                        <a href="/admission" className="text-gray-700 transition-colors hover:text-blue-600">
                            Admission
                        </a>
                        <a href="/about" className="text-gray-700 transition-colors hover:text-blue-600">
                            About Us
                        </a>
                        <Link href={route('login')} className="text-gray-700 transition-colors hover:text-blue-600">
                            Login
                        </Link>
                    </nav>
                </div>
            </div>
            {/* Notice Section */}
            <div className="absolute top-30 left-0 flex w-full items-center gap-8 overflow-hidden bg-blue-600 p-4 text-white">
                <Marquee speed={80}>
                    <span className="mr-8 text-base">আগামী ১০ জুলাই হিফয বিভাগের ভর্তি পরীক্ষা অনুষ্ঠিত হবে</span>
                    <span className="mr-8 text-base">|</span>
                    <span className="mr-8 text-base">ঈদুল আজহার ছুটি ১৪–২২ জুন পর্যন্ত</span>
                    <span className="mr-8 text-base">|</span>
                    <span className="mr-8 text-base">নতুন শিক্ষাবর্ষ শুরু হবে ১ আগস্ট</span>
                </Marquee>
            </div>
            {/* Hero Section */}
            <div className="flex items-center justify-between gap-10">
                <div className="flex w-full flex-col gap-15 lg:w-[610px]">
                    <div className="flex flex-col gap-6">
                        <h1 className="font-poppins text-4xl leading-tight font-semibold text-gray-900 lg:text-6xl">
                            ইসলামী শিক্ষায় একটি নতুন দিগন্ত
                        </h1>
                        <p className="font-poppins max-w-[593px] text-base leading-7 text-gray-600">
                            মাদ্রাসাতুল হেরা একটি আদর্শ ইসলামি শিক্ষা প্রতিষ্ঠান, যেখানে আধুনিক কারিকুলামের সঙ্গে রয়েছে নৈতিকতা, আধ্যাত্মিকতা ও
                            সময়ের চাহিদা অনুসারে শিক্ষার সুষম সমন্বয়।
                        </p>
                    </div>
                    <StaticBtn className="hidden w-fit">এখনই রেজিস্ট্রেশন করুন</StaticBtn>
                </div>
                <div className="hidden h-[450px] w-[588px] overflow-hidden rounded-lg bg-gray-200 lg:block">
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
            <div className="flex flex-col items-start justify-between gap-8 rounded-lg bg-gray-100 p-8 lg:flex-row lg:items-center lg:gap-17">
                <div className="flex flex-1 flex-col gap-3.5 border-l border-gray-300 pl-3">
                    <div className="flex items-center gap-1.5">
                        <span className="font-poppins text-3xl font-semibold text-gray-900 lg:text-4xl">২+</span>
                    </div>
                    <p className="font-satoshi text-base font-medium text-gray-500 lg:text-lg">আস্থাভাজন শিক্ষা প্রতিষ্ঠান</p>
                </div>

                <div className="flex flex-1 flex-col gap-3.5 border-l border-gray-300 pl-3">
                    <div className="flex items-center gap-1.5">
                        <span className="font-poppins text-3xl font-semibold text-gray-900 lg:text-4xl">১৮+</span>
                    </div>
                    <p className="font-satoshi text-base font-medium text-gray-500 lg:text-lg">ইসলামি ও সাধারণ বিষয়ে দক্ষ শিক্ষক</p>
                </div>

                <div className="flex flex-1 flex-col gap-3.5 border-l border-gray-300 pl-3">
                    <div className="flex items-center gap-1.5">
                        <span className="font-poppins text-3xl font-semibold text-gray-900 lg:text-4xl">৫০০+</span>
                    </div>
                    <p className="font-satoshi text-base font-medium text-gray-500 lg:text-lg">শিক্ষার্থী নিয়মিত পাঠরত</p>
                </div>

                <div className="flex flex-1 flex-col gap-3.5 border-l border-gray-300 pl-3">
                    <div className="flex items-center gap-1.5">
                        <span className="font-poppins text-2xl font-semibold text-gray-900 lg:text-4xl">১ম -১০ম</span>
                    </div>
                    <p className="font-satoshi text-base font-medium text-gray-500 lg:text-lg">শ্রেণি পর্যন্ত আধুনিক ও ইসলামি পাঠক্রম</p>
                </div>
            </div>
            {/* Curriculum Pillars Section */}
            <div className="flex flex-col items-center justify-between gap-13 py-25">
                <h2 className="text-center text-4xl font-semibold text-gray-900 lg:text-5xl">আমাদের পাঠক্রমের স্তম্ভসমূহ</h2>

                <div className="flex w-full flex-col gap-5">
                    {/* First Row */}
                    <div className="flex flex-col gap-5 lg:flex-row">
                        {/* Islamic Knowledge */}
                        <div className="flex h-53 w-full flex-col items-center gap-6 rounded-lg bg-pink-50 p-6 lg:w-100">
                            <img src={islamic_knowledge} alt="Islamic Knowledge" className="h-12 w-12 object-contain" />
                            <div className="flex flex-col items-center gap-2">
                                <h3 className="font-poppins text-center text-2xl font-medium text-gray-900">ইসলামি জ্ঞান</h3>
                                <p className="font-poppins text-center text-base text-gray-600">কুরআন, হাদীস, ফিকহ ও আদর্শ জীবনের পাঠ</p>
                            </div>
                        </div>

                        {/* General Education */}
                        <div className="flex h-53 w-full flex-col items-center gap-6 rounded-lg bg-teal-50 p-6 lg:w-100">
                            <img src={general_education} alt="General Education" className="h-12 w-12 object-contain" />
                            <div className="flex flex-col items-center gap-2">
                                <h3 className="font-poppins text-center text-2xl font-medium text-gray-900">সাধারণ শিক্ষাব্যবস্থা</h3>
                                <p className="font-poppins text-center text-base text-gray-600">বাংলা, গণিত, বিজ্ঞান, ইংরেজি</p>
                            </div>
                        </div>

                        {/* Language Education */}
                        <div className="flex w-full flex-col items-center gap-6 rounded-lg bg-amber-50 p-6 lg:w-100">
                            <img src={language_education} alt="Language Education" className="h-12 w-12 object-contain" />
                            <div className="flex flex-col items-center gap-2">
                                <h3 className="font-poppins text-center text-2xl font-medium text-gray-900">ভাষা শিক্ষা</h3>
                                <p className="font-poppins text-center text-base text-gray-600">
                                    আরবি, বাংলা, ইংরেজি (ভাষার শুদ্ধ চর্চা ও অনুবাদ দক্ষতা)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="flex flex-col gap-5 lg:flex-row">
                        {/* Digital Education */}
                        <div className="flex h-53 w-full flex-col items-center gap-6 rounded-lg bg-purple-50 p-6 lg:w-100">
                            <img src={digital_education} alt="Digital Education" className="h-12 w-12 object-contain" />
                            <div className="flex flex-col items-center gap-2">
                                <h3 className="font-poppins text-center text-2xl font-medium text-gray-900">ডিজিটাল শিক্ষা</h3>
                                <p className="font-poppins text-center text-base text-gray-600">
                                    আইসিটি, টাইপিং, ডিজাইন পরিচিতি (ICT basic integration)
                                </p>
                            </div>
                        </div>

                        {/* Moral Education */}
                        <div className="flex h-53 w-full flex-col items-center gap-6 rounded-lg bg-pink-100 p-6 lg:w-100">
                            <img src={moral_education} alt="Moral Education" className="h-12 w-12 object-contain" />
                            <div className="flex flex-col items-center gap-2">
                                <h3 className="font-poppins text-center text-2xl font-medium text-gray-900">নৈতিক ও মানবিক গুণাবলি</h3>
                                <p className="font-poppins text-center text-base text-gray-600">আদব, আচরণ, আত্ম-উন্নয়ন</p>
                            </div>
                        </div>

                        {/* Creativity Education */}
                        <div className="flex h-53 w-full flex-col items-center gap-6 rounded-lg bg-yellow-50 p-6 lg:w-100">
                            <img src={creativity_education} alt="Creativity Education" className="h-12 w-12 object-contain" />
                            <div className="flex flex-col items-center gap-2">
                                <h3 className="font-poppins text-center text-2xl font-medium text-gray-900">সৃজনশীলতা ও সহ-শিক্ষা</h3>
                                <p className="font-poppins text-center text-base text-gray-600">চিত্রাংকন, আলোচনা, গ্রুপ কার্যক্রম</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
