import student_present_graph from '@/assets/images/student_present_graph.svg';
import SettingDropdownContainer from '@/Container/Shared/SettingDropdownContainer';
import MonthlyFeeComponent from './MonthlyFeeComponent';
const DashboardComponent = ({ data, auth }) => {
    return (
        <div className="rounded-3xl bg-[#F6F6F6] px-4 sm:px-8 lg:px-[50px]">
            <div className="mb-5 space-y-[20px]">
                <div className="flex flex-col items-start justify-between gap-4 rounded-[8px] bg-white px-4 py-[10px] sm:flex-row sm:items-center sm:gap-0 sm:px-[30px]">
                    <div>
                        <div className="text-lg font-[500] sm:text-xl lg:text-[24px]">Assalamu Alaikum {auth.user.name} !</div>
                        <div className="text-sm font-[400] text-[#4A4A4A] sm:text-base lg:text-[16px]">Hope everything is doing well.</div>
                    </div>
                    <SettingDropdownContainer />
                </div>
                {data.map((department, index) => (
                    <div key={index} className="space-y-[20px] rounded-[12px] border-[1px] border-[#AFAFAF] p-4 sm:p-6 lg:p-[24px]">
                        <div className="text-lg font-[500] sm:text-xl lg:text-[20px]">
                            {department.name}
                            <hr className="border-[0.5px] text-[#AFAFAF]" />
                        </div>
                        <div className="flex flex-col justify-between gap-4 xl:flex-row xl:gap-[20px]">
                            <div className="max-w-full flex-1 rounded-[8px] bg-white p-4 sm:p-6 lg:p-[24px] xl:max-w-[478px]">
                                <div className="flex items-start justify-between gap-4">
                                    <span className="flex-1">
                                        <div className="inline-flex h-9 items-center justify-start gap-1 text-2xl font-medium sm:text-3xl lg:text-[32px]">
                                            <span>127/{department.student_count}</span>
                                        </div>
                                        <div className="text-xs font-normal text-[#4a4a4a] sm:text-sm">Students present</div>
                                    </span>
                                    <div className="flex-shrink-0">
                                        <img src={student_present_graph} alt="" className="h-12 w-12 sm:h-auto sm:w-auto" />
                                    </div>
                                </div>
                                <hr className="my-[12px] border-[1px] bg-[#AFAFAF]" />
                                <div className="flex flex-wrap gap-2 sm:gap-4 lg:gap-[24px]">
                                    <span className="flex items-center space-x-[4px] text-[10px] text-[#AFAFAF]">
                                        <div className="h-2.5 w-2.5 rounded-[100px] bg-[#9658ec]" />
                                        <span>{department?.student_male_count} Male</span>
                                    </span>
                                    <span className="flex items-center space-x-[4px] text-[10px] text-[#AFAFAF]">
                                        <div className="h-2.5 w-2.5 rounded-[100px] bg-[#9658ec]" />
                                        <span>{department?.student_female_count} Female</span>
                                    </span>
                                </div>
                            </div>
                            <div className="max-w-full flex-1 rounded-[8px] bg-white p-4 sm:p-6 lg:p-[24px] xl:max-w-[478px]">
                                <div className="flex items-start justify-between gap-4">
                                    <span className="flex-1">
                                        <div className="inline-flex h-9 items-center justify-start gap-1 text-2xl font-medium sm:text-3xl lg:text-[32px]">
                                            <span>127/{department.teacher_count}</span>
                                        </div>
                                        <div className="text-xs font-normal text-[#4a4a4a] sm:text-sm">Teacher present</div>
                                    </span>
                                    <div className="flex-shrink-0">
                                        <img src={student_present_graph} alt="" className="h-12 w-12 sm:h-auto sm:w-auto" />
                                    </div>
                                </div>
                                <hr className="my-[12px] border-[1px] bg-[#AFAFAF]" />
                                <div className="flex flex-wrap gap-2 sm:gap-4 lg:gap-[24px]">
                                    <span className="flex items-center space-x-[4px] text-[10px] text-[#AFAFAF]">
                                        <div className="h-2.5 w-2.5 rounded-[100px] bg-[#9658ec]" />
                                        <span>{department?.teacher_male_count} Male</span>
                                    </span>
                                    <span className="flex items-center space-x-[4px] text-[10px] text-[#AFAFAF]">
                                        <div className="h-2.5 w-2.5 rounded-[100px] bg-[#9658ec]" />
                                        <span>{department?.teacher_female_count} Female</span>
                                    </span>
                                </div>
                            </div>
                            <div className="max-w-full flex-1 rounded-[8px] bg-white p-4 sm:p-6 lg:p-[24px] xl:max-w-[478px]">
                                <div className="flex items-start justify-between gap-4">
                                    <span className="flex-1">
                                        <div className="inline-flex h-9 items-center justify-start gap-1 text-2xl font-medium sm:text-3xl lg:text-[32px]">
                                            <span>127/138</span>
                                        </div>
                                        <div className="text-xs font-normal text-[#4a4a4a] sm:text-sm">Students present</div>
                                    </span>
                                    <div className="flex-shrink-0">
                                        <img src={student_present_graph} alt="" className="h-12 w-12 sm:h-auto sm:w-auto" />
                                    </div>
                                </div>
                                <hr className="my-[12px] border-[1px] bg-[#AFAFAF]" />
                                <div className="flex flex-wrap gap-2 sm:gap-4 lg:gap-[24px]">
                                    <span className="flex items-center space-x-[4px] text-[10px] text-[#AFAFAF]">
                                        <div className="h-2.5 w-2.5 rounded-[100px] bg-[#9658ec]" />
                                        <span>120 Male</span>
                                    </span>
                                    <span className="flex items-center space-x-[4px] text-[10px] text-[#AFAFAF]">
                                        <div className="h-2.5 w-2.5 rounded-[100px] bg-[#9658ec]" />
                                        <span>120 Female</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <MonthlyFeeComponent data={department} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardComponent;
