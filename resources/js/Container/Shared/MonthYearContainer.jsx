import MonthYearComponent from '@/Components/Shared/MonthYearComponent';
import { useState } from 'react';

const MonthYearContainer = ({ getData = () => {} }) => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const years = ['2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035'];
    return <MonthYearComponent months={months} setMonth={setMonth} years={years} setYear={setYear} month={month} year={year} getData={getData} />;
};

export default MonthYearContainer;
