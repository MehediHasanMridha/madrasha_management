import { cn } from '@/lib/utils';
import JoditEditor from 'jodit-react';
import React, { useCallback, useMemo, useRef } from 'react';

const RichTextEditor = React.forwardRef(
    (
        {
            className,
            value = '',
            onChange,
            placeholder = 'Start typing...',
            height = 400,
            readOnly = false,
            theme = 'default',
            config = {},
            ...props
        },
        ref,
    ) => {
        const editor = useRef(null);

        // Comprehensive Jodit configuration with all features
        const defaultConfig = useMemo(
            () => ({
                readonly: readOnly,
                placeholder: placeholder,
                height: height,
                theme: theme,

                // Toolbar configuration with all features
                buttons: [
                    'source',
                    '|',
                    'bold',
                    'italic',
                    'underline',
                    'strikethrough',
                    '|',
                    'superscript',
                    'subscript',
                    '|',
                    'font',
                    'fontsize',
                    'brush',
                    '|',
                    'paragraph',
                    'lineHeight',
                    '|',
                    'ul',
                    'ol',
                    '|',
                    'outdent',
                    'indent',
                    '|',
                    'align',
                    '|',
                    'undo',
                    'redo',
                    '|',
                    'hr',
                    'eraser',
                    'copyformat',
                    '|',
                    'symbol',
                    'fullsize',
                    '|',
                    'print',
                    'about',
                    '|',
                    'table',
                    '|',
                    'link',
                    'unlink',
                    '|',
                    'image',
                    'video',
                    '|',
                    'cut',
                    'copy',
                    'paste',
                    'selectall',
                    '|',
                    'search',
                    'find',
                    '|',
                    'spellcheck',
                    '|',
                    'speechRecognition',
                ],

                // Button groups for better organization
                buttonsMD: [
                    'bold',
                    'italic',
                    'underline',
                    '|',
                    'font',
                    'fontsize',
                    '|',
                    'paragraph',
                    '|',
                    'ul',
                    'ol',
                    '|',
                    'align',
                    '|',
                    'undo',
                    'redo',
                    '|',
                    'link',
                    'image',
                    '|',
                    'fullsize',
                ],

                buttonsSM: ['bold', 'italic', '|', 'font', '|', 'ul', 'ol', '|', 'undo', 'redo', '|', 'link', 'image'],

                buttonsXS: ['bold', 'italic', '|', 'ul', 'ol', '|', 'undo', 'redo'],

                // Enhanced editing features
                editHTMLDocumentMode: true,
                processPasteHTML: true,
                processPasteFromWord: true,
                askBeforePasteHTML: false,
                askBeforePasteFromWord: false,

                // Advanced features
                showCharsCounter: true,
                showWordsCounter: true,
                showXPathInStatusbar: false,

                // Image upload and handling
                uploader: {
                    insertImageAsBase64URI: true,
                    imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'],
                    filesVariableName: 'files',
                    withCredentials: false,
                    pathVariableName: 'path',
                    format: 'json',
                    method: 'POST',
                },

                // File browser
                filebrowser: {
                    ajax: {
                        url: '/api/file-browser',
                    },
                    height: 400,
                },

                // Image editor
                imageEditor: {
                    width: 500,
                    height: 500,
                    crop: true,
                    resize: true,
                    resizeUseRatio: true,
                    resizeMinSize: [10, 10],
                    cropUseRatio: true,
                    cropDefaultWidth: '70%',
                    cropDefaultHeight: '70%',
                },

                // Video settings
                video: {
                    width: 400,
                    height: 345,
                },

                // Link settings
                link: {
                    followOnDblClick: false,
                    processVideoLink: true,
                    processPasteLink: true,
                    noFollowCheckbox: true,
                    openInNewTabCheckbox: true,
                },

                // Table settings
                table: {
                    selectionCellStyle: 'border: 1px double #1e88e5;',
                    useExtraClassesOptions: false,
                },

                // Paste settings
                paste: {
                    htmlTagsWhitelist:
                        'p,br,strong,b,i,em,u,s,del,ins,h1,h2,h3,h4,h5,h6,ul,ol,li,blockquote,a,img,table,thead,tbody,tr,td,th,div,span,pre,code',
                    keepImagesInPaste: true,
                },

                // Spell check
                spellcheck: true,

                // Auto-save (if needed)
                // saveHeartbeat: 5000,

                // Responsive
                toolbarAdaptive: true,
                toolbarSticky: true,
                toolbarStickyOffset: 100,

                // Internationalization
                language: 'en',

                // Custom CSS
                iframe: false,
                iframeStyle: '',
                iframeCSSLinks: [],

                // Security
                safeMode: false,

                // Events
                events: {
                    afterInit: function (editor) {
                        // Custom initialization logic
                    },
                },

                // Custom styles
                controls: {
                    font: {
                        list: {
                            Arial: 'Arial,Helvetica,sans-serif',
                            Georgia: 'Georgia,serif',
                            Impact: 'Impact,Charcoal,sans-serif',
                            Tahoma: 'Tahoma,Geneva,sans-serif',
                            'Times New Roman': 'Times New Roman,Times,serif',
                            Verdana: 'Verdana,Geneva,sans-serif',
                            'Courier New': 'Courier New,Courier,monospace',
                            'Comic Sans MS': 'Comic Sans MS,cursive',
                            Palatino: 'Palatino Linotype,Book Antiqua,Palatino,serif',
                            Helvetica: 'Helvetica Neue,Helvetica,Arial,sans-serif',
                        },
                    },
                    paragraph: {
                        list: {
                            Normal: 'p',
                            'Heading 1': 'h1',
                            'Heading 2': 'h2',
                            'Heading 3': 'h3',
                            'Heading 4': 'h4',
                            'Heading 5': 'h5',
                            'Heading 6': 'h6',
                            Blockquote: 'blockquote',
                            Code: 'pre',
                        },
                    },
                },

                // Custom toolbar styling
                style: {
                    '& .jodit-toolbar': {
                        backgroundColor: '#f8f9fa',
                        borderBottom: '1px solid #e9ecef',
                    },
                    '& .jodit-workplace': {
                        backgroundColor: '#ffffff',
                    },
                },

                ...config,
            }),
            [readOnly, placeholder, height, theme, config],
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
            <div className={cn('rich-text-editor-wrapper', className)}>
                <JoditEditor ref={editor} value={value} config={defaultConfig} onBlur={handleChange} onChange={handleChange} {...props} />
            </div>
        );
    },
);

export default RichTextEditor;
