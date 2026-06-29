import React from "react";
// icons
import { ArrowRight } from "lucide-react";
// components
import ProgressBar from "../ProgressBar";
// json
import mockData from "../../../../public/mock/AnalyticsDashboard.json";

const ProfileStrength: React.FC = () => {
  // Profile Strength Data
  const { sections, overall } = mockData.profileStrength;

  return (
    <div className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-sm w-full h-[450px] md:h-[600px] flex flex-col">
      {/* Header  */}
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-h5 md:text-h4 font-bold text-foreground">
          Profile Strength
        </h3>

        {/* Complete Profile */}
        <a
          href="#"
          className="text-xs md:text-body-sm font-semibold text-primary hover:underline flex items-center group whitespace-nowrap ml-2"
        >
          Complete profile
          <ArrowRight className="group-hover:translate-x-1 transition-fast duration-300 w-4 h-4 md:w-5 md:h-5 ml-1" />
        </a>
      </div>

      {/* Progress Bars List */}
      <div className="flex flex-col gap-2 md:gap-3 overflow-y-auto pr-2 grow">
        {sections.map((section) => (
          <ProgressBar
            key={section.id}
            title={section.label}
            value={section.value}
            colorClass={section.colorClass}
            labelRight={section.text}
            labelRightClass={section.textClass}
          />
        ))}
      </div>

      {/* Footer / Divider */}
      <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2 justify-between items-end sm:items-center">
        <div className="flex items-baseline">
          <span className="text-h3 md:text-h2 font-bold text-primary mr-1">
            {overall.score}
            <span className="text-h5 md:text-h4">%</span>
          </span>
          <span className="text-xs md:text-body-sm text-normal">overall</span>
        </div>

        <div className="text-right">
          <p className="text-[11px] md:text-body-sm text-normal mb-0.5 md:mb-1">
            {overall.completedSections} of {overall.totalSections} sections
            complete
          </p>
          <p className="text-xs md:text-body-sm font-semibold text-primary">
            {overall.growthText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileStrength;
