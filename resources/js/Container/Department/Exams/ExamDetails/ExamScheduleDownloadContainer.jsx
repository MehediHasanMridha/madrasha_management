import SchedulePrintComponent from '@/Components/Shared/SchedulePrintComponent';
import { useCallback, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const ExamScheduleDownloadContainer = ({ exam, examSubjects, isDownload, setIsDownload }) => {
    if (!exam || !examSubjects || examSubjects.length === 0) {
        return null; // Return null if no exam or subjects are available
    }

    const classes = exam?.classes.map((classItem) => {
        return {
            id: classItem.id,
            name: classItem.name,
        };
    });
    const ref = useRef(null);

    const handleAfterPrint = useCallback(() => {
        console.log('Print completed, resetting download state');
        if (setIsDownload) {
            setIsDownload(false);
        }
    }, [setIsDownload]);

    const handleBeforePrint = useCallback(() => {
        console.log('Print starting');
        return Promise.resolve();
    }, []);

    const printFn = useReactToPrint({
        contentRef: ref,
        documentTitle: `Exam_Schedule_${exam?.name}_${new Date().toISOString().split('T')[0]}`,
        onAfterPrint: handleAfterPrint,
        onBeforePrint: handleBeforePrint,
        pageStyle: `
            @media print {
                @page {
                    size: A5;
                    margin: 32px;
                }
                body {
                    font-size: 12px;
                    margin: 0;
                    padding: 0;
                    line-height: 1.2;
                }
            }
        `,
    });

    useEffect(() => {
        if (isDownload) {
            printFn();
        }
    }, [isDownload, printFn]);

    const examSchedule = examSubjects?.map((subject) => {
        return {
            id: subject.id,
            subject: subject.name,
            date:
                subject.exam_subjects?.length > 0
                    ? new Date(subject.exam_subjects[0].exam_date).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                      })
                    : 'dd/mm/yyyy',
            time:
                subject.exam_subjects?.length > 0
                    ? (() => {
                          const startTime = subject.exam_subjects[0].start_time;
                          const endTime = subject.exam_subjects[0].end_time;

                          // Convert time strings to Date objects for proper formatting
                          const startDate = new Date(`1970-01-01T${startTime}`);
                          const endDate = new Date(`1970-01-01T${endTime}`);

                          const formattedStartTime = startDate.toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true,
                          });

                          const formattedEndTime = endDate.toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true,
                          });

                          return `${formattedStartTime} - ${formattedEndTime}`;
                      })()
                    : '--:--  - --:--',
        };
    });

    // Helper function to convert English numbers to Bengali numbers
    const getBengaliNumber = (num) => {
        const bengaliNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return num
            .toString()
            .split('')
            .map((digit) => bengaliNumbers[parseInt(digit)])
            .join('');
    };

    return <SchedulePrintComponent classes={classes} exam={exam} examSchedule={examSchedule} getBengaliNumber={getBengaliNumber} ref={ref} />;
};

export default ExamScheduleDownloadContainer;
