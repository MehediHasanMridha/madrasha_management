import VoucherBorder from '@/assets/images/VoucherBorder.png';
import StaticBtn from '@/Components/UI/StaticBtn';
import AddVoucherContainer from '@/Container/Finance/Outgoings/AddVoucherContainer';
import FinanceTabBarComponent from '../FinanceTabBarComponent';

const OutgoingComponent = ({ activeTab, setActiveTab, modal, setModal, outgoings, voucherList }) => {
    return (
        <div className="py-6">
            <FinanceTabBarComponent tab="outgoings" />
            <div className="mt-6 flex justify-between rounded-lg bg-white p-6">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-gray-900">Outgoing Management</h2>
                </div>

                <StaticBtn onClick={() => setModal(true)} className="hover:bg-[#48adff]">
                    Add Voucher
                </StaticBtn>
            </div>

            {/* Summary Cards */}
            <div className="my-6 grid grid-cols-4 gap-4">
                {outgoings.map((outgoing, index) => (
                    <div key={index} className="relative rounded-lg bg-white p-6 shadow">
                        <h3 className="border-b pb-2 text-base text-gray-900">{outgoing?.type}</h3>
                        <p className="mt-4 text-[2.5rem] leading-none font-medium text-gray-900">{Number(outgoing?.amount).toLocaleString()} BDT</p>
                        <p className="mt-2 text-sm text-gray-600">Total expenses</p>
                    </div>
                ))}
            </div>

            {/* Vouchers Section */}
            <div className="space-y-5 rounded-[8px] border-[1px] border-[#AFAFAF] p-6">
                <h2 className="mb-4 text-base font-medium text-gray-900">Vouchers</h2>
                <hr className="h-[2px] bg-[#AFAFAF]" />
                <div className="grid grid-cols-3 gap-4">
                    {voucherList.map((voucher, index) => (
                        <div key={index} className="rounded-lg bg-white shadow-lg">
                            <div className="h-fit w-full">
                                <img src={VoucherBorder} alt="" className="w-full" />
                                <div className="flex items-center justify-between bg-[#FF8848] px-[16px] py-[8px]">
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium text-white">{voucher?.holder_name}</h3>
                                        <p className="w-fit rounded-2xl border border-white px-[4px] text-xs text-white">
                                            {voucher?.voucher_type?.name}
                                        </p>
                                    </div>
                                    <span className="text-xs text-white">
                                        {new Date(voucher?.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 pt-5">
                                <div className="mt-3">
                                    {JSON.parse(voucher?.details)
                                        ?.slice(0, 1)
                                        .map((detail, index) => (
                                            <div key={index} className="mt-2 flex items-center justify-between">
                                                <p className="text-sm text-gray-500">{detail?.name}</p>
                                                <p className="text-sm font-medium text-gray-500">{Number(detail?.amount).toLocaleString()} BDT</p>
                                            </div>
                                        ))}
                                    {JSON.parse(voucher?.details)?.length > 1 && (
                                        <div className="mt-2 flex items-center justify-between">
                                            <p className="text-sm text-gray-500">And +{JSON.parse(voucher?.details)?.length - 1} more</p>
                                            <p className="text-sm font-medium text-gray-500">
                                                {Number(
                                                    JSON.parse(voucher?.details)
                                                        ?.slice(1, JSON.parse(voucher?.details)?.length)
                                                        ?.reduce((a, b) => a + Number(b?.amount), 0),
                                                ).toLocaleString()}{' '}
                                                BDT
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 border-t pt-3">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-600">Total :</p>
                                        <p className="text-sm font-semibold text-gray-900">{Number(voucher?.amount).toLocaleString()} BDT</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AddVoucherContainer modal={modal} setModal={setModal} />
        </div>
    );
};

export default OutgoingComponent;
