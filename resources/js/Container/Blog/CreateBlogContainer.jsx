import RichTextEditor from '@/Components/UI/RichTextEditor';
import StaticBtn from '@/Components/UI/StaticBtn';
import { Image, X } from 'lucide-react';
import { useState } from 'react';
const CreateBlogContainer = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(
        'Lorem ipsum dolor sit amet, \n\nconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    );
    const [tags, setTags] = useState(['Education', 'Islamic']);
    const [thumbnail, setThumbnail] = useState(null);
    const [newTag, setNewTag] = useState('');

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter' && newTag.trim()) {
            e.preventDefault();
            if (!tags.includes(newTag.trim())) {
                setTags([...tags, newTag.trim()]);
            }
            setNewTag('');
        }
    };

    const handleTagInputChange = (e) => {
        setNewTag(e.target.value);
    };

    const handleThumbnailUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setThumbnail(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeThumbnail = () => {
        setThumbnail(null);
    };

    return (
        <div className="min-h-screen px-12 py-8">
            <div className="mx-auto flex max-w-7xl gap-6">
                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between rounded-lg bg-white p-6">
                        <h1 className="text-2xl font-medium text-gray-900">Writing blog</h1>
                        <StaticBtn className="rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700">
                            Post
                        </StaticBtn>
                    </div>

                    {/* Title Section */}
                    <div className="space-y-3">
                        <label className="text-lg font-medium text-gray-700">Title</label>
                        <div className="rounded-lg bg-white p-6">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Here is title field."
                                className="w-full border-none text-base text-gray-700 placeholder-gray-400 outline-none"
                            />
                        </div>
                    </div>

                    {/* Body Section */}
                    <div className="space-y-3">
                        <label className="text-lg font-medium text-gray-700">Content</label>
                        <RichTextEditor />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-96 space-y-6">
                    {/* Thumbnail Upload */}
                    <div className="rounded-lg bg-white p-4 shadow-lg">
                        {!thumbnail ? (
                            <div className="space-y-6">
                                <div className="flex h-56 w-full items-center justify-center rounded-lg bg-gray-200">
                                    <Image size={48} className="text-gray-400" />
                                </div>
                                <p className="text-sm text-gray-700">Please use JPEG format with non transparent background.</p>
                                <div className="flex gap-4">
                                    <label className="flex-1">
                                        <input type="file" accept="image/jpeg,image/jpg" onChange={handleThumbnailUpload} className="hidden" />
                                        <div className="cursor-pointer rounded-lg bg-blue-600 px-4 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700">
                                            Add Thumbnail
                                        </div>
                                    </label>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="h-56 w-full overflow-hidden rounded-lg bg-gray-200">
                                    <img src={thumbnail} alt="Thumbnail" className="h-full w-full object-cover" />
                                </div>
                                <p className="text-sm text-gray-700">Please use JPEG format with non transparent background.</p>
                                <div className="flex gap-4">
                                    <label className="flex-1">
                                        <input type="file" accept="image/jpeg,image/jpg" onChange={handleThumbnailUpload} className="hidden" />
                                        <div className="cursor-pointer rounded-lg bg-blue-600 px-4 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700">
                                            Add Thumbnail
                                        </div>
                                    </label>
                                    <button
                                        onClick={removeThumbnail}
                                        className="flex-1 rounded-lg bg-gray-100 px-4 py-3 font-medium text-red-600 transition-colors hover:bg-gray-200"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Tags Section */}
                    <div className="rounded-lg bg-white p-4 shadow-lg">
                        <h3 className="mb-6 text-lg font-medium text-gray-900">Add tags</h3>
                        <p className="mb-3 text-sm text-gray-700">Add relevant tags to help categorize your blog post.</p>
                        <div className="rounded-xl bg-gray-100 p-3">
                            <div className="flex flex-wrap items-center gap-2">
                                {tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-600"
                                    >
                                        {tag}
                                        <button onClick={() => handleRemoveTag(tag)} className="text-gray-400 transition-colors hover:text-gray-600">
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={handleTagInputChange}
                                    onKeyDown={handleAddTag}
                                    placeholder="Type and press Enter to add tag..."
                                    className="min-w-0 flex-1 border-none bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none"
                                    style={{ minWidth: '150px' }}
                                />
                            </div>
                        </div>
                        {tags.length === 0 && <p className="mt-2 text-xs text-gray-400">No tags added yet. Start typing to add your first tag.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBlogContainer;
