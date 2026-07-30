import React from "react";
import { Clock, BookOpen } from "lucide-react";
import dashboardData from "../../../../../../public/mocked/home/StudentDashboard.json";

export const ContinueLearningWidget: React.FC = () => {
  const courses = dashboardData.sidebar.activeCourses;

  return (
    <div className="space-y-4">
      <h3 className="text-h4 font-bold text-foreground">Continue Learning</h3>

      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-card border border-border rounded-2xl p-4 shadow-sm space-y-4"
        >
          {/* Course Info */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src={course.logo}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h4 className="text-sm font-bold text-foreground">
                {course.title}
              </h4>
              <p className="text-[11px] text-normal font-bold uppercase tracking-wide mt-0.5">
                {course.category}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-normal font-semibold">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> {course.lessonsCompleted}/
                {course.lessonsTotal} Lessons
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {course.timeLeft}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-light rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Button */}
          <button className="w-full bg-primary text-white py-2 rounded-xl text-sm font-bold hover:bg-primary-dark transition-colors">
            Continue Course
          </button>
        </div>
      ))}
    </div>
  );
};
