import { cn } from '@/lib/utils';
import JoditEditor from 'jodit-react';
import React, { useCallback, useMemo, useRef } from 'react';

const SimpleRichTextEditor = React.forwardRef(
    ({ className, value = '', onChange, placeholder = 'Start typing...', height = 300, readOnly = false, config = {}, ...props }, ref) => {
        const editor = useRef(null);

        // Simplified configuration for basic rich text editing
        const defaultConfig = useMemo(
            () => ({
                readonly: readOnly,
                placeholder: placeholder,
                height: height,
                theme: 'default',

                // Simple toolbar with essential features only
                buttons: [
                    'bold',
                    'italic',
                    'underline',
                    '|',
                    'font',
                    'fontsize',
                    '|',
                    'ul',
                    'ol',
                    '|',
                    'align',
                    '|',
                    'link',
                    'unlink',
                    '|',
                    'undo',
                    'redo',
                    '|',
                    'fullsize',
                ],

                // Mobile-friendly buttons
                buttonsMD: ['bold', 'italic', 'underline', '|', 'ul', 'ol', '|', 'link', '|', 'undo', 'redo'],

                buttonsSM: ['bold', 'italic', '|', 'ul', 'ol', '|', 'link'],

                buttonsXS: ['bold', 'italic', '|', 'ul', 'ol'],

                // Basic settings
                showCharsCounter: false,
                showWordsCounter: false,
                showXPathInStatusbar: false,
                toolbarAdaptive: true,
                toolbarSticky: false,

                // Disable advanced features
                imageEditor: false,
                filebrowser: {
                    ajax: {
                        url: '',
                    },
                },

                // Simple paste handling
                askBeforePasteHTML: false,
                askBeforePasteFromWord: false,
                processPasteHTML: true,

                // Basic link settings
                link: {
                    followOnDblClick: false,
                    openInNewTabCheckbox: true,
                },

                // Simplified controls
                controls: {
                    font: {
                        list: {
                            Arial: 'Arial,Helvetica,sans-serif',
                            Georgia: 'Georgia,serif',
                            'Times New Roman': 'Times New Roman,Times,serif',
                            Verdana: 'Verdana,Geneva,sans-serif',
                        },
                    },
                    paragraph: {
                        list: {
                            Normal: 'p',
                            'Heading 1': 'h1',
                            'Heading 2': 'h2',
                            'Heading 3': 'h3',
                        },
                    },
                },

                ...config,
            }),
            [readOnly, placeholder, height, config],
        );

        const handleChange = useCallback(
            (newContent) => {
                if (onChange) {
                    onChange(newContent);
                }
            },
            [onChange],
        );

        return (
            <div className={cn('simple-rich-text-editor-wrapper', className)}>
                <JoditEditor ref={editor} value={value} config={defaultConfig} onBlur={handleChange} onChange={handleChange} {...props} />
            </div>
        );
    },
);

SimpleRichTextEditor.displayName = 'SimpleRichTextEditor';

export { SimpleRichTextEditor };
