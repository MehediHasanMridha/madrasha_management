import { Pie } from '@ant-design/plots';

const AntPieChart = ({ data, ...props }) => {
    const config = {
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
            text: (data) => `${data.value}`,
            style: {
                fontSize: 14,
            },
        },
        autoFit: true,
        legend: {
            color: {
                title: false,
                rowPadding: 5,
                position: 'right',
                itemMarkerFill: (datum, index, data) => {
                    const color = ['#f28e2c', '#91cc75', '#ff9f7f', '#ff6a00'][index % 4];
                    return color;
                },
                itemLabelFontSize: 20,
                itemMarkerSize: 20,
            },
        },
        style: {
            fill: (datum, index, data) => {
                const color = ['#f28e2c', '#91cc75', '#ff9f7f', '#ff6a00'][index % 4];
                return color;
            },
            stroke: '#fff',
            lineWidth: 2,
            radius: 10,
            shadowColor: 'rgba(0, 0, 0, .45)',
            shadowBlur: 20,
            shadowOffsetX: 2,
            shadowOffsetY: 2,
        },
        tooltip: {
            title: (data) => data.value,
            items: [
                (datum, index, data, column) => ({
                    name: 'value',
                    value: datum.value,
                    color: ['#f28e2c', '#91cc75', '#ff9f7f', '#ff6a00'][index % 4],
                }),
            ],
        },
        ...props,
    };

    return <Pie {...config} />;
};

export default AntPieChart;
