import { Link } from '@inertiajs/react';
import StaticBtn from '../UI/StaticBtn';

const BlogPagination = ({ blogs }) => {
    return (
        blogs.data.length > 0 && (
            <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm">
                    Showing {blogs.from} to {blogs.to} of {blogs.total} results
                </div>
                <div className="flex gap-2">
                    {blogs.prev_page_url && (
                        <Link href={blogs.prev_page_url}>
                            <StaticBtn variant="outline">Previous</StaticBtn>
                        </Link>
                    )}
                    {blogs.next_page_url && (
                        <Link href={blogs.next_page_url}>
                            <StaticBtn variant="outline">Next</StaticBtn>
                        </Link>
                    )}
                </div>
            </div>
        )
    );
};

export default BlogPagination;
