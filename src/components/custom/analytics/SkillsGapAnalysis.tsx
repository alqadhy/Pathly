import React from "react";
// components
import ProgressBar from "../ProgressBar";

const SkillsGapAnalysis: React.FC = () => {
  const skills = [
    {
      id: 1,
      title: "TypeScript",
      priority: "High Priority",
      priorityClass: "bg-danger-light text-danger",
      value: 94,
    },
    {
      id: 2,
      title: "Jest / Vitest",
      priority: "High Priority",
      priorityClass: "bg-danger-light text-danger",
      value: 94,
    },
    {
      id: 3,
      title: "AWS / Cloud",
      priority: "Medium Priority",
      priorityClass: "bg-warning-light text-warning-dark",
      value: 94,
    },
    {
      id: 4,
      title: "GraphQL",
      priority: "Medium Priority",
      priorityClass: "bg-warning-light text-warning-dark",
      value: 94,
    },
    {
      id: 5,
      title: "Docker",
      priority: "Low Priority",
      priorityClass: "bg-light text-normal",
      value: 94,
    },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm w-full h-full flex flex-col">
      <h3 className="text-h4 font-bold text-foreground mb-6">
        Skills Gap Analysis
      </h3>

      <div className="flex flex-col gap-2">
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
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold mb-1 ${skill.priorityClass}`}
                >
                  {skill.priority}
                </span>
                <span>{skill.value}%</span>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsGapAnalysis;
