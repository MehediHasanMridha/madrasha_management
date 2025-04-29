import StaticBtn from '@/Components/UI/StaticBtn';
import AddVoucherContainer from '@/Container/Finance/Outgoings/AddVoucherContainer';

const OutgoingComponent = ({ activeTab, setActiveTab, modal, setModal }) => {
    return (
        <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between rounded-lg bg-white p-6 shadow-md">
                    <p className="text-gray-600">Earnings management page is under development.</p>
                    <StaticBtn onClick={() => setModal(true)} className="hover:bg-[#48adff]">
                        Add Vouchers
                    </StaticBtn>
                </div>
            </div>
            <AddVoucherContainer modal={modal} setModal={setModal} />
        </div>
    );
};

export default OutgoingComponent;
