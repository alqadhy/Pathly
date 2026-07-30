import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

import type { InstructorRevenuePoint } from "../../../../types/instructor.types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

type Props = {
  data: InstructorRevenuePoint[];
};

const RevenueChart = ({ data }: Props) => {
  const chartData = {
    labels: data.map((item) => item.month),

    datasets: [
      {
        data: data.map((item) => item.income),
        borderColor: "#553BE6",
        backgroundColor: "rgba(85,59,230,.12)",
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "#553BE6",
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#8A8A8A",
        },
      },

      y: {
        border: {
          display: false,
        },

        grid: {
          color: "#ECECEC",
        },

        ticks: {
          color: "#8A8A8A",
        },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-xl shadow-card">
      <div className="mb-xl">
        <h3 className="text-h4 font-bold text-text-primary">
          Revenue Overview
        </h3>

        <p className="mt-xs text-body-sm text-text-secondary">
          Monthly earnings
        </p>
      </div>

      <div className="h-[340px]">
        <Line
          data={chartData}
          options={options}
        />
      </div>
    </div>
  );
};

export default RevenueChart;