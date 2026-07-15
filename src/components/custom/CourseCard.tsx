// Components
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

// Icons
import {
  UserRound,
  Star,
  Clock,
  CircleStar,
} from "lucide-react";

// Types
import type { Course } from "../../types/courses.types";
import CourseProgress from "./learning/course-overview/CourseProgress";

function UserIcon() {
  return (
    <div className="relative inline-block">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient
            id="split-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="50%" stopColor="var(--color-secondary)" />
            <stop offset="50%" stopColor="var(--color-primary)" />
          </linearGradient>
        </defs>
      </svg>

      <UserRound
        size={24}
        style={{
          stroke: "url(#split-gradient)",
        }}
      />
    </div>
  );
}

function CourseCard({
  image,
  title,
  instructor,
  rating,
  reviews,
  duration,
  level,
  hasCertificate,
  price,
  tag,
  completedLessons,
  totalLessons,
  showProgress,
  buttonText = "View Details",
  onClickFn,
}: Course) {
  return (
    <Card className="group relative flex flex-col gap-0 overflow-hidden rounded-md bg-card p-0 shadow-md ring-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      {tag && (
        <span
          className={`absolute left-4 top-4 z-10 rounded-full px-2 py-1 ${
            tag === "New"
              ? "bg-warning-light text-warning"
              : "bg-primary-light text-primary"
          }`}
        >
          {tag}
        </span>
      )}

      <div className="relative w-full overflow-hidden rounded-t-md">
        <img
          src={image}
          alt={title}
          className="aspect-[5/3] h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <CardContent className="flex grow flex-col p-4">
        <h6 className="mb-2 text-body-md font-bold leading-snug text-darker">
          {title}
        </h6>

        <div className="mb-2 flex items-center gap-2 text-sm text-normal">
          <UserIcon />
          <span>{instructor}</span>
        </div>

        <div className="mb-2 flex items-center gap-2">
          <Star size={16} className="fill-warning text-warning" />

          <span className="text-sm text-normal">
            {rating}
          </span>

          <span className="text-normal">
            ({reviews} Students)
          </span>
        </div>

        <div className="mb-2 flex items-center gap-4 text-sm text-normal">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-normal" />
            <span>{duration}</span>
          </div>

          <span className="h-1 w-1 rounded-full bg-light-active" />

          <span>{level}</span>
        </div>

        <div className="mb-4 flex items-center gap-2 text-sm text-normal">
          <CircleStar
            size={14}
            className="text-normal"
          />

          <span>
            {hasCertificate
              ? "Certificate"
              : "No Certificate"}
          </span>
        </div>

        {showProgress && (
          <div className="mb-4">
            <CourseProgress
              completed={completedLessons ?? 0}
              totalLessons={totalLessons ?? 0}
            />
          </div>
        )}

        <div className="mt-auto flex items-center">
          <Button
            onClick={onClickFn}
            className="flex-1 rounded-sm bg-primary text-white hover:bg-primary-hover"
          >
            {buttonText}
          </Button>

          <div className="flex h-10 items-center justify-center rounded-r-lg border-l border-primary-light bg-white px-3 text-sm font-bold text-primary">
            {price} EGP
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCard;