import coming_soon from '@/assets/images/coming_soon.svg';
import StaticBtn from '@/Components/UI/StaticBtn';
import AddMoneyContainer from '@/Container/Finance/Earnings/AddMoneyContainer';
import FinanceTabBarComponent from '../FinanceTabBarComponent';
const EarningComponent = ({ modal, setModal }) => {
    return (
        <>
            <div className="py-6">
                <FinanceTabBarComponent tab="earnings" />
                <div className="flex justify-end rounded-lg bg-white p-6">
                    <StaticBtn onClick={() => setModal(true)} className="hover:bg-[#48adff]">
                        Add Money
                    </StaticBtn>
                </div>
                <div className="mt-6 flex h-screen flex-col items-center justify-center rounded-lg bg-white p-6">
                    <img src={coming_soon} alt="" className="h-fit" />
                    <h2 className="mt-4 text-xl font-semibold text-gray-900">Coming Soon</h2>
                    <p className="mt-2 text-sm text-gray-600">We are working hard to bring you this feature.</p>
                </div>
            </div>
            <AddMoneyContainer modal={modal} setModal={setModal} />
        </>
    );
};

export default EarningComponent;
