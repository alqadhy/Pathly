import React from "react";
// components
import ProgressBar from "../ProgressBar";
// json file
import mockData from "../../../../public/mock/AnalyticsDashboard.json";

const ActiveCourses: React.FC = () => {
  // activeCourses Data
  const courses = mockData.activeCourses;

  return (
    <div className="w-full flex flex-col mt-6 md:mt-8">
      <h3 className="text-h5 md:text-h4 font-bold text-foreground mb-4 md:mb-6">
        Active Courses
      </h3>

      <div className="flex flex-col gap-3 md:gap-4">
        {courses.map((course) => (
          <ProgressBar
            key={course.id}
            title={course.title}
            value={course.progress}
            colorClass={course.colorClass}
            labelRightClass={course.textClass}
            labelRight={
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="text-normal font-medium text-[10px] sm:text-xs whitespace-nowrap">
                  {course.timeLeft}
                </span>
                <span className="text-xs sm:text-sm md:text-base">
                  {course.progress}%
                </span>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ActiveCourses;
