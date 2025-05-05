const MonthYearComponent = ({ months, setMonth, years, setYear, month, year, getData }) => {
    return (
        <span className="flex items-center gap-2">
            <select
                className="w-fit rounded-[4px] border-[1px] border-[#AFAFAF] px-[8px] py-[4px] text-black focus:outline-0"
                value={month}
                onChange={(e) => {
                    setMonth(e.target.value);
                    getData(e.target.value, year);
                }}
            >
                <option disabled>Month</option>
                {months.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <select
                className="w-fit rounded-[4px] border-[1px] border-[#AFAFAF] px-[8px] py-[4px] text-black focus:outline-0"
                value={year}
                onChange={(e) => {
                    setYear(e.target.value);
                    getData(month, e.target.value);
                }}
            >
                <option disabled>Year</option>
                {years.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </span>
    );
};

export default MonthYearComponent;
