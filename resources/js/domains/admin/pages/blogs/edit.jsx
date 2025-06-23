import BreadcrumbUI from '@/Components/UI/BreadcrumbUI';
import EditBlogContainer from '@/Container/Blog/EditBlogContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const EditBlog = ({ blog, categories = [], tags = [], selectedTags = [] }) => {
    return (
        <AuthenticatedLayout>
            <Head title={`Edit Blog - ${blog.title}`} />
            <div className="my-4">
                <BreadcrumbUI items={[{ title: <Link href={route('blogs.index')}>Blogs</Link> }, { title: 'Edit Blog', active: true }]} />
            </div>{' '}
            <EditBlogContainer blog={blog} categories={categories} tags={tags} selectedTags={selectedTags} />
        </AuthenticatedLayout>
    );
};

export default EditBlog;
