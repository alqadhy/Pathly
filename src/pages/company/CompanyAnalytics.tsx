import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Briefcase,
  FileText,
  Users,
  Award,
  AlertCircle,
  TrendingUp,
  Zap,
} from "lucide-react";

import analyticsData from "../../../public/mocked/analytics/CompanyAnalytics.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Briefcase,
  Users,
  Award,
  TrendingUp,
  AlertCircle,
  Zap,
};

export default function CompanyAnalytics() {
  const lineChartData = {
    labels: analyticsData.applicantTrends.labels,
    datasets: [
      {
        label: "Applications",
        data: analyticsData.applicantTrends.applications,
        borderColor: "#06b6d4",
        backgroundColor: "rgba(6, 182, 212, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Hires",
        data: analyticsData.applicantTrends.hires,
        borderColor: "#8b5cf6",
        backgroundColor: "transparent",
        tension: 0.4,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { min: 0, max: 100, ticks: { stepSize: 25 } },
      x: { grid: { display: false } },
    },
  };

  const doughnutData = {
    labels: analyticsData.conversionBreakdown.map((item) => item.label),
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: ["#06b6d4", "#8b5cf6", "#10b981", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    cutout: "75%",
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-sm text-normal mt-1">
            Monitor your company hiring performance, applicant trends, and
            conversion rates.
          </p>
        </div>
        <button className="bg-card border border-border text-foreground py-2 px-4 rounded-full text-xs font-semibold shadow-sm hover:bg-light transition-colors">
          30 Days
        </button>
      </div>

      {/* Stats Cards*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.stats.map((stat) => {
          const IconComponent = iconMap[stat.iconType] || FileText;
          return (
            <div
              key={stat.id}
              className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                {/* UI */}
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                  <IconComponent className="w-6 h-6 stroke-[1.7]" />
                </div>
                {/* Badge */}
                <span className="text-[11px] bg-primary/20 text-primary font-medium  px-3 py-1 rounded-full border border-border/40">
                  {stat.period}
                </span>
              </div>
              <div className="mt-5">
                <h2 className="text-3xl font-extrabold  text-foreground tracking-tight">
                  {stat.count}
                </h2>
                <p className="text-sm font-medium text-normal mt-1">
                  {stat.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hiring Funnel & Applicant Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hiring Funnel */}
        <div className="lg:col-span-6 bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <h3 className="text-lg font-bold text-foreground mb-6">
            Hiring Funnel
          </h3>
          <div className="space-y-5">
            {analyticsData.hiringFunnel.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm font-semibold text-foreground mb-1.5">
                  <span>{item.label}</span>
                  <span>{item.val}</span>
                </div>
                <div className="w-full bg-light h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: item.width }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applicant Trends */}
        <div className="lg:col-span-6 bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">
              Applicant Trends
            </h3>
            <div className="flex items-center gap-4 text-xs font-semibold text-normal">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>{" "}
                Applications
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>{" "}
                Hires
              </span>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
      </div>

      {/* Time to Hire & Conversion Rate Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Time to Hire */}
        <div className="lg:col-span-6 bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-foreground mb-6">
            Time to Hire (days)
          </h3>
          <div className="space-y-4">
            {analyticsData.timeToHire.map((bar, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="w-24 text-xs font-semibold text-normal text-left">
                  {bar.label}
                </span>
                <div className="flex-1 bg-light h-4 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: bar.width }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Rate Breakdown */}
        <div className="lg:col-span-6 bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <h3 className="text-lg font-bold text-foreground mb-4">
            Conversion Rate Breakdown
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
            <div className="w-44 h-44 relative">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
            <div className="space-y-3">
              {analyticsData.conversionBreakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-6 text-sm"
                >
                  <span className="flex items-center gap-2 font-medium text-normal">
                    <span
                      className={`w-3 h-3 rounded-full ${item.color}`}
                    ></span>{" "}
                    {item.label}
                  </span>
                  <span className="font-bold text-foreground">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI-Generated Insights */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 text-primary rounded-lg">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-foreground">
            AI-Generated Insights
          </h3>
          <span className="text-xs font-bold text-black px-2.5 py-0.5 rounded-full border border-border">
            Powered by your data
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analyticsData.aiInsights.map((insight, idx) => {
            const InsightIcon = iconMap[insight.iconType] || Zap;
            const themes = [
              {
                bg: "bg-emerald-500/5",
                border: "border-emerald-500/20",
                text: "text-emerald-600",
              },
              {
                bg: "bg-amber-500/5",
                border: "border-amber-500/20",
                text: "text-amber-600",
              },
              {
                bg: "bg-blue-500/5",
                border: "border-blue-500/20",
                text: "text-blue-600",
              },
            ];
            const currentTheme = themes[idx % themes.length];

            return (
              <div
                key={idx}
                className={`${currentTheme.bg} border ${currentTheme.border} rounded-2xl p-5`}
              >
                <div
                  className={`flex items-center gap-2 ${currentTheme.text} font-bold text-sm mb-2`}
                >
                  <InsightIcon className="w-4 h-4" /> {insight.title}
                </div>
                <p className="text-xs font-medium text-foreground leading-relaxed">
                  {insight.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
