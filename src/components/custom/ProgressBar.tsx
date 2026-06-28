import React from "react";
// Types
import type { ProgressBarProps } from "../../types/analytics";

const ProgressBar: React.FC<
  ProgressBarProps & { labelRightClass?: string }
> = ({
  title,
  value,
  subtitle,
  colorClass = "bg-primary",
  labelRight,
  labelRightClass = "text-primary",
}) => {
  return (
    <div className="mb-4 w-full">
      <div className="flex justify-between items-end mb-1.5">
        <div>
          <h4 className="text-body-sm font-semibold text-foreground">
            {title}
          </h4>
          {subtitle && (
            <p className="text-body-sm text-normal mt-1">{subtitle}</p>
          )}
        </div>
        {labelRight && (
          <span className={`text-body-sm font-semibold ${labelRightClass}`}>
            {labelRight}
          </span>
        )}
      </div>
      <div className="w-full bg-light rounded-full h-2.5">
        <div
          className={`${colorClass} h-2.5 rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
