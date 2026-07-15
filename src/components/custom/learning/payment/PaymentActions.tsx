import { Button } from "../../../ui/button";

import { saveLearningPurchase } from "../../../../../public/mocked/learning/learningPurchaseStorage";

type Props = {
  courseId: number;
  coursePrice: number;
  onSuccess: () => void;

  paymentMethod: "card" | "paypal" | "";

  cardNumber: string;
  expiry: string;
  cvc: string;
};

const PaymentActions = ({
  courseId,
  coursePrice,
  onSuccess,
  paymentMethod,
  cardNumber,
  expiry,
  cvc,
}: Props) => {
  const handlePayment = () => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    );

    if (!currentUser.email) return;

    saveLearningPurchase({
      userEmail: currentUser.email,
      courseId,
      purchaseDate: new Date().toISOString(),
      progress: 0,
    });

    onSuccess();
  };

  const canPay =
    paymentMethod === "paypal" ||
    (paymentMethod === "card" &&
      cardNumber.trim() !== "" &&
      expiry.trim() !== "" &&
      cvc.trim() !== "");

  return (
    <Button
      onClick={handlePayment}
      disabled={!canPay}
      className="h-[64px] w-full rounded-2xl bg-primary text-[20px] font-bold text-primary-foreground transition-all duration-300 hover:bg-primary-hover active:bg-primary-active active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
    >
      Pay {coursePrice} EGP
    </Button>
  );
};

export default PaymentActions;