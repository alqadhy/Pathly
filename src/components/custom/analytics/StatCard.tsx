import React from "react";

// Icons
import { User, ChartNoAxesColumn, Briefcase, Target } from "lucide-react";
// Types
import type { StatItem } from "../../../types/analytics.types";

const StatCards: React.FC = () => {
  // Stats
  const stats: StatItem[] = [
    {
      id: 1,
      icon: <User className="w-5 h-5 text-primary" />,
      iconBg: "bg-primary-light",
      badgeText: "+8% this month",
      badgeClass: "bg-primary-light text-primary",
      value: "72%",
      label: "",
    },
    {
      id: 2,
      icon: <ChartNoAxesColumn className="w-5 h-5 text-success" />,
      iconBg: "bg-success-light",
      badgeText: "+5pts this week",
      badgeClass: "bg-success-light text-success",
      value: "82/100",
      label: "ATS Score",
    },
    {
      id: 3,
      icon: <Briefcase className="w-5 h-5 text-info" />,
      iconBg: "bg-info-light",
      badgeText: "+12 new",
      badgeClass: "bg-info-light text-info",
      value: "28",
      label: "Job Matches",
    },
    {
      id: 4,
      icon: <Target className="w-5 h-5 text-warning" />,
      iconBg: "bg-warning-light",
      badgeText: "1 offer pending",
      badgeClass: "bg-warning-light text-warning",
      value: "4",
      label: "Applications",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-6">
            <div
              className={`p-2.5 rounded-full flex items-center justify-center ${stat.iconBg}`}
            >
              {stat.icon}
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${stat.badgeClass}`}
            >
              {stat.badgeText}
            </span>
          </div>
          <div>
            <h3 className="text-h2 font-bold text-foreground">{stat.value}</h3>
            {stat.label && (
              <p className="text-body-sm font-medium text-normal mt-1">
                {stat.label}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
