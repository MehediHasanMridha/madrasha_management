import BlogsContainer from '@/Container/Blog/BlogsContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function BlogIndex({ blogs, categories, tags, filters }) {
    return (
        <AuthenticatedLayout>
            <Head title="Blog Posts" />
            <BlogsContainer blogs={blogs} categories={categories} tags={tags} filters={filters} />
        </AuthenticatedLayout>
    );
}
