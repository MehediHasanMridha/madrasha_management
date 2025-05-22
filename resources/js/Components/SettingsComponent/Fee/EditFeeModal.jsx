import { router } from '@inertiajs/react';
import { Button, Form, Input, InputNumber, Modal } from 'antd';
import { useEffect, useState } from 'react';

const EditFeeModal = ({ open, setOpen, editData }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editData) {
            form.setFieldsValue({
                name: editData.name,
                value: parseFloat(editData.value),
            });
        }
    }, [editData, form]);

    const handleSubmit = (values) => {
        setLoading(true);

        // Here you would handle the form submission with your actual route
        // This is a placeholder implementation
        router.put(route('fee.update', editData?.id), values, {
            onSuccess: () => {
                setLoading(false);
                setOpen(false);
            },
            onError: () => {
                setLoading(false);
            },
        });
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Modal title="Edit Fee" open={open} onCancel={handleCancel} footer={null} maskClosable={false}>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item name="name" label="Fee Name" rules={[{ required: true, message: 'Please enter the fee name' }]}>
                    <Input placeholder="Enter fee name" />
                </Form.Item>

                <Form.Item name="value" label="Fee Amount" rules={[{ required: true, message: 'Please enter the fee amount' }]}>
                    <InputNumber style={{ width: '100%' }} placeholder="Enter amount" addonAfter="BDT" />
                </Form.Item>

                <Form.Item className="mb-0 flex justify-end">
                    <div className="flex gap-2">
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Update Fee
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditFeeModal;
