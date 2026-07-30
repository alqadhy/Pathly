import { Clock, Bell } from "lucide-react";
import dashboardData from "../../../../public/mocked/home/CompanyDashboard.json";

export default function UpcomingInterviewsWidget() {
  const interviews = dashboardData.sidebar.upcomingInterviews;

  return (
    <div className="bg-popover text-popover-foreground rounded-2xl  border-border p-5 shadow-xs ">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold tracking-tight text-foreground">
          Upcoming Interviews
        </h3>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
        </button>
      </div>

      {/* Interviews List */}
      <div className="space-y-4">
        {interviews.map((interview) => (
          <div
            key={interview.id}
            className="flex items-start gap-3.5 pb-4 border-b border-border/60 last:border-0 last:pb-0 group"
          >
            {/* Avatar / Initials */}
            <div className="h-11 w-11 border border-border rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground shrink-0 overflow-hidden">
              {interview.avatar ? (
                <img
                  src={interview.avatar}
                  alt={interview.candidateName}
                  className="w-full h-full object-cover"
                />
              ) : (
                interview.candidateName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-foreground truncate">
                {interview.candidateName}
              </h4>
              <p className="text-xs text-muted-foreground truncate mb-1">
                {interview.role}
              </p>

              {/* Time with Cyan/Teal Color */}
              <div className="flex items-center gap-1.5 text-xs text-[#06b6d4] font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{interview.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
