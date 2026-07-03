import React, { useRef, useState } from "react";
// Charts
import { Bar } from "react-chartjs-2";
// Chart.js
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
  // Create a reference to the chart and a state for hidden items
  const chartRef = useRef<any>(null);
  const [hiddenDatasets, setHiddenDatasets] = useState<number[]>([]);

  // Function to toggle dataset visibility on click
  const toggleDataset = (datasetIndex: number) => {
    const chart = chartRef.current;
    if (chart) {
      const isVisible = chart.isDatasetVisible(datasetIndex);
      chart.setDatasetVisibility(datasetIndex, !isVisible);
      chart.update();

      // Update state to apply line-through styling
      if (isVisible) {
        setHiddenDatasets((prev) => [...prev, datasetIndex]);
      } else {
        setHiddenDatasets((prev) => prev.filter((idx) => idx !== datasetIndex));
      }
    }
  };

  // Data
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Applications",
        data: [1, 0, 2, 0, 1, 0, 0],
        backgroundColor: "#553be6",
        borderRadius: 4,
        barThickness: 12,
      },
      {
        label: "Courses",
        data: [0, 0, 0, 0, 0, 2, 0],
        backgroundColor: "#0c9d61",
        borderRadius: 4,
        barThickness: 12,
      },
      {
        label: "Jobs Browsed",
        data: [0, 0, 0, 0, 0, 0, 2],
        backgroundColor: "#fe9b0e",
        borderRadius: 4,
        barThickness: 12,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        backgroundColor: "#25282d", // var(--darker)
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
          color: "#d1d3d8", // var(--light-active)
          font: { family: "Inter Variable", size: 12 },
          padding: 10,
        },
        border: {
          display: false,
          dash: [4, 4],
        },
        grid: {
          color: "#f0f1f2", // var(--light)
          drawTicks: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#d1d3d8", // var(--light-active)
          font: { family: "Inter Variable", size: 12 },
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  // Array for custom legend items to map them easily
  const customLegendItems = [
    { label: "Applications", colorClass: "bg-primary", index: 0 },
    { label: "Courses", colorClass: "bg-success", index: 1 },
    { label: "Jobs Browsed", colorClass: "bg-warning", index: 2 },
  ];

  return (
    <div className="bg-card border border-border pb-7 rounded-2xl p-6 shadow-sm w-full h-[500px] flex flex-col ">
      <div className="flex flex-wrap gap-6 justify-between items-center mb-6">
        <h3 className="text-h4 font-bold text-foreground">Weekly Activity</h3>

        {/* Render Custom Interactive Legend */}
        <div className="flex items-center flex-wrap gap-4 text-normal">
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
              <span className="text-body-sm text-inherit">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grow w-full relative">
        {/* Pass the ref to the Bar chart */}
        <Bar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default WeeklyActivityChart;
