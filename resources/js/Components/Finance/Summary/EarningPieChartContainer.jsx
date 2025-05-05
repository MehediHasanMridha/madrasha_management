import PieChartUI from '@/Components/UI/chart/PieChartUI';
import { useEffect, useState } from 'react';

const EarningPieChartContainer = ({ data }) => {
    const [earningData, setEarningData] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            if (data?.earnings.length > 0) {
                modifyData(data.earnings);
            }
        }, 500);
    }, [data]);

    const modifyData = (data) => {
        setEarningData(
            data.map((item) => ({
                ...item,
                amount: Number(item.amount),
            })),
        );
    };

    return data?.earnings.length > 0 ? (
        <PieChartUI.antPie
            data={earningData}
            angleField="amount"
            colorField="feeType"
            innerRadius={0.6}
            label={{
                text: (data) => `${data.amount}`,
                style: {
                    fontSize: 20,
                    fill: '#000',
                    textAlign: 'center',
                    textBaseline: 'middle',
                    fontWeight: 'bold',
                },
            }}
            legend={{
                color: {
                    title: false,
                    rowPadding: 5,
                    position: 'right',
                    itemMarkerFill: (datum, index, data) => {
                        const color = ['#f28e2c', '#91cc75', '#ff9f7f', '#ff6a00'][index % 4];
                        return color;
                    },
                    itemLabelFontSize: 14,
                    itemMarkerSize: 14,
                },
            }}
            tooltip={{
                items: [
                    (datum, index, data, column) => ({
                        name: datum.feeType,
                        value: datum.amount,
                        color: ['#f28e2c', '#91cc75', '#ff9f7f', '#ff6a00'][index % 4],
                    }),
                ],
            }}
        />
    ) : (
        <div className="text-center text-lg">This month has no earning</div>
    );
};

export default EarningPieChartContainer;
