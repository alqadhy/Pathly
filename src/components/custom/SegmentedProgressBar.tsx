import React from "react";
// types
import type { SegmentedProgressBarProps } from "../../types/analytics";

const SegmentedProgressBar: React.FC<SegmentedProgressBarProps> = ({
  title,
  subtitle,
  value,
  totalSegments = 8,
  colorClass = "bg-primary",
  textClass = "text-primary",
}) => {
  // compute the number of active segments
  const activeSegments = Math.round((value / 100) * totalSegments);

  return (
    <div className="mb-6 w-full">
      {/* HEader */}
      <div className="flex justify-between items-start mb-1">
        <div>
          <h4 className=" text-body-sm md:text-body-md font-semibold text-foreground">
            {title}
          </h4>
          <p className="text-body-sm md:text-body-md text-normal mt-1">
            {subtitle}
          </p>
        </div>
        <span className={`text-h3 font-bold ${textClass}`}>{value}%</span>
      </div>

      {/* Segments Bars */}
      <div className="flex gap-1.5 mt-3 w-full">
        {Array.from({ length: totalSegments }).map((_, index) => (
          <div
            key={index}
            className={`h-2.5 rounded-full flex-1 transition-all duration-500 ${
              index < activeSegments ? colorClass : "bg-light"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SegmentedProgressBar;
