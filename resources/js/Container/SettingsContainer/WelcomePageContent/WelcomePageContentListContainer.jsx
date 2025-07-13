import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { router } from '@inertiajs/react';
import { notification } from 'antd';
import WelcomePageSortableContentItemContainer from './WelcomePageSortableContentItemContainer';
const WelcomePageContentListContainer = ({ contents, setEditingContent, handleDeleteContent, setPreviewContent, setWelcomeContents }) => {
    const handleOrderUpdate = (items) => {
        const orderedItems = items.map((item, index) => ({
            id: item.id,
            sort_order: index,
        }));
        router.post(
            route('settings.welcome-page.update-order'),
            {
                items: orderedItems,
            },
            {
                preserveScroll: true,
                onStart: () => {
                    setWelcomeContents(items);
                },
                onSuccess: () => {
                    // setWelcomeContents(items);
                    notification.success({
                        message: 'Order Updated',
                        description: 'The order of the welcome page contents has been updated successfully.',
                        placement: 'bottomRight',
                    });
                },
            },
        );
    };
    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = contents.findIndex((item) => item.id === active.id);
            const newIndex = contents.findIndex((item) => item.id === over.id);

            const newOrder = arrayMove(contents, oldIndex, newIndex);
            handleOrderUpdate(newOrder);
        }
    };
    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={contents.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3 bg-transparent">
                    {contents.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            <p>No content sections yet. Add your first section to get started.</p>
                        </div>
                    ) : (
                        contents.map((content, index) => (
                            <WelcomePageSortableContentItemContainer
                                key={content.id}
                                content={content}
                                index={index}
                                onEdit={setEditingContent}
                                onDelete={handleDeleteContent}
                                onPreview={setPreviewContent}
                            />
                        ))
                    )}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default WelcomePageContentListContainer;
