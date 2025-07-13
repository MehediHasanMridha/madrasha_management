import StaticBtn from '@/Components/UI/StaticBtn';
import TagUI from '@/Components/UI/TagUI';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Edit, Eye, GripVertical, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';
const WelcomePageSortableContentItemContainer = ({ content, index, onEdit, onDelete, onPreview }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: content.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const getSectionTypeLabel = (sectionKey) => {
        const labels = {
            hero: 'Hero Section',
            notice: 'Notice Banner',
            stats: 'Statistics',
            curriculum: 'Curriculum',
            custom: 'Custom Section',
        };
        return labels[sectionKey] || 'Custom Section';
    };

    const getSectionTypeColor = (sectionKey) => {
        const colors = {
            hero: '#0000ff',
            notice: '#daa520',
            stats: '#008000',
            curriculum: '#c71585',
            custom: '#708090',
        };
        return colors[sectionKey] || '#708090';
    };

    const getContentPreview = (content) => {
        if (content.content) {
            return content.content.length > 100 ? content.content.substring(0, 100) + '...' : content.content;
        }

        if (content.data) {
            if (content.section_key === 'stats' && content.data.stats) {
                return `${content.data.stats.length} statistics items`;
            }
            if (content.section_key === 'curriculum' && content.data.pillars) {
                return `${content.data.pillars.length} curriculum pillars`;
            }
        }

        return 'No content preview available';
    };

    return (
        <div ref={setNodeRef} style={style} className="my-3 rounded-lg bg-white p-6 transition-colors hover:bg-gray-50">
            <div className="flex items-center space-x-4">
                {/* Drag Handle */}
                <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:cursor-grabbing hover:text-gray-600">
                    <GripVertical className="h-5 w-5" />
                </div>

                {/* Content Info */}
                <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center space-x-3">
                        <TagUI
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getSectionTypeColor(content.section_key)}`}
                            color={getSectionTypeColor(content.section_key)}
                        >
                            {getSectionTypeLabel(content.section_key)}
                        </TagUI>
                        <div className="flex items-center">
                            {content.is_active ? (
                                <ToggleRight className="h-6 w-6 text-green-500" />
                            ) : (
                                <ToggleLeft className="h-6 w-6 text-gray-400" />
                            )}
                            <span className={`ml-1 text-sm ${content.is_active ? 'text-green-600' : 'text-gray-500'}`}>
                                {content.is_active ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>

                    <h3 className="truncate text-lg font-medium text-gray-900">{content.title || `Section ${index + 1}`}</h3>

                    <p className="mt-1 text-sm text-gray-500">{getContentPreview(content)}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                    <StaticBtn
                        onClick={() => {
                            onPreview(content);
                        }}
                        className="w-fit bg-transparent p-2 text-gray-400 transition-colors hover:bg-transparent hover:text-blue-600"
                        title="Preview"
                    >
                        <Eye className="h-4 w-4" />
                    </StaticBtn>

                    <StaticBtn
                        onClick={() => {
                            onEdit(content);
                        }}
                        className="w-fit bg-transparent p-2 text-gray-400 transition-colors hover:bg-transparent hover:text-blue-600"
                        title="Edit"
                    >
                        <Edit className="h-4 w-4" />
                    </StaticBtn>

                    <StaticBtn
                        onClick={() => {
                            if (confirm('Are you sure you want to delete this section?')) {
                                onDelete(content.id);
                            }
                        }}
                        className="w-fit bg-transparent p-2 text-gray-400 transition-colors hover:bg-transparent hover:text-red-600"
                        title="Delete"
                    >
                        <Trash2 className="h-4 w-4" />
                    </StaticBtn>
                </div>
            </div>
        </div>
    );
};

export default WelcomePageSortableContentItemContainer;
