import { useNavigate } from "react-router-dom";
import { Check, Clock3, Star, Award } from "lucide-react";

import { Button } from "../../../ui/button";

import { learningCourses } from "../../../../../public/mocked/learning/learning";
import { APP_ROUTES } from "../../../../constants";

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
        <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#14834D]">
          <Check
            size={80}
            strokeWidth={4}
            className="text-white"
          />
        </div>

        <h2 className="mt-md text-center text-[52px] font-bold text-text-primary">
          Payment Successful!
        </h2>

        <p className="text-center text-[28px] font-semibold text-text-primary">
          Welcome to the course
        </p>

        <div className="mt-md text-center text-[22px] font-semibold text-text-secondary">
          <p>Order ID: #{Date.now()}</p>
          <p>Amount Paid: {course.price} EGP</p>
        </div>
      </div>

      {/* COURSE CARD */}
      <div className="flex flex-col gap-lg rounded-2xl border border-border bg-card p-lg lg:flex-row lg:items-center">
        <img
          src={course.image}
          alt={course.title}
          className="h-[170px] basis-1/3 rounded-xl object-cover shrink-0"
        />

        <div className="flex-1">
          <h3 className="text-[34px] font-bold text-text-primary">
            {course.title}
          </h3>

          <div className="mt-sm flex flex-wrap items-center gap-md text-[20px]">
            <span className="text-text-secondary">
              By Dr. {course.instructor}
            </span>

            <span className="flex items-center gap-1">
              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />

              {course.rating}

              <span className="text-text-secondary">
                ({course.reviews})
              </span>
            </span>
          </div>

          <div className="mt-lg flex flex-wrap gap-sm">
            <div className="flex items-center gap-2 rounded-lg bg-muted px-md py-sm">
              <Clock3 size={18} />
              {course.duration}
            </div>

            <div className="rounded-lg bg-muted px-md py-sm">
              {course.level}
            </div>

            {course.hasCertificate && (
              <div className="flex items-center gap-2 rounded-lg bg-muted px-md py-sm">
                <Award size={18} />
                Certificate
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="grid gap-md md:grid-cols-2">
        <Button
          className="h-[64px] rounded-xl text-[22px] font-bold"
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
          className="h-[64px] rounded-xl border-2 border-primary text-[22px] font-bold"
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