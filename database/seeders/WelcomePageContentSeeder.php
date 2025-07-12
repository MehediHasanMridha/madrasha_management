<?php
namespace Database\Seeders;

use App\Models\WelcomePageContent;
use Illuminate\Database\Seeder;

class WelcomePageContentSeeder extends Seeder
{
    public function run(): void
    {
        $contents = [
            [
                'section_key' => 'hero',
                'title'       => 'Hero Section',
                'content'     => 'ইসলামী শিক্ষায় একটি নতুন দিগন্ত',
                'data'        => [
                    'subtitle' => 'একটি আদর্শ ইসলামি শিক্ষা প্রতিষ্ঠান, যেখানে আধুনিক কারিকুলামের সঙ্গে রয়েছে নৈতিকতা, আধ্যাত্মিকতা ও সময়ের চাহিদা অনুসারে শিক্ষার সুষম সমন্বয়।',
                    'image'    => '/default-hero.jpg',
                ],
                'sort_order'  => 1,
                'is_active'   => true,
            ],
            [
                'section_key' => 'notice',
                'title'       => 'Notice Banner',
                'content'     => 'আগামী ১০ জুলাই হিফয বিভাগের ভর্তি পরীক্ষা অনুষ্ঠিত হবে | ঈদুল আজহার ছুটি ১৪–২২ জুন পর্যন্ত | নতুন শিক্ষাবর্ষ শুরু হবে ১ আগস্ট',
                'data'        => [
                    'scrolling'       => true,
                    'backgroundColor' => '#2563eb',
                ],
                'sort_order'  => 2,
                'is_active'   => true,
            ],
            [
                'section_key' => 'stats',
                'title'       => 'Statistics Section',
                'content'     => '',
                'data'        => [
                    'stats' => [
                        ['label' => 'আস্থাভাজন শিক্ষা প্রতিষ্ঠান', 'value' => '২+'],
                        ['label' => 'ইসলামি ও সাধারণ বিষয়ে দক্ষ শিক্ষক', 'value' => '১৮+'],
                        ['label' => 'শিক্ষার্থী নিয়মিত পাঠরত', 'value' => '৫০০+'],
                        ['label' => 'শ্রেণি পর্যন্ত আধুনিক ও ইসলামি পাঠক্রম', 'value' => '১ম -১০ম'],
                    ],
                ],
                'sort_order'  => 3,
                'is_active'   => true,
            ],
            [
                'section_key' => 'curriculum',
                'title'       => 'Curriculum Section',
                'content'     => 'আমাদের পাঠক্রমের স্তম্ভসমূহ',
                'data'        => [
                    'pillars' => [
                        [
                            'title'       => 'ইসলামি জ্ঞান',
                            'description' => 'কুরআন, হাদীস, ফিকহ ও আদর্শ জীবনের পাঠ',
                            'icon'        => 'islamic_knowledge',
                            'color'       => 'pink',
                        ],
                        [
                            'title'       => 'সাধারণ শিক্ষাব্যবস্থা',
                            'description' => 'বাংলা, গণিত, বিজ্ঞান, ইংরেজি',
                            'icon'        => 'general_education',
                            'color'       => 'teal',
                        ],
                        [
                            'title'       => 'ভাষা শিক্ষা',
                            'description' => 'আরবি, বাংলা, ইংরেজি (ভাষার শুদ্ধ চর্চা ও অনুবাদ দক্ষতা)',
                            'icon'        => 'language_education',
                            'color'       => 'amber',
                        ],
                        [
                            'title'       => 'ডিজিটাল শিক্ষা',
                            'description' => 'আইসিটি, টাইপিং, ডিজাইন পরিচিতি (ICT basic integration)',
                            'icon'        => 'digital_education',
                            'color'       => 'purple',
                        ],
                        [
                            'title'       => 'নৈতিক ও মানবিক গুণাবলি',
                            'description' => 'আদব, আচরণ, আত্ম-উন্নয়ন',
                            'icon'        => 'moral_education',
                            'color'       => 'pink',
                        ],
                        [
                            'title'       => 'সৃজনশীলতা ও সহ-শিক্ষা',
                            'description' => 'চিত্রাংকন, আলোচনা, গ্রুপ কার্যক্রম',
                            'icon'        => 'creativity_education',
                            'color'       => 'yellow',
                        ],
                    ],
                ],
                'sort_order'  => 4,
                'is_active'   => true,
            ],
        ];

        foreach ($contents as $content) {
            WelcomePageContent::create($content);
        }
    }
}
