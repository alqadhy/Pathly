import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { learningCourses } from "../../../public/mocked/learning/learning";
import { hasPurchasedCourse } from "../../../public/mocked/learning/learningPurchaseStorage";

import LearningHero from "../../components/custom/learning/details/LearningHero";
import LearningInstructor from "../../components/custom/learning/details/LearningInstructor";
import LearningOverview from "../../components/custom/learning/details/LearningOverview";
import LearningOverviewBadges from "../../components/custom/learning/details/LearningOverview-Badges";
import LearningActions from "../../components/custom/learning/details/LearningActions";

const LearningDetails = () => {
  const { id } = useParams();

  const course = learningCourses.find(
    (item) => item.id === Number(id)
  );

  const [isEnrolled, setIsEnrolled] =
    useState(false);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [paymentSuccess, setPaymentSuccess] =
    useState(false);

    useEffect(() => {
      if (!course) return;

      const currentUser = JSON.parse(
        localStorage.getItem("currentUser") || "{}"
      );

      if (!currentUser.email) return;

      setIsEnrolled(
        hasPurchasedCourse(
          currentUser.email,
          course.id
        )
      );
    }, [course]);

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center text-h3 font-bold text-text-primary ">
        Course Not Found
      </div>
    );
  }

return (
  <section className="min-h-screen bg-background">
    <div className="mx-auto max-w-[1180px] p-lg lg:p-2xl">
      <LearningHero
        image={course.image}
        title={course.title}
      />

      <div className="mt-2xl flex flex-col gap-2xl lg:flex-row lg:justify-between">
        <div className="flex-1">
          <LearningInstructor course={course} />

          <LearningOverviewBadges course={course} />

          <LearningOverview course={course} />
        </div>
      </div>

      <LearningActions
        courseId={course.id}
        price={course.price}
        isEnrolled={isEnrolled}
        setIsEnrolled={setIsEnrolled}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        paymentSuccess={paymentSuccess}
        setPaymentSuccess={setPaymentSuccess}
      />
    </div>
  </section>
);
};

export default LearningDetails;