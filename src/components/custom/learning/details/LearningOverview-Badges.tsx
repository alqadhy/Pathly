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
  <div className="flex flex-nowrap items-center gap-2 overflow-x-auto md:gap-3">
    <div className="flex shrink-0 items-center gap-1 rounded-lg bg-muted px-2 py-2 text-xs font-small text-foreground md:px-3 md:text-sm">
      <Clock3 size={16} />
      {course.duration}
    </div>

    <div className="flex shrink-0 items-center gap-1 rounded-lg bg-muted px-2 py-2 text-xs font-small text-foreground md:px-3 md:text-sm">
      {course.level}
    </div>

    <div className="flex shrink-0 items-center gap-1 rounded-lg bg-muted px-2 py-2 text-xs font-small text-foreground md:px-3 md:text-sm">
      <BadgeCheck size={16} />
      {course.hasCertificate ? "Certificate" : "No Certificate"}
    </div>
  </div>
  );
};

export default LearningOverviewBadges;