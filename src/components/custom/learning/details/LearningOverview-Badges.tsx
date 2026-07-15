import {
  BadgeCheck,
  Clock3,
} from "lucide-react";

import type { Course } from "../../../../types/courses.types";

type Props = {
  course: Course;
};

const LearningOverviewBadges = ({ course }: Props) => {
  return (
    <div className="bg-card p-md">
      {/* BADGES */}
      <div className="flex flex-wrap gap-md">
        <div className="flex items-center gap-xs rounded-lg bg-muted px-md py-sm text-body-lg font-medium text-foreground">
          <Clock3 size={18} />
          {course.duration}
        </div>

        <div className="flex items-center gap-xs rounded-lg bg-muted px-md py-sm text-body-lg font-medium text-foreground">
          {course.level}
        </div>

        <div className="flex items-center gap-xs rounded-lg bg-muted px-md py-sm text-body-lg font-medium text-foreground">
          <BadgeCheck size={18} />
          {course.hasCertificate ? "Certificate" : "No Certificate"}
        </div>
      </div>
    </div>
  );
};

export default LearningOverviewBadges;