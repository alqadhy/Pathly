import {
  Star,
  User,
  Clock3,
  GraduationCap,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import type {
  LearningCourse,
} from "../../../types/learning.types";

type Props = {
  course: LearningCourse;
};

const LearningCard = ({
  course,
}: Props) => {

  const navigate =
    useNavigate();

  return (
    <div
      className="
        group
        flex
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-card
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-card
      "
    >

      {/* IMAGE */}
      <div
        className="
          relative
          h-[220px]
          overflow-hidden
          rounded-t-2xl
          bg-[#0B182F]
        "
      >

        <img
          src={course.thumbnail}
          alt={course.title}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* BADGE */}
        <div
          className="
            absolute
            left-md
            top-md
            rounded-full
            bg-primary-light
            px-sm
            py-xs
            text-caption
            font-semibold
            text-primary
          "
        >
          {course.category}
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="
          flex
          grow
          flex-col
          p-lg
        "
      >

        {/* TITLE */}
        <h3
          className="
            mb-sm
            line-clamp-2
            text-body-md
            font-bold
            leading-snug
            text-text-primary
          "
        >
          {course.title}
        </h3>

        {/* INSTRUCTOR */}
        <div
          className="
            mb-sm
            flex
            items-center
            gap-xs
            text-body-sm
            text-text-secondary
          "
        >
          <User
            size={16}
            className="text-primary"
          />

          <span>
            {course.instructor}
          </span>
        </div>

        {/* RATING */}
        <div
          className="
            mb-sm
            flex
            items-center
            gap-xs
          "
        >

          <div className="flex items-center gap-[2px]">

            {[1, 2, 3, 4, 5].map(
              (item) => (
                <Star
                  key={item}
                  size={14}
                  className={
                    item <=
                    Math.floor(
                      course.rating
                    )
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              )
            )}

          </div>

          <span
            className="
              text-body-sm
              font-semibold
              text-text-primary
            "
          >
            {course.rating}
          </span>

          <span
            className="
              text-caption
              text-text-secondary
            "
          >
            ({course.students} Students)
          </span>
        </div>

        {/* INFO */}
        <div
          className="
            mb-md
            flex
            flex-wrap
            items-center
            gap-md
            text-body-sm
            text-text-secondary
          "
        >

          <div
            className="
              flex
              items-center
              gap-xs
            "
          >
            <Clock3 size={14} />

            <span>
              {course.duration}
            </span>
          </div>

          <div
            className="
              h-[4px]
              w-[4px]
              rounded-full
              bg-border
            "
          />

          <span>
            {course.level}
          </span>

        </div>

        {/* CERTIFICATE */}
        <div
          className="
            mb-lg
            flex
            items-center
            gap-xs
            text-body-sm
            text-text-secondary
          "
        >
          <GraduationCap
            size={14}
          />

          <span>
            Certificate
          </span>
        </div>

        {/* FOOTER */}
        <div
          className="
            mt-auto
            flex
            items-center
          "
        >

          <button
            onClick={() =>
              navigate(
                `/student/learning/${course.id}`
              )
            }
            className="
              flex-1
              rounded-l-xl
              bg-primary
              px-md
              py-md
              text-body-sm
              font-semibold
              text-white
              transition-all
              hover:bg-primary-hover
            "
          >
            View Details
          </button>

          <div
            className="
              flex
              h-[44px]
              items-center
              justify-center
              rounded-r-xl
              border
              border-l-0
              border-primary-light
              bg-white
              px-md
              text-body-sm
              font-bold
              text-primary
            "
          >
            {course.price} EGP
          </div>

        </div>
      </div>
    </div>
  );
};

export default LearningCard;