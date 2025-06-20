import BreadcrumbUI from '@/Components/UI/BreadcrumbUI';
import CreateBlogContainer from '@/Container/Blog/CreateBlogContainer';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const CreateBlog = () => {
    return (
        <AuthenticatedLayout>
            <Head title="Create Blog" />
            <div className="my-4">
                <BreadcrumbUI items={[{ title: <Link href={route('blogs.index')}>Blogs</Link> }, { title: 'Create Blog', active: true }]} />
            </div>
            <CreateBlogContainer />
        </AuthenticatedLayout>
    );
};

export default CreateBlog;
