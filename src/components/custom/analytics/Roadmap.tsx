import React from "react";
// components
import SegmentedProgressBar from "../SegmentedProgressBar";
// Json
import mockData from "../../../../public/mock/AnalyticsDashboard.json";

const Roadmap: React.FC = () => {
  // Roadmaps Data
  const roadmaps = mockData.roadmaps;

  return (
    <div className="w-full">
      <h3 className="text-h5 md:text-h4 font-bold text-foreground mb-4 md:mb-6">
        Roadmap & Learning Progress
      </h3>

      <div className="flex flex-col gap-3 md:gap-4">
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
