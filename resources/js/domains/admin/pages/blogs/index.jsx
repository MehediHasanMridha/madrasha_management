import BlogsContainer from '@/Container/Blog/BlogsContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const BlogIndex = ({ blogs, categories, tags, filters }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Blog Posts" />
            <BlogsContainer blogs={blogs} categories={categories} tags={tags} filters={filters} />
        </AuthenticatedLayout>
    );
};

export default BlogIndex;
