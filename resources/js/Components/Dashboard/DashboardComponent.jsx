import student_present_graph from '@/assets/images/student_present_graph.svg';
import SettingDropdownContainer from '@/Container/Shared/SettingDropdownContainer';
import MonthlyFeeComponent from './MonthlyFeeComponent';
const DashboardComponent = ({ data, auth }) => {
    return (
        <div className="bg-[#F6F6F6 ] rounded-3xl px-[50px]">
            <div className="mb-5 space-y-[20px]">
                <div className="flex items-center justify-between rounded-[8px] bg-white px-[30px] py-[10px]">
                    <div>
                        <div className="text-[24px] font-[500]">Assalamu Alaikum {auth.user.name} !</div>
                        <div className="text-[16px] font-[400] text-[#4A4A4A]">Hope everything is doing well.</div>
                    </div>
                    <SettingDropdownContainer />
                </div>
                {data.map((department, index) => (
                    <div key={index} className="space-y-[20px] rounded-[12px] border-[1px] border-[#AFAFAF] p-[24px]">
                        <div className="text-[20px] font-[500]">
                            {department.name}
                            <hr className="text-[#AFAFAF ] border-[0.5px]" />
                        </div>
                        <div className="flex justify-between space-x-[20px]">
                            <div className="w-[478px] rounded-[8px] bg-white p-[24px]">
                                <div className="flex justify-between space-y-[6px]">
                                    <span>
                                        <div className="inline-flex h-9 items-center justify-start gap-1 text-[32px] font-medium">
                                            <span>127/{department.student_count}</span>
                                        </div>
                                        <div className="text-sm font-normal text-[#4a4a4a]">Students present</div>
                                    </span>
                                    <div className="">
                                        <img src={student_present_graph} alt="" />
                                    </div>
                                </div>
                                <hr className="my-[12px] border-[1px] bg-[#AFAFAF]" />
                                <div className="flex space-x-[24px]">
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
                            <div className="w-[478px] rounded-[8px] bg-white p-[24px]">
                                <div className="flex justify-between space-y-[6px]">
                                    <span>
                                        <div className="inline-flex h-9 items-center justify-start gap-1 text-[32px] font-medium">
                                            <span>127/{department.teacher_count}</span>
                                        </div>
                                        <div className="text-sm font-normal text-[#4a4a4a]">Teacher present</div>
                                    </span>
                                    <div className="">
                                        <img src={student_present_graph} alt="" />
                                    </div>
                                </div>
                                <hr className="my-[12px] border-[1px] bg-[#AFAFAF]" />
                                <div className="flex space-x-[24px]">
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
                            <div className="w-[478px] rounded-[8px] bg-white p-[24px]">
                                <div className="flex justify-between space-y-[6px]">
                                    <span>
                                        <div className="inline-flex h-9 items-center justify-start gap-1 text-[32px] font-medium">
                                            <span>127/138</span>
                                        </div>
                                        <div className="text-sm font-normal text-[#4a4a4a]">Students present</div>
                                    </span>
                                    <div className="">
                                        <img src={student_present_graph} alt="" />
                                    </div>
                                </div>
                                <hr className="my-[12px] border-[1px] bg-[#AFAFAF]" />
                                <div className="flex space-x-[24px]">
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
