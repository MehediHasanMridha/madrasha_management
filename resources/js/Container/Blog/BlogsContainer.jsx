import BlogsComponent from '@/Components/Blog/BlogsComponent';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const BlogsContainer = ({ blogs, categories, tags, filters }) => {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [selectedTag, setSelectedTag] = useState(filters.tag || '');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '');

    const handleSearch = () => {
        router.get(
            route('blogs.index'),
            {
                search,
                category: selectedCategory,
                tag: selectedTag,
                status: selectedStatus,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true, // Use replace to avoid adding a new entry in the history stack
            },
        );
    };

    const handleDelete = (blogSlug) => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            router.delete(route('blogs.destroy', { blog: blogSlug }));
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };
    return (
        <BlogsComponent
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            blogs={blogs}
            formatDate={formatDate}
            filters={filters}
            handleDelete={handleDelete}
        />
    );
};

export default BlogsContainer;
