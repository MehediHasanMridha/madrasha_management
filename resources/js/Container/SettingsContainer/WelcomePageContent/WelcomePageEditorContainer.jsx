import StaticBtn from '@/Components/UI/StaticBtn';
import { router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddWelcomePageContentContainer from './AddWelcomePageContentContainer';
import EditWelcomePageContentContainer from './EditWelcomePageContentContainer';
import ViewWelcomePageContentContainer from './ViewWelcomePageContentContainer';
import WelcomePageContentListContainer from './WelcomePageContentListContainer';
const WelcomePageEditorContainer = ({ contents }) => {
    const [welcomeContents, setWelcomeContents] = useState(contents || []);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingContent, setEditingContent] = useState(null);
    const [previewContent, setPreviewContent] = useState(null);

    useEffect(() => {
        // check contents & welcomeContents are same or not
        if (JSON.stringify(contents) !== JSON.stringify(welcomeContents)) {
            setWelcomeContents(contents);
        }
    }, [contents]);

    const handleDeleteContent = (contentId) => {
        router.delete(route('settings.welcome-page.destroy', contentId), {
            preserveScroll: true,
            onSuccess: () => {
                setWelcomeContents((prev) => prev.filter((item) => item.id !== contentId));
            },
        });
    };

    const defaultSections = [
        {
            section_key: 'hero',
            title: 'Hero Section',
            content: 'ইসলামী শিক্ষায় একটি নতুন দিগন্ত',
            data: {
                subtitle: 'একটি আদর্শ ইসলামি শিক্ষা প্রতিষ্ঠান',
                image: '/default-hero.jpg',
            },
        },
        {
            section_key: 'notice',
            title: 'Notice Banner',
            content: 'আগামী ১০ জুলাই হিফয বিভাগের ভর্তি পরীক্ষা অনুষ্ঠিত হবে',
            data: {
                scrolling: true,
                backgroundColor: '#2563eb',
            },
        },
        {
            section_key: 'stats',
            title: 'Statistics Section',
            content: '',
            data: {
                stats: [
                    { label: 'আস্থাভাজন শিক্ষা প্রতিষ্ঠান', value: '২+' },
                    { label: 'ইসলামি ও সাধারণ বিষয়ে দক্ষ শিক্ষক', value: '১৮+' },
                    { label: 'শিক্ষার্থী নিয়মিত পাঠরত', value: '৫০০+' },
                    { label: 'শ্রেণি পর্যন্ত আধুনিক ও ইসলামি পাঠক্রম', value: '১ম -১০ম' },
                ],
            },
        },
        {
            section_key: 'curriculum',
            title: 'Curriculum Section',
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
                    {
                        title: 'সৃজনশীলতা ও সহ-শিক্ষা',
                        description: 'চিত্রাংকন, আলোচনা, গ্রুপ কার্যক্রম',
                        icon: 'creativity_education',
                        color: 'yellow',
                    },
                ],
            },
        },
        {
            section_key: 'divider-invisible',
            title: 'Invisible Spacer',
            content: '',
            data: {
                type: 'invisible',
                spacing: 'medium',
                customSpacing: '40px',
            },
        },
        {
            section_key: 'divider-line',
            title: 'Line Divider',
            content: '',
            data: {
                type: 'line',
                spacing: 'medium',
                customSpacing: '40px',
                lineColor: '#d1d5db',
                lineWidth: '1px',
            },
        },
        {
            section_key: 'divider-decorative',
            title: 'Decorative Divider',
            content: '',
            data: {
                type: 'decorative',
                spacing: 'medium',
                customSpacing: '40px',
                lineColor: '#d1d5db',
                decorativeText: '●',
            },
        },
        {
            section_key: 'divider-colored',
            title: 'Colored Background Spacer',
            content: '',
            data: {
                type: 'colored',
                spacing: 'large',
                customSpacing: '60px',
                backgroundColor: '#f3f4f6',
                pattern: 'none',
            },
        },
    ];

    return (
        <div className="space-y-6">
            {/* Add New Content Button */}
            <div className="flex items-center justify-between rounded-lg bg-white p-6">
                <h2 className="text-lg font-medium text-gray-900">Content Sections</h2>
                <StaticBtn onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Section
                </StaticBtn>
            </div>

            {/* Content List */}
            <WelcomePageContentListContainer
                contents={welcomeContents}
                setEditingContent={setEditingContent}
                setPreviewContent={setPreviewContent}
                handleDeleteContent={handleDeleteContent}
                setIsAddModalOpen={setIsAddModalOpen}
                setWelcomeContents={setWelcomeContents}
            />

            {/* Modals */}
            <AddWelcomePageContentContainer
                isModalOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                defaultSections={defaultSections}
                title="Add New Section"
            />

            <EditWelcomePageContentContainer
                isModalOpen={!!editingContent}
                onClose={() => setEditingContent(null)}
                initialData={editingContent}
                title="Edit Section"
            />

            <ViewWelcomePageContentContainer
                isModalOpen={!!previewContent}
                onClose={() => setPreviewContent(null)}
                content={previewContent}
                title="Preview Content"
            />
        </div>
    );
};

export default WelcomePageEditorContainer;
