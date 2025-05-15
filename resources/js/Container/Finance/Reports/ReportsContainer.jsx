import ReportsComponent from '@/Components/Finance/Reports/ReportsComponent';
import { useBoundStore } from '@/stores';
import { useState } from 'react';

const ReportsContainer = () => {
    const [month, setMonth] = useState([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]);

    const setDaysInMonth = useBoundStore((state) => state.setDaysInMonth);

    const [currentMonth, setCurrMonth] = useState(new Date().getMonth() + 1);

    return <ReportsComponent month={month} currentMonth={currentMonth} setDaysInMonth={setDaysInMonth} />;
};

export default ReportsContainer;
