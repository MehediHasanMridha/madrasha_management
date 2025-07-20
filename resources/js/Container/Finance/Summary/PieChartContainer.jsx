import PieChartUI from '@/Components/UI/chart/PieChartUI';
import { useEffect, useState } from 'react';

const PieChartContainer = ({ data }) => {
    const [containerData, setContainerData] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            if (data?.length > 0) {
                modifyData(data);
            }
            if (data?.length > 0) {
                modifyData(data);
            }
        }, 500);
    }, [data]);

    const modifyData = (data) => {
        setContainerData(
            data.map((item) => ({
                ...item,
                amount: Number(item.amount),
            })),
        );
    };

    return (
        <PieChartUI.antPie
            data={containerData}
            angleField="amount"
            colorField="type"
            innerRadius={0.6}
            label={false}
            legend={{
                color: {
                    title: false,
                    rowPadding: 5,
                    position: 'right',
                    itemMarkerFill: (datum, index, data) => {
                        const color = ['#f28e2c', '#91cc75', '#ff9f7f', '#ff6a00'][index % 4];
                        return color;
                    },
                    itemLabelFontSize: 12,
                    itemMarkerSize: 20,
                },
            }}
            tooltip={{
                items: [
                    (datum, index, data, column) => ({
                        name: datum?.type,
                        value: datum.amount,
                        color: ['#f28e2c', '#91cc75', '#ff9f7f', '#ff6a00'][index % 4],
                    }),
                ],
            }}
            // annotations={[
            //     {
            //         type: 'text',
            //         style: {
            //             text: data?.length > 0 ? `${data.reduce((acc, item) => acc + Number(item.amount), 0).toLocaleString('bn')} Tk` : 'No Data',
            //             x: '50%',
            //             y: '50%',
            //             textAlign: 'center',
            //             fontSize: 40,
            //             fontStyle: 'bold',
            //         },
            //     },
            // ]}
        />
    );
};

export default PieChartContainer;
