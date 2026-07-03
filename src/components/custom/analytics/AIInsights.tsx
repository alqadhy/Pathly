import React from "react";
import {
  Sparkles,
  TrendingUp,
  AlertCircle,
  Zap,
  ArrowRight,
} from "lucide-react";

const AIInsights: React.FC = () => {
  const insights = [
    {
      id: 1,
      title: "Profile Momentum",
      description:
        "Your profile score grew 8% this month. Adding work experience is the single action that would unlock the most — 12 more job matches and an ATS score above 90.",
      actionText: "Add Experience",
      icon: <TrendingUp className="w-5 h-5" />,
      containerClass: "bg-success-light border-[#b4e1ce]", // --success-light-active
      titleClass: "text-success-dark",
      textClass: "text-success-darker",
      linkClass: "text-success-dark",
    },
    {
      id: 2,
      title: "Application Gap",
      description:
        "You've browsed 29 jobs but applied to only 4. Your interview conversion rate for similar profiles is ~65%. Consider applying to 3-4 more this week.",
      actionText: "Browse Jobs",
      icon: <AlertCircle className="w-5 h-5" />,
      containerClass: "bg-warning-light border-[#ffe0b4]", // --warning-light-active
      titleClass: "text-warning-dark",
      textClass: "text-warning-darker",
      linkClass: "text-warning-dark",
    },
    {
      id: 3,
      title: "Course Milestone",
      description:
        "You're 78% through the UI/UX Design Bootcamp — approximately 6 hours remain. Finishing this week adds a verified certificate to your profile.",
      actionText: "Continue Course",
      icon: <Zap className="w-5 h-5" />,
      containerClass: "bg-info-light border-[#c2d3f6]", //  --info-light-active
      titleClass: "text-info-dark",
      textClass: "text-info-darker",
      linkClass: "text-info-dark",
    },
  ];

  return (
    <div className="w-full mt-8">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-h3 font-bold text-foreground">
          AI-Generated Insights
        </h2>
        <span className="px-3 py-1 bg-card border border-border rounded-full text-xs font-semibold text-normal shadow-sm">
          Powered by your data
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`border rounded-2xl p-6 flex flex-col justify-between ${insight.containerClass}`}
          >
            <div>
              <div
                className={`flex items-center gap-2 mb-3 ${insight.titleClass}`}
              >
                {insight.icon}
                <h4 className="text-body-md font-bold">{insight.title}</h4>
              </div>
              <p
                className={`text-body-sm leading-relaxed mb-6 ${insight.textClass}`}
              >
                {insight.description}
              </p>
            </div>

            <a
              href="#"
              className={`flex items-center gap-1 text-body-sm font-bold hover:underline group w-fit ${insight.linkClass}`}
            >
              {insight.actionText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ml-0.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;
