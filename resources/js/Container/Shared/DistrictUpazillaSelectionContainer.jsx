import SelectUI from '@/Components/UI/SelectUI';

const DistrictUpazillaSelectionContainer = ({ data = [], ...props }) => {
    const option =
        data &&
        data?.map((item) => ({
            value: item.name,
            label: item.name,
            id: item.id,
        }));
    return <SelectUI options={option} style={{ height: '45px', borderRadius: '8px' }} className="border-[#AFAFAF]" {...props} />;
};

export default DistrictUpazillaSelectionContainer;
