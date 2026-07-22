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

type Props = {
  courseId: number;
  price: number;

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
  courseId,
  price,
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
                courseId={courseId}
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
                  courseId={courseId}
                  price={price}
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
                String(courseId)
              )
            )
          }
          className="h-[50px] w-full rounded-sm bg-success text-[23px] font-bold text-white hover:bg-success-hover md:w-[200px]"
        >
          Continue Learning
        </Button>
      )}

      <div className="flex h-[50px] w-full items-center justify-center rounded-sm border-2 border-primary bg-card text-[22px] font-bold text-primary md:w-[200px]">
        {price} EGP
      </div>
    </div>
  );
};

export default LearningActions;