import StaticBtn from '@/Components/UI/StaticBtn';
import AddVoucherContainer from '@/Container/Finance/Outgoings/AddVoucherContainer';
import FinanceTabBarComponent from '../FinanceTabBarComponent';

const OutgoingComponent = ({ activeTab, setActiveTab, modal, setModal }) => {
    return (
        <div className="py-6">
            <FinanceTabBarComponent tab="outgoings" />
            <div className="flex justify-between rounded-lg bg-white p-6">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-gray-900">Outgoing Management</h2>
                </div>
                <StaticBtn onClick={() => setModal(true)} className="hover:bg-[#48adff]">
                    Add Voucher
                </StaticBtn>
            </div>
            <AddVoucherContainer modal={modal} setModal={setModal} />
        </div>
    );
};

export default OutgoingComponent;
