import { useNavigate } from "react-router-dom";

import { Button } from "../../../ui/button";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../ui/dialog";

import { APP_ROUTES } from "../../../../constants";

import LearningPayment from "../payment/LearningPayment";
import PaymentSuccessModal from "../payment/PaymentSuccessModal";

import type { Course } from "../../../../types/courses.types";

type Props = {
  course: Course;

  isEnrolled: boolean;

  setIsEnrolled: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  dialogOpen: boolean;

  setDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  paymentSuccess: boolean;

  setPaymentSuccess: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const LearningActions = ({
  course,
  isEnrolled,
  setIsEnrolled,
  dialogOpen,
  setDialogOpen,
  paymentSuccess,
  setPaymentSuccess,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="mt-md flex flex-col-reverse gap-md md:flex-row md:justify-end">
      {!isEnrolled ? (
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);

            if (!open) {
              setPaymentSuccess(false);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="h-[50px] w-full rounded-sm bg-primary text-[22px] font-bold text-light hover:bg-primary-hover md:w-[200px]">
              Take Course
            </Button>
          </DialogTrigger>

          <DialogContent
            className="
              w-[95vw]
              max-w-[820px]
              rounded-2xl
              border-0
              bg-card
              p-0
              shadow-card
              overflow-hidden
            "
          >
            {paymentSuccess ? (
              <PaymentSuccessModal
                courseId={course.id}
                onClose={() => {
                  setDialogOpen(false);
                  setPaymentSuccess(false);

                  setTimeout(() => {
                    setIsEnrolled(true);
                  }, 0);
                }}
              />
            ) : (
              <div className="max-h-[85vh] overflow-y-auto p-8">
                <LearningPayment
                  course={course}
                  onSuccess={() => {
                    setPaymentSuccess(true);
                  }}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      ) : (
        <Button
          onClick={() =>
            navigate(
              APP_ROUTES.Learning.continueCourse.replace(
                ":id",
                String(course.id)
              )
            )
          }
          className="h-[50px] w-full rounded-sm bg-success px-md text-[23px] font-bold text-white hover:bg-success-hover md:w-[200px]"
        >
          Continue Learning
        </Button>
      )}

      <div className="flex h-[50px] w-full items-center justify-center rounded-sm border-2 border-primary bg-card text-[22px] font-bold text-primary md:w-[200px]">
        {course.price} EGP
      </div>
    </div>
  );
};

export default LearningActions;