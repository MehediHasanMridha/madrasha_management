import InfiniteScrollComponent from '@/Components/Department/Teacher/InfiniteScrollComponent';
import { useTeachersContext } from '@/contextApi&reducer/Department/TeacherContextApi';
import axios from 'axios';
import StaffListContainer from './StaffListContainer';

const InfiniteScrollContainer = () => {
    const { staffs, dispatch } = useTeachersContext();
    const handleScroll = async (url) => {
        try {
            const { data } = await axios.get(url);
            dispatch({ type: 'loadData', staffs: data?.users });
        } catch (error) {
            console.log('🚀 ~ handleClick ~ error:', error);
        }
    };
    return staffs?.data?.length > 0 ? (
        <InfiniteScrollComponent allData={staffs} handleScroll={handleScroll}>
            <StaffListContainer staffs={staffs?.data} />
        </InfiniteScrollComponent>
    ) : (
        <>No Staff Found</>
    );
};

export default InfiniteScrollContainer;
