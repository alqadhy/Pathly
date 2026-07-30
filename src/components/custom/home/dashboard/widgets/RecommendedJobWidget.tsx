import React from "react";
import { Bookmark, MapPin, Briefcase, DollarSign, Clock } from "lucide-react";
import dashboardData from "../../../../../../public/mocked/home/StudentDashboard.json";

export const RecommendedJobWidget: React.FC = () => {
  const job = dashboardData.sidebar.recommendedJobs[0];

  return (
    <div className="space-y-4">
      <h3 className="text-h4 font-bold text-foreground">
        Recommended Job for You
      </h3>

      <div className="bg-card border border-border rounded-2xl p-5 shadow-sm relative">
        <button className="absolute top-4 right-4 text-normal hover:text-primary transition-colors">
          <Bookmark className="w-5 h-5" />
        </button>

        {/* Company Info */}
        <div className="flex flex-col items-center text-center mt-2 space-y-3">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold text-blue-500 shadow-sm border border-border">
            {job.company.charAt(0)}
          </div>
          <div>
            <h4 className="text-base font-bold text-foreground">{job.title}</h4>
            <p className="text-sm text-normal font-semibold mt-0.5">
              {job.company}
            </p>
          </div>
        </div>

        {/* Job Details */}
        <div className="mt-6 space-y-2.5">
          <div className="flex items-center gap-2.5 text-[13px] text-normal font-semibold">
            <MapPin className="w-4 h-4 shrink-0" /> {job.location}
          </div>
          <div className="flex items-center gap-2.5 text-[13px] text-normal font-semibold">
            <Briefcase className="w-4 h-4 shrink-0" /> {job.type}
          </div>
          <div className="flex items-center gap-2.5 text-[13px] text-normal font-semibold">
            <DollarSign className="w-4 h-4 shrink-0" /> {job.salary}
          </div>
        </div>

        {/* Tags & Time */}
        <div className="mt-5 pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-normal font-semibold mb-3.5">
            <Clock className="w-3.5 h-3.5 shrink-0" /> {job.postedAt}
          </div>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-light text-foreground text-xs font-bold rounded-lg border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
