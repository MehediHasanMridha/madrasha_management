import StaticBtn from '@/Components/UI/StaticBtn';
import AddMoneyContainer from '@/Container/Finance/Earnings/AddMoneyContainer';
import FinanceTabBarComponent from '../FinanceTabBarComponent';

const EarningComponent = ({ modal, setModal }) => {
    return (
        <>
            <div className="py-6">
                <FinanceTabBarComponent tab="earnings" />
                <div className="flex justify-between rounded-lg bg-white p-6">
                    <p className="text-gray-600">Earnings management page is under development.</p>
                    <StaticBtn onClick={() => setModal(true)} className="hover:bg-[#48adff]">
                        Add Money
                    </StaticBtn>
                </div>
            </div>
            <AddMoneyContainer modal={modal} setModal={setModal} />
        </>
    );
};

export default EarningComponent;
