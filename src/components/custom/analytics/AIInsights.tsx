import React from "react";
// Icons
import {
  Sparkles,
  TrendingUp,
  AlertCircle,
  Zap,
  ArrowRight,
} from "lucide-react";
// Json
import mockData from "../../../../public/mock/AnalyticsDashboard.json";
// types
import type { AIInsightItem } from "../../../types/analytics";
// icons
const iconMap: Record<string, React.ElementType> = {
  TrendingUp: TrendingUp,
  AlertCircle: AlertCircle,
  Zap: Zap,
};

const AIInsights: React.FC = () => {
  // AIInsights Data
  const insights: AIInsightItem[] = mockData.aiInsights;

  return (
    <div className="w-full mt-6 md:mt-8">
      {/* Header*/}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 md:mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          <h2 className="text-h4 md:text-h3 font-bold text-foreground">
            AI-Generated Insights
          </h2>
        </div>
        <span className="w-fit px-2 md:px-3 py-1 bg-card border border-border rounded-full text-[10px] md:text-xs font-semibold text-normal shadow-sm">
          Powered by your data
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {insights.map((insight) => {
          const IconComponent = iconMap[insight.iconName];

          return (
            <div
              key={insight.id}
              className={`border rounded-2xl p-5 md:p-6 flex flex-col justify-between ${insight.containerClass}`}
            >
              <div>
                <div
                  className={`flex items-center gap-2 mb-3 ${insight.titleClass}`}
                >
                  {IconComponent && (
                    <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                  <h4 className="text-sm md:text-body-md font-bold">
                    {insight.title}
                  </h4>
                </div>
                <p
                  className={`text-xs md:text-body-sm leading-relaxed mb-4 md:mb-6 ${insight.textClass}`}
                >
                  {insight.description}
                </p>
              </div>

              <a
                href="#"
                className={`flex items-center gap-1 text-xs md:text-body-sm font-bold hover:underline group w-fit ${insight.linkClass}`}
              >
                {insight.actionText}
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300 ml-0.5" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIInsights;
