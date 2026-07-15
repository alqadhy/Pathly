import { useNavigate } from "react-router-dom";

import { GraduationCap } from "lucide-react";

import { Button } from "../../../ui/button";

const EmptyMyLearning = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        flex
        min-h-[60vh]
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-border
        bg-card
        px-xl
        py-3xl
        text-center
      "
    >
      <div
        className="
          mb-lg
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-primary/10
        "
      >
        <GraduationCap
          size={50}
          className="text-primary"
        />
      </div>

      <h2
        className="
          text-h2
          font-bold
          text-text-primary
        "
      >
        No Courses Yet
      </h2>

      <p
        className="
          mt-md
          max-w-[520px]
          text-body-lg
          text-text-secondary
        "
      >
        You haven't enrolled in any courses yet.
        Explore our learning catalog and start your
        learning journey today.
      </p>

      <Button
        className="
          mt-xl
          h-[60px]
          rounded-xl
          px-2xl
          text-[20px]
          font-semibold
        "
        onClick={() =>
          navigate("/student/learning")
        }
      >
        Browse Courses
      </Button>
    </div>
  );
};

export default EmptyMyLearning;