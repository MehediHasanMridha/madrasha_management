import React from "react";
import AntPieChart from "./AntPieChart";
import ChartJSPieChart from "./ChartJSPieChart";
import ReChartsPieChart from "./ReChartsPieChart";

const PieChartUI = ({ chartType = "ant", ...props }) => {
  const charts = {
    ant: AntPieChart,
    chartjs: ChartJSPieChart,
    recharts: ReChartsPieChart,
  };

  const ChartComponent = charts[chartType] || charts.ant;
  return <ChartComponent {...props} />;
};

// Export individual chart components
PieChartUI.antPie = AntPieChart;
PieChartUI.reactChartPie = ChartJSPieChart;
PieChartUI.reChartsPie = ReChartsPieChart;

export default PieChartUI;
