import React from "react";
import { Bell, Clock } from "lucide-react";

interface Interview {
  id: string;
  candidateName: string;
  role: string;
  time: string;
  avatar: string;
}

interface Props {
  interviews: Interview[];
}

export const UpcomingInterviewsWidget: React.FC<Props> = ({ interviews }) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground">
          Upcoming Interviews
        </h3>
        <button className="text-normal hover:text-foreground transition-colors">
          <Bell className="w-4 h-4" />
        </button>
      </div>

      {/* Interviews List */}
      <div className="space-y-4">
        {interviews.map((interview) => (
          <div key={interview.id} className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-border shrink-0 mt-1">
              <img
                src={interview.avatar}
                alt={interview.candidateName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <h4 className="text-[13px] font-bold text-foreground leading-tight">
                {interview.candidateName}
              </h4>
              <p className="text-[11px] text-normal font-medium mt-0.5">
                {interview.role}
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] font-semibold text-primary">
                <Clock className="w-3 h-3" />
                <span>{interview.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
