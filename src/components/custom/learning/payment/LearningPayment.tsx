import { useState } from "react";

import type { Course } from "../../../../types/courses.types";

import PaymentHeader from "./PaymentHeader";
import OrderSummary from "./OrderSummary";
import PaymentMethods from "./PaymentMethods";
import PaymentActions from "./PaymentActions";

type Props = {
  course: Course;
  onSuccess: () => void;
};

const LearningPayment = ({
  course,
  onSuccess,
}: Props) => {
  const [paymentMethod, setPaymentMethod] =
    useState<"card" | "paypal" | "">("");

  const [cardNumber, setCardNumber] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const [cvc, setCvc] =
    useState("");

  return (
    <div className="w-full space-y-2xl">
      <PaymentHeader title="Payment" />

      <OrderSummary price={course.price} />

      <PaymentMethods
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        expiry={expiry}
        setExpiry={setExpiry}
        cvc={cvc}
        setCvc={setCvc}
      />

      <PaymentActions
        course={course}
        paymentMethod={paymentMethod}
        cardNumber={cardNumber}
        expiry={expiry}
        cvc={cvc}
        onSuccess={onSuccess}
      />
    </div>
  );
};

export default LearningPayment;