import { getAvatarImage } from '@/lib/avatarImageUrlUtils';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Edit, Star, Trash2 } from 'lucide-react';
import { Card, CardContent } from '../UI/card';

const BlogItemsComponent = ({ blogs, formatDate, handleDelete }) => {
    return (
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
                                            src={getAvatarImage(blog.featured_image, 'blog_images', blog.title)}
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
                                    <Edit className="h-5 w-5 text-gray-600" strokeWidth={1.5} />
                                </Link>
                                {/* Delete Button */}
                                <Trash2 className="h-4 w-[18px] text-gray-600" strokeWidth={1.5} onClick={() => handleDelete(blog.id)} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default BlogItemsComponent;
