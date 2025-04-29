import { Tag } from 'antd';

const TagUI = ({ children, ...props }) => {
    return (
        <Tag
            color="blue"
            className=""
            style={{}}
            closable={false}
            onClose={() => {
                console.log('Tag closed');
            }}
            closeIcon={<span className="text-white">x</span>}
            bordered={false}
            {...props}
        >
            {children}
        </Tag>
    );
};

export default TagUI;
