import { Button } from "../../../ui/button";

import { saveLearningPurchase } from "../../../../../public/mocked/learning/learningPurchaseStorage";
import { enrollStudent } from "../../../../utils/learningEnrollmentStorage";
import {
  addTransaction
} from "../../../../utils/instructorTransactionStorage";
import { instructorService } from "../../../../Services/instructor.service";

import type { Course } from "../../../../types/courses.types";

type Props = {
  course: Course;
  onSuccess: () => void;

  paymentMethod: "card" | "paypal" | "";

  cardNumber: string;
  expiry: string;
  cvc: string;
};

const PaymentActions = ({
  course,
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


    // Save student purchase
    saveLearningPurchase({
      userEmail: currentUser.email,

      courseId: course.id,

      purchaseDate:
        new Date().toISOString(),

      progress: 0,
    });


    // Save enrollment for instructor
    enrollStudent(course);


    // Update instructor students count
 if (course.instructorEmail) {
    addTransaction({
      id: Date.now(),

      instructorEmail: course.instructorEmail!,

      studentName: currentUser.name || "Student",

      studentEmail: currentUser.email,

      studentAvatar:
        currentUser.avatar ||
        "https://ui-avatars.com/api/?name=Student",

      courseTitle: course.title,

      amount: course.price,

      status: "Completed",

      date: new Date().toISOString(),
    });


  instructorService.incrementStudents(
    course.instructorEmail,
    course.id
  );
}


    onSuccess();
  };


  const canPay =
    paymentMethod === "paypal" ||
    (
      paymentMethod === "card" &&
      cardNumber.trim() !== "" &&
      expiry.trim() !== "" &&
      cvc.trim() !== ""
    );


  return (
    <Button
      onClick={handlePayment}
      disabled={!canPay}
      className="h-[64px] w-full rounded-2xl bg-primary text-h4 font-bold text-primary-foreground transition-all duration-300 hover:bg-primary-hover active:bg-primary-active active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
    >
      Pay {course.price} EGP
    </Button>
  );
};

export default PaymentActions;