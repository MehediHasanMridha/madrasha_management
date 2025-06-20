import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Edit, Plus, Search, Star, Trash2 } from 'lucide-react';
import { Button } from '../UI/button';
import { Card, CardContent } from '../UI/card';
import StaticBtn from '../UI/StaticBtn';

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
                                className="w-full rounded-md border border-gray-300 py-2 pr-3 pl-10 focus:outline-none"
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

                        <Button onClick={handleSearch} className="relative right-0">
                            Apply Filters
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-3">
                {blogs.data.map((blog) => (
                    <Card
                        key={blog.id}
                        className={cn(
                            'cursor-pointer overflow-hidden border-none shadow-none transition-all duration-200 hover:shadow-lg',
                            blog?.status === 'draft' && 'opacity-60',
                        )}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between gap-6">
                                {/* Left: Image and Content */}
                                <div className="flex flex-1 items-center gap-4">
                                    {/* Blog Image */}
                                    <div className="h-[150px] w-[150px] flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                        {blog.featured_image ? (
                                            <img
                                                src={getAvatarImage(blog.featured_image, 'blogs_images', blog.title)}
                                                alt={blog.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                                                <span className="text-xs text-gray-500">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-6 py-3">
                                        <div className="flex items-start gap-2">
                                            <h3
                                                className={cn(
                                                    'text-2xl leading-relaxed font-medium',
                                                    blog.status === 'draft' ? 'text-gray-400' : 'text-gray-900',
                                                )}
                                            >
                                                {blog.title}
                                            </h3>
                                            {blog.is_featured && <Star className="mt-1 h-5 w-5 flex-shrink-0 text-yellow-500" />}
                                        </div>
                                        <div
                                            className={cn(
                                                'flex items-center gap-3 text-base',
                                                blog.status === 'draft' ? 'text-gray-400' : 'text-gray-600',
                                            )}
                                        >
                                            <span>{formatDate(blog.published_at || blog.created_at)}</span>
                                            <span>|</span>
                                            <div className="flex items-center gap-3">
                                                <div className="h-[22px] w-[22px] overflow-hidden rounded-full bg-gray-300">
                                                    {blog.author?.avatar ? (
                                                        <img src={blog.author.avatar} alt={blog.author.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full bg-gray-400"></div>
                                                    )}
                                                </div>
                                                <span className="text-gray-600">{blog.author?.name || 'Unknown Author'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Right: Actions */}
                                <div className="flex items-center gap-8 pr-8">
                                    <div className="flex items-center">
                                        <div
                                            className={cn(
                                                'relative inline-flex h-6 w-[72px] rounded-lg transition-colors duration-200',
                                                blog.status === 'published' ? 'bg-green-500' : 'bg-gray-400',
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    'absolute top-[-2px] h-7 w-[18px] rounded-full border border-gray-200 bg-white shadow-sm transition-transform duration-200',
                                                    blog.status === 'published' ? 'translate-x-[54px]' : 'translate-x-0',
                                                )}
                                            ></div>
                                            <span
                                                className={cn(
                                                    'absolute inset-0 flex items-center justify-center text-[10px] font-normal text-white',
                                                    blog.status === 'published' ? 'pl-2' : 'pr-2',
                                                )}
                                            >
                                                {blog.status === 'published' ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Edit Button */}
                                    <Link href={route('blogs.edit', blog.slug)}>
                                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-100">
                                            <Edit className="h-5 w-5 text-gray-600" strokeWidth={1.5} />
                                        </Button>
                                    </Link>
                                    {/* Delete Button */}
                                    <Button variant="ghost" size="sm" onClick={() => handleDelete(blog.id)} className="h-6 w-6 p-0 hover:bg-gray-100">
                                        <Trash2 className="h-4 w-[18px] text-gray-600" strokeWidth={1.5} />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {blogs.data.length === 0 && (
                <Card className="border-none py-12 text-center shadow-none">
                    <CardContent>
                        <div className="space-y-4">
                            <div className="bg-muted mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                                <Search className="text-muted-foreground h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">No blog posts found</h3>
                                <p className="text-muted-foreground">
                                    {Object.values(filters).some((f) => f)
                                        ? 'Try adjusting your filters or search terms'
                                        : 'Get started by creating your first blog post'}
                                </p>
                            </div>
                            {!Object.values(filters).some((f) => f) && (
                                <Link href={route('blogs.create')}>
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create Your First Post
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Pagination */}
            {blogs.data.length > 0 && (
                <div className="flex items-center justify-between">
                    <div className="text-muted-foreground text-sm">
                        Showing {blogs.from} to {blogs.to} of {blogs.total} results
                    </div>
                    <div className="flex gap-2">
                        {blogs.prev_page_url && (
                            <Link href={blogs.prev_page_url}>
                                <Button variant="outline">Previous</Button>
                            </Link>
                        )}
                        {blogs.next_page_url && (
                            <Link href={blogs.next_page_url}>
                                <Button variant="outline">Next</Button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogsComponent;
