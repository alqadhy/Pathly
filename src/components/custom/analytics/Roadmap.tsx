import React from "react";
import SegmentedProgressBar from "../SegmentedProgressBar";

const Roadmap: React.FC = () => {
  // Data for the Roadmap and Learning Progress
  const roadmaps = [
    {
      id: 1,
      title: "Software Engineering",
      subtitle: "10/22 tasks - ~4 months at current pace",
      value: 45,
      colorClass: "bg-primary",
      textClass: "text-primary",
      totalSegments: 8,
    },
    {
      id: 2,
      title: "Product Management",
      subtitle: "6/20 tasks - ~5 months at current pace",
      value: 30,
      colorClass: "bg-secondary",
      textClass: "text-secondary",
      totalSegments: 8,
    },
  ];

  return (
    <div className="w-full">
      <h3 className="text-h4 font-bold text-foreground mb-6">
        Roadmap & Learning Progress
      </h3>
      <div className="flex flex-col gap-2">
        {roadmaps.map((item) => (
          <SegmentedProgressBar
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            value={item.value}
            colorClass={item.colorClass}
            textClass={item.textClass}
            totalSegments={item.totalSegments}
          />
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
