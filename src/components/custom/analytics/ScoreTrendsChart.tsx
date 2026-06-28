import React, { useRef, useState } from "react";
// Charts
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";

// Register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const ScoreTrendsChart: React.FC = () => {
  const chartRef = useRef<any>(null);
  const [hiddenDatasets, setHiddenDatasets] = useState<number[]>([]);

  // Toggle dataset visibility
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
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Job Match %",
        data: [40, 60, 45, 70, 85, 90],
        borderColor: "#553be6", // bg-primary
        backgroundColor: "#553be6",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        label: "ATS Score",
        data: [25, 45, 60, 38, 75, 100],
        borderColor: "#2ebccf", // bg-secondary
        backgroundColor: "#2ebccf",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "#2ebccf",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, 
      },
      tooltip: {
        backgroundColor: "#25282d",
        titleFont: { family: "Inter Variable" },
        bodyFont: { family: "Inter Variable" },
        padding: 12,
        cornerRadius: 8,
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 25,
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
        grid: {
          display: false,
        },
        ticks: {
          color: "#d1d3d8",
          font: { family: "Inter Variable", size: 12 },
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  const customLegendItems = [
    { label: "Job Match %", colorClass: "bg-primary", index: 0 },
    { label: "ATS Score", colorClass: "bg-secondary", index: 1 },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm w-full h-[600px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-h4 font-bold text-foreground">Score Trends</h3>

        {/* Custom Legend */}
        <div className="flex items-center gap-4 text-normal">
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
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default ScoreTrendsChart;
