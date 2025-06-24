import { Link } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { Card, CardContent } from '../UI/card';
import StaticBtn from '../UI/StaticBtn';
import BlogEmptyComponent from './BlogEmptyComponent';
import BlogItemsComponent from './BlogItemsComponent';
import BlogPagination from './BlogPagination';

const BlogsComponent = ({
    search,
    setSearch,
    handleSearch,
    selectedCategory,
    setSelectedCategory,
    blogs,
    formatDate,
    filters,
    setSelectedStatus,
    handleDelete,
}) => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Blog Posts</h1>
                    <p className="text-muted-foreground">Manage your blog posts and content</p>
                </div>
                <Link href={route('blogs.create')}>
                    <StaticBtn className="flex items-center gap-2 text-white hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Post
                    </StaticBtn>
                </Link>
            </div>

            {/* Filters */}
            <Card className="rounded-lg border-none bg-white p-6 shadow-none">
                <CardContent className="w-full p-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                        <div className="relative">
                            <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search posts..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-md border border-gray-300 py-3 pr-3 pl-10 focus:outline-none"
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>

                        {/* <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">All Categories</option>
                        </select> */}

                        {/* <select
                            value=""
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">All Tags</option>
                        </select> */}

                        <select
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
                        >
                            <option value="">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="scheduled">Scheduled</option>
                        </select>

                        <StaticBtn onClick={handleSearch} className="relative right-0 cursor-pointer hover:bg-blue-600">
                            Apply Filters
                        </StaticBtn>
                    </div>
                </CardContent>
            </Card>

            <BlogItemsComponent blogs={blogs} formatDate={formatDate} handleDelete={handleDelete} />

            {/* Empty State */}
            <BlogEmptyComponent blogs={blogs} filters={filters} />

            {/* Pagination */}
            <BlogPagination blogs={blogs} />
        </div>
    );
};

export default BlogsComponent;
