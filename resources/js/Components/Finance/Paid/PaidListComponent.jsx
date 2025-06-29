import PaidListTableContainer from '@/Container/Finance/Paid/PaidListTableContainer';
import FinanceTabBarComponent from '../FinanceTabBarComponent';

const PaidListComponent = () => {
    return (
        <>
            <FinanceTabBarComponent tab="paid_list" />
            <PaidListTableContainer />
        </>
    );
};

export default PaidListComponent;
