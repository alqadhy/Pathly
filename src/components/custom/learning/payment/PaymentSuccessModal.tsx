import { useNavigate } from "react-router-dom";
import { Check, Clock3, Star, Award } from "lucide-react";

import { Button } from "../../../ui/button";

import { learningCourses } from "../../../../../public/mocked/learning/learning";
import { APP_ROUTES } from "../../../../constants";
import LearningOverviewBadges from "../details/LearningOverview-Badges";

type Props = {
  courseId: number;
  onClose: () => void;
};

const PaymentSuccessModal = ({
  courseId,
  onClose,
}: Props) => {
  const navigate = useNavigate();

  const course = learningCourses.find(
    (course) => course.id === courseId
  );

  if (!course) return null;

  return (
    <div className="space-y-2xl p-lg">
      {/* SUCCESS ICON */}
      <div className="mb-md flex flex-col items-center">
        <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-success-dark">
          <Check size={80} strokeWidth={4} className="text-white" />
        </div>

        <h2 className="mt-md text-center text-[52px] font-bold text-text-primary">
          Payment Successful!
        </h2>

        <p className="text-center mt-sm text-h4 font-bold text-text-primary">
          Welcome to the course
        </p>

        <div className="mt-md text-center text-h6 font-semibold text-dark">
          <p>Order ID: #{Date.now()}</p>
          <p>Amount Paid: {course.price} EGP</p>
        </div>
      </div>

      {/* COURSE CARD */}
      <div className="flex flex-col gap-lg rounded-sm border border-border p-lg lg:flex-row lg:items-center">
        <img
          src={course.image}
          alt={course.title}
          className="h-[150px] shrink-0 basis-1/3 rounded-sm object-cover"
        />

        <div className="flex-1">
          <h3 className="text-[34px] font-bold text-text-primary">
            {course.title}
          </h3>

          <div className="mt-sm mb-md flex flex-wrap items-center gap-md text-h6">
            <span className="text-dark">
              By Dr. {course.instructor}
            </span>

            <span className="flex items-center gap-xs text-dark">
              <Star size={18} className="fill-yellow-400 text-yellow-400" />

              {course.rating}

              <span className="text-dark">
                ({course.reviews})
              </span>
            </span>
          </div>

          <LearningOverviewBadges course={course} />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="grid gap-md md:grid-cols-2">
        <Button
          className="h-[50px] rounded-sm text-h4  text-light"
          onClick={() =>
            navigate(
              APP_ROUTES.Learning.continueCourse.replace(
                ":id",
                String(courseId)
              )
            )
          }
        >
          Start Learning
        </Button>

        <Button
          variant="outline"
          className="h-[50px] rounded-sm border-2 border-primary text-h4 text-primary"
          onClick={() => {
            onClose();
            navigate(APP_ROUTES.student.mylearning);
          }}
        >
          Go To My Learning
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;