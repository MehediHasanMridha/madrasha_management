import { useState } from 'react';
import { FaUserGroup } from 'react-icons/fa6';
import { RiUserAddLine } from 'react-icons/ri';
import Field from '../../Components/UI/Field';
import FieldSet from '../../Components/UI/FieldSet';
import FileUploadField from '../../Components/UI/FileUploadField';
import ModalUI from '../../Components/UI/ModalUI';
import StaticBtn from '../../Components/UI/StaticBtn';
import SubmitBtn from '../../Components/UI/SubmitBtn';
import TableUI from '../../Components/UI/TableUI';
const DepartmentTabsSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="mt-[24px] rounded-[8px] bg-white p-[24px]">
                <span className="flex w-fit items-center space-x-[8px] border-b-[1px] border-[#4891FF] px-[8px] py-[6px] text-[#4891FF]">
                    <FaUserGroup className="inline-flex" size={24} />
                    <span className="text-[16px]">Students</span>
                </span>
            </div>
            <div className="mt-[8px] flex w-full flex-col items-end space-y-5 rounded-[8px] bg-white p-[24px] text-center">
                <StaticBtn onClick={() => setIsModalOpen(true)}>
                    <RiUserAddLine className="inline-flex" /> <span>Add Student</span>
                </StaticBtn>
                <TableUI className="w-full" />
            </div>
            <ModalUI
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                width={'100%'}
                title="Add Student"
                footer={() => <SubmitBtn btnText={'Add Student'} className="bg-blue-400" />}
            >
                <div className="max-h-[80vh] overflow-y-scroll">
                    <FieldSet label={'Personal Information'} labelClassName="text-[16px] font-bold" hr={true}>
                        <Field label={'Student Name'}>
                            <input
                                type="text"
                                className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                placeholder="Enter Student Name"
                            />
                        </Field>
                        <Field label={'Student ID'}>
                            <input
                                type="text"
                                className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                placeholder="Enter Student ID"
                            />
                        </Field>
                        <Field label={'Fathers Name'}>
                            <input
                                type="text"
                                className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                placeholder="Enter Fathers Name"
                            />
                        </Field>
                        <Field label={'Blood Group'}>
                            <select className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0">
                                <option value="">Select Blood Group</option>
                                <option value="N/A">N/A</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </select>
                        </Field>
                        <Field label={'Contact Number'}>
                            <input
                                type="text"
                                className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                placeholder="Enter Contact Number"
                            />
                        </Field>
                        <FileUploadField text={'Upload Student Image'} />
                    </FieldSet>
                    <FieldSet label={'Address Information'} labelClassName="text-[16px] font-bold" hr={true}>
                        <Field label={'District'}>
                            <select
                                name="district"
                                id=""
                                className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            >
                                <option value="">Select District</option>
                                <option value="Madaripur">Madaripur</option>
                                <option value="Tangail">Tangail</option>
                            </select>
                        </Field>
                        <Field label={'Upazilla'}>
                            <select
                                name="upazilla"
                                id=""
                                className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            >
                                <option value="">Select Upazilla</option>
                                <option value="Madaripur">Madaripur</option>
                                <option value="Tangail">Tangail</option>
                            </select>
                        </Field>
                        <Field label={'Location'}>
                            <textarea
                                name="location"
                                id=""
                                cols="30"
                                rows="5"
                                className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                placeholder="Enter Location"
                            ></textarea>
                        </Field>
                    </FieldSet>
                    <FieldSet label={'Academic information'} labelClassName="text-[16px] font-bold" hr={true}>
                        <Field label={'Joining Class'}>
                            <select
                                name="joining Class"
                                id=""
                                className="w-full rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                            >
                                <option value="">Select Joining Class</option>
                                <option value="Madaripur">Madaripur</option>
                                <option value="Tangail">Tangail</option>
                            </select>
                        </Field>
                        <Field label={'Boarding fee'}>
                            <input
                                type="text"
                                className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                placeholder="Enter Boarding fee"
                            />
                        </Field>
                        <Field label={'Academic fee'}>
                            <input
                                type="text"
                                className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                placeholder="Enter Academic fee"
                            />
                        </Field>
                        <Field label={'Reference (Optional)'}>
                            <input
                                type="text"
                                className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                placeholder="Enter Reference (Optional)"
                            />
                        </Field>
                        <Field label={'Reference mobile number (Optional)'}>
                            <input
                                type="text"
                                className="rounded-[8px] border-[1px] border-[#AFAFAF] px-[16px] py-[12px] focus:outline-0"
                                placeholder="Enter Reference mobile number (Optional)"
                            />
                        </Field>
                    </FieldSet>
                </div>
            </ModalUI>
        </>
    );
};

export default DepartmentTabsSection;
