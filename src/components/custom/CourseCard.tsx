// Components
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

// Icons
import { UserRound, Star, Clock, CircleStar } from "lucide-react";

// Types
import type { Course } from "../../types/courses.types";

function UserIcon() {
  return (
    <div className="relative inline-block">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="split-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="var(--color-secondary)" />
            <stop offset="50%" stopColor="var(--color-primary)" />
          </linearGradient>
        </defs>
      </svg>
      <UserRound size={24} style={{ stroke: "url(#split-gradient)" }} />
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
}: Course) {
  return (
    <Card className="group rounded-md relative overflow-hidden shadow-md hover:shadow-card hover:-translate-y-1 transition-all duration-300 bg-card flex flex-col p-0 gap-0 ring-0">
      {tag && (
        <span
          className={`absolute top-4 left-4 z-2 ${tag == "New" ? "bg-warning-light text-warning" : "bg-primary-light text-primary"} px-2 py-1 rounded-[100px]`}
        >
          {tag}
        </span>
      )}
      <div className="relative w-full overflow-hidden rounded-t-md">
        <img
          src={image}
          alt={title}
          className="w-full h-full aspect-[5/3] group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <CardContent className="flex flex-col grow p-4">
        <h6 className="font-bold text-darker leading-snug mb-2 text-body-md">
          {title}
        </h6>

        <div className="flex items-center gap-2 text-normal text-sm mb-2">
          <UserIcon />
          <span>{instructor}</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Star size={16} className="text-warning" />
          <span className="text-sm text-normal">{rating}</span>
          <span className="text-normal">({reviews} Students)</span>
        </div>

        <div className="flex items-center gap-4 text-normal text-sm mb-2">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-normal" />
            <span>{duration}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-light-active"></span>
          <span>{level}</span>
        </div>

        <div className="flex items-center gap-2 text-normal text-sm mb-4">
          <CircleStar size={14} className="text-normal" />
          <span>{hasCertificate ? "Certificate" : "No Certificate"}</span>
        </div>

        <div className="flex items-center mt-auto">
          <Button className="flex-1 bg-primary rounded-sm hover:bg-primary-hover cursor-pointer text-white font-medium h-10">
            View Details
          </Button>
          <div className="h-10 px-3 flex items-center justify-center text-primary rounded-r-lg bg-white font-bold text-sm border-l border-primary-light">
            {price} EGP
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCard;
