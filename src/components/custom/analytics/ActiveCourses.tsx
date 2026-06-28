import React from "react";
import ProgressBar from "../ProgressBar";

const ActiveCourses: React.FC = () => {
  const courses = [
    {
      id: 1,
      title: "UI/UX Design Bootcamp",
      timeLeft: "6 hrs left",
      progress: 78,
      colorClass: "bg-primary",
      textClass: "text-primary",
    },
    {
      id: 2,
      title: "Product Management Fundamentals",
      timeLeft: "~8 hrs left",
      progress: 45,
      colorClass: "bg-secondary",
      textClass: "text-secondary",
    },
  ];

  return (
    <div className="w-full flex flex-col mt-8">
      <h3 className="text-h4 font-bold text-foreground mb-6">Active Courses</h3>

      <div className="flex flex-col gap-4">
        {courses.map((course) => (
          <ProgressBar
            key={course.id}
            title={course.title}
            value={course.progress}
            colorClass={course.colorClass}
            labelRightClass={course.textClass}
            labelRight={
              <div className="flex items-center gap-2">
                <span className="text-normal font-medium text-xs">
                  {course.timeLeft}
                </span>
                <span>{course.progress}%</span>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ActiveCourses;
