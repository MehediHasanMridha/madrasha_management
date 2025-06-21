import { Link } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { Card, CardContent } from '../UI/card';
import StaticBtn from '../UI/StaticBtn';

const BlogEmptyComponent = ({ blogs, filters }) => {
    return (
        blogs.data.length === 0 && (
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
                                <StaticBtn>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Your First Post
                                </StaticBtn>
                            </Link>
                        )}
                    </div>
                </CardContent>
            </Card>
        )
    );
};

export default BlogEmptyComponent;
