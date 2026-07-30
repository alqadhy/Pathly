import React from "react";
import { Flame } from "lucide-react";
import dashboardData from "../../../../../../public/mocked/home/StudentDashboard.json";

export const StreakWidget: React.FC = () => {
  const streakDays = dashboardData.sidebar.streakDays;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center gap-1">
      <div className="flex items-center ">
        <Flame className="w-7 h-7 text-orange-500 fill-orange-500" />
        <span className="text-3xl font-bold text-foreground">{streakDays}</span>
      </div>
      <span className="text-[11px] font-bold text-normal tracking-[0.2em] uppercase mt-1">
        Days Streak
      </span>
    </div>
  );
};
