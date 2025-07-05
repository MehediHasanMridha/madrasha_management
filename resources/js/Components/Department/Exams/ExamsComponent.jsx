import ExamCard from './ExamCard';

const ExamsComponent = ({ exams, yearFilter, availableYears, handleYearChange, department }) => {
    return (
        <>
            {/* Year Filter Section */}
            <div className="my-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <label htmlFor="year-filter" className="text-sm font-medium text-gray-700">
                        Filter by Year:
                    </label>
                    <select
                        id="year-filter"
                        value={yearFilter}
                        onChange={(e) => handleYearChange(e.target.value)}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    >
                        <option value="all">All Years</option>
                        {availableYears.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="text-sm text-gray-500">
                    {exams.length} exam{exams.length !== 1 ? 's' : ''} found
                </div>
            </div>

            {/* Exams Section */}
            <div className="my-[16px] grid grid-cols-1 gap-[12px]">
                {exams && exams.length > 0 ? (
                    exams.map((exam) => (
                        <ExamCard
                            key={exam.id}
                            exam={exam}
                            examName={exam.name}
                            date={new Date(exam.start_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                            status={exam.display_status}
                            timeLeft={exam.time_left}
                            department={department}
                        />
                    ))
                ) : (
                    <div className="py-8 text-center text-gray-500">
                        <p>No exams scheduled for {yearFilter === 'all' ? 'any year' : yearFilter}.</p>
                        <p className="mt-2 text-sm">
                            {yearFilter === 'all'
                                ? 'Click "Create exam" to add your first exam.'
                                : `Try selecting a different year or click "Create exam" to add an exam for ${yearFilter}.`}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default ExamsComponent;
