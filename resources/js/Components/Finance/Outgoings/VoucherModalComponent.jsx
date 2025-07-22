import Confirmpop from '@/Components/UI/Confirmpop';
import ModalUI from '@/Components/UI/ModalUI';
import StaticBtn from '@/Components/UI/StaticBtn';
import VoucherBorder from '@/assets/images/VoucherBorderBlue.png';
import { usePage } from '@inertiajs/react';
import { Trash2, X } from 'lucide-react';

const VoucherModalComponent = ({
    isModalOpen = false,
    handleOk = () => {},
    handleCancel = () => {},
    data,
    confirmLoading = false,
    open,
    setOpen,
    handlePOPCancel,
    HandleDelete,
    ...props
}) => {
    const { auth } = usePage().props;
    return (
        <ModalUI
            isModalOpen={isModalOpen}
            footer={false}
            width={500}
            closeIcon={false}
            title={false}
            styles={{
                content: {
                    color: 'red',
                    background: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    padding: 0,
                },
            }}
        >
            <div className="relative bg-white">
                <div className="absolute top-4 -right-18 space-y-[16px]">
                    <StaticBtn className="w-fit rounded-full bg-red-600 p-2 hover:bg-red-700" onClick={handleCancel}>
                        <X strokeWidth={1.5} size={24} className="text-white" />
                    </StaticBtn>
                    {auth.permissions.viewAny && (
                        <StaticBtn className="w-fit rounded-full bg-white p-2 shadow-md hover:bg-gray-100">
                            <Confirmpop
                                open={open}
                                handleOk={() => {
                                    HandleDelete(data);
                                    setOpen(false);
                                }}
                                handleCancel={handlePOPCancel}
                                title="Are you sure You want to Delete this voucher?"
                                icon={<Trash2 size={24} strokeWidth={1.5} className="text-red-500" />}
                                loading={confirmLoading}
                                description="This action will unassign the teacher."
                                okText="Delete"
                                cancelText="Cancel"
                            >
                                <Trash2
                                    size={24}
                                    strokeWidth={1.5}
                                    className="text-red-500"
                                    onClick={() => {
                                        setOpen(true);
                                    }}
                                />
                            </Confirmpop>
                        </StaticBtn>
                    )}
                </div>

                {/* Header with wavy bottom */}
                <div className="bg-[#0267FF] p-4 text-white">
                    <div className="mb-2 flex items-center justify-between">
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium text-white">{data?.holder_name}</h3>
                            {new Date(data?.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </div>
                        <span className="text-xs text-white">
                            <p className="w-fit items-center rounded-2xl border border-white px-[8px] py-[4px] text-xs text-white">
                                {data?.voucher_type?.name}
                            </p>
                        </span>
                    </div>
                    <div className="absolute -top-1 right-0 left-0">
                        <img src={VoucherBorder} alt="" />
                    </div>
                </div>

                {/* Expense Items */}
                <div className="p-4">
                    <div className="h-[400px] space-y-4">
                        {data &&
                            JSON.parse(data?.details)?.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-gray-700">{item.name}</span>
                                    <span className="font-medium text-gray-900">
                                        {Number(item.amount).toLocaleString('bn', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}{' '}
                                        টাকা
                                    </span>
                                </div>
                            ))}
                    </div>

                    {/* Total */}
                    <div className="mt-6 border-t pt-4">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-700">Total :</span>
                            <span className="font-semibold text-gray-900">{Number(data?.amount).toLocaleString('bn')} টাকা</span>
                        </div>
                    </div>

                    {/* Comment Section */}
                    <div className="mt-6">
                        <h3 className="mb-2 text-gray-600">Comment</h3>
                        <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-gray-700">{data?.note}</p>
                        </div>
                    </div>
                </div>
            </div>
        </ModalUI>
    );
};

export default VoucherModalComponent;
