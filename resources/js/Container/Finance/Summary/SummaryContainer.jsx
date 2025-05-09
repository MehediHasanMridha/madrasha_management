import SummaryComponent from '@/Components/Finance/Summary/SummaryComponent';
import { router } from '@inertiajs/react';

const SummaryContainer = ({ data }) => {
    const remainingAmount =
        (data?.earnings ?? []).reduce((acc, { amount }) => acc + Number(amount), 0) -
        (data?.expenses ?? []).reduce((acc, { amount }) => acc + Number(amount), 0);
    const getData = (month, year) => {
        router.get(
            route('finance.summary'),
            {
                month,
                year,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };
    return <SummaryComponent data={data} getData={getData} remainingAmount={remainingAmount} />;
};

export default SummaryContainer;
