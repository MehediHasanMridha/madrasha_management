import DashboardComponent from '@/Components/Dashboard/DashboardComponent';
const DashboardContainer = ({ data, auth }) => {
    return <DashboardComponent data={data} auth={auth} />;
};

export default DashboardContainer;
