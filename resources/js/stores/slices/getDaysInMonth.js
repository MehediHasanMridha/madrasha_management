import dayjs from "dayjs";

export const getDaysInMonth = (set) => ({
    daysInMonth: 0,
    month: null,
    setDaysInMonth: (year, month) => {
        // Check if the month is valid (0-11)
        if (month < 1 || month > 12) {
            throw new Error('Invalid month. Month should be between 1 and 12.');
        }
        // Check if the year is valid
        if (year < 0) {
            throw new Error('Invalid year. Year should be a positive number.');
        }
        // convert month number to month name
        const monthName = dayjs().month(month - 1).format('MMMM');
        // convert year and month to 'YYYY-MM-DD' format
        const formattedDate = `${year}-${String(month).padStart(2, '0')}`;
        const days = dayjs(formattedDate).daysInMonth();
        // Set the state with the number of days
        set({ daysInMonth: days, month: monthName });
    },
});
