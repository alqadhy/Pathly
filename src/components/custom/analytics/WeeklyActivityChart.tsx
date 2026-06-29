import React, { useRef, useState } from "react";
// Charts
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";

// json
import mockData from "../../../../public/mock/AnalyticsDashboard.json";

// Register
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const WeeklyActivityChart: React.FC = () => {
  const chartRef = useRef<any>(null);
  const [hiddenDatasets, setHiddenDatasets] = useState<number[]>([]);

  // Function to toggle dataset visibility on click
  const toggleDataset = (datasetIndex: number) => {
    const chart = chartRef.current;
    if (chart) {
      const isVisible = chart.isDatasetVisible(datasetIndex);
      chart.setDatasetVisibility(datasetIndex, !isVisible);
      chart.update();

      if (isVisible) {
        setHiddenDatasets((prev) => [...prev, datasetIndex]);
      } else {
        setHiddenDatasets((prev) => prev.filter((idx) => idx !== datasetIndex));
      }
    }
  };

  // Data
  const data = {
    labels: mockData.weeklyActivity.labels,
    datasets: mockData.weeklyActivity.datasets.map((dataset) => ({
      ...dataset,
      borderRadius: 4,
      barThickness: 12,
    })),
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#25282d",
        titleFont: { family: "Inter Variable" },
        bodyFont: { family: "Inter Variable" },
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 8,
        ticks: {
          stepSize: 2,
          color: "#d1d3d8",
          font: { family: "Inter Variable", size: 12 },
          padding: 10,
        },
        border: {
          display: false,
          dash: [4, 4],
        },
        grid: {
          color: "#f0f1f2",
          drawTicks: false,
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          color: "#d1d3d8",
          font: { family: "Inter Variable", size: 12 },
        },
        border: { display: false },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  const customLegendItems = [
    { label: "Applications", colorClass: "bg-primary", index: 0 },
    { label: "Courses", colorClass: "bg-success", index: 1 },
    { label: "Jobs Browsed", colorClass: "bg-warning", index: 2 },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-sm w-full h-[400px] md:h-[500px] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:gap-0">
        <h3 className="text-h5 md:text-h4 font-bold text-foreground">
          Weekly Activity
        </h3>

        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-normal">
          {customLegendItems.map((item) => (
            <div
              key={item.index}
              onClick={() => toggleDataset(item.index)}
              className={`flex items-center gap-2 cursor-pointer select-none transition-all duration-200 ${
                hiddenDatasets.includes(item.index)
                  ? "opacity-40 line-through"
                  : "opacity-100 hover:opacity-80"
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full ${item.colorClass}`}
              ></span>
              <span className="text-[11px] sm:text-body-sm text-inherit whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grow w-full relative">
        <Bar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default WeeklyActivityChart;
