import React from "react";

// Icons
import { User, ChartNoAxesColumn, Briefcase, Target } from "lucide-react";
// json
import mockData from "../../../../public/mock/AnalyticsDashboard.json";

// types
import type { StatItem } from "../../../types/analytics";

// Icons
const iconMap: Record<string, React.ElementType> = {
  User: User,
  ChartNoAxesColumn: ChartNoAxesColumn,
  Briefcase: Briefcase,
  Target: Target,
};

const StatCards: React.FC = () => {
  // StatCards Data
  const stats: StatItem[] = mockData.statCards;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      {stats.map((stat) => {
        const IconComponent = iconMap[stat.iconName];

        return (
          <div
            key={stat.id}
            className="bg-card p-5 md:p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between"
          >
            {/* Header   */}
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <div
                className={`p-2 md:p-2.5 rounded-full flex items-center justify-center ${stat.iconBg}`}
              >
                {IconComponent && (
                  <IconComponent
                    className={`w-4 h-4 md:w-5 md:h-5 ${stat.iconColor}`}
                  />
                )}
              </div>
              <span
                className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold ${stat.badgeClass}`}
              >
                {stat.badgeText}
              </span>
            </div>

            {/* Number & Text*/}
            <div>
              <h3 className="text-h3 md:text-h2 font-bold text-foreground">
                {stat.value}
              </h3>
              {stat.label && (
                <p className="text-xs md:text-body-sm font-medium text-normal mt-1">
                  {stat.label}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatCards;
