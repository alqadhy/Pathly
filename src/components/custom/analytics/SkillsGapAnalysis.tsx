import React from "react";
// components
import ProgressBar from "../ProgressBar";
// json
import mockData from "../../../../public/mock/AnalyticsDashboard.json";

// types
import type { SkillGapItem } from "../../../types/analytics";

const SkillsGapAnalysis: React.FC = () => {
  //SkillsGapAnalysis Data
  const skills: SkillGapItem[] = mockData.skillsGapAnalysis;

  return (
    <div className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-sm w-full h-full flex flex-col">
      <h3 className="text-h5 md:text-h4 font-bold text-foreground mb-4 md:mb-6">
        Skills Gap Analysis
      </h3>

      <div className="flex flex-col gap-2 md:gap-3">
        {skills.map((skill) => (
          <ProgressBar
            key={skill.id}
            title={skill.title}
            subtitle="Your level"
            value={skill.value}
            colorClass="bg-primary"
            labelRightClass="text-primary"
            labelRight={
              <div className="flex flex-col items-end">
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold mb-1 whitespace-nowrap ${skill.priorityClass}`}
                >
                  {skill.priority}
                </span>
                <span className="text-xs md:text-sm">{skill.value}%</span>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsGapAnalysis;
