import React from "react";
// Charts
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartOptions, ChartData } from "chart.js";

// Register Doughnut Chart
ChartJS.register(ArcElement, Tooltip, Legend);

const ApplicationPipelineChart: React.FC = () => {
  const pipelineData = [
    {
      label: "Under Review",
      value: 1,
      color: "#2ebccf",
      bgColorClass: "bg-secondary", // Secondary
    },
    {
      label: "Interview",
      value: 1,
      color: "#553be6",
      bgColorClass: "bg-primary", // Primary
    },
    { label: "Offer", value: 1, color: "#0c9d61", bgColorClass: "bg-success" }, // Success
    {
      label: "Rejected",
      value: 1,
      color: "#ec2d30",
      bgColorClass: "bg-danger", // Danger
    },
  ];

  // Data Chart.js
  const data: ChartData<"doughnut"> = {
    labels: pipelineData.map((item) => item.label),
    datasets: [
      {
        data: pipelineData.map((item) => item.value),
        backgroundColor: pipelineData.map((item) => item.color),
        borderWidth: 4,
        hoverOffset: 1,
      },
    ],
  };

  // Options Chart.js
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#25282d",
        bodyFont: { family: "Inter Variable", size: 13 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 6,
        callbacks: {
          title: () => "",
          label: (context) => {
            return `${context.label} : ${context.formattedValue}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col h-full">
      <h3 className="text-h4 font-bold text-foreground mb-6">
        Application Pipeline
      </h3>

      {/* Doughnut Chart */}
      <div className="relative h-[220px]  flex justify-center items-center mb-8">
        <Doughnut data={data} options={options} />
      </div>

      {/* Custom Legend */}
      <div className="flex flex-col gap-4 mt-auto ">
        {pipelineData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            {/* Left Chart */}
            <div className="flex items-center gap-3 ">
              <span
                className={`w-3 h-3 rounded-full ${item.bgColorClass}`}
              ></span>
              <span className="text-body-sm text-normal">{item.label}</span>
            </div>

            {/* Right Chart */}
            <div className="flex items-center gap-3">
              <div
                className={`h-1 w-8 rounded-full ${item.bgColorClass}`}
              ></div>
              <span className="text-body-sm font-bold text-foreground w-4 text-right">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationPipelineChart;
