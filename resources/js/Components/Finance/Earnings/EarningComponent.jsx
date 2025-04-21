import StaticBtn from '@/Components/UI/StaticBtn';
import AddMoneyContainer from '@/Container/Finance/Earnings/AddMoneyContainer';
import TabBarContainer from '@/Container/Finance/TabBarContainer';

const EarningComponent = ({ activeTab, setActiveTab, modal, setModal }) => {
    return (
        <>
            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <TabBarContainer activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="flex justify-between rounded-lg bg-white p-6 shadow-md">
                        <p className="text-gray-600">Earnings management page is under development.</p>
                        <StaticBtn onClick={() => setModal(true)} className="hover:bg-[#48adff]">
                            Add Money
                        </StaticBtn>
                    </div>
                </div>
            </div>
            <AddMoneyContainer modal={modal} setModal={setModal} />
        </>
    );
};

export default EarningComponent;
