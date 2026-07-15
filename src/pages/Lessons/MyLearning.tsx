import { useEffect, useState } from "react";

import {
  learningCourses,
} from "../../../public/mocked/learning/learning";

import {
  getUserPurchases,
} from "../../../public/mocked/learning/learningPurchaseStorage";

import MyLearningHeader from "../../components/custom/learning/my-learning/MyLearningHeader";
import MyLearningGrid from "../../components/custom/learning/my-learning/MyLearningGrid";
import EmptyMyLearning from "../../components/custom/learning/my-learning/EmptyLearningState";

const MyLearning = () => {
  const [courses, setCourses] =
    useState<any[]>([]);

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") ||
        "{}"
    );

    if (!currentUser.email) return;

    const purchases =
      getUserPurchases(
        currentUser.email
      );

    const enrolledCourses =
      purchases
        .map((purchase) => {
          const course =
            learningCourses.find(
              (item) =>
                item.id ===
                purchase.courseId
            );

          if (!course) return null;

          return {
            ...course,
            progress:
              purchase.progress,
            purchaseDate:
              purchase.purchaseDate,
          };
        })
        .filter(Boolean);

    setCourses(
      enrolledCourses as any[]
    );
  }, []);

  return (
    <section
      className="
        min-h-screen
        bg-background
      "
    >
      <div
        className="
          mx-auto
          max-w-[1280px]
          p-lg
          lg:p-2xl
        "
      >
        <MyLearningHeader
            totalCourses={courses.length}
        />

        {courses.length === 0 ? (
          <EmptyMyLearning />
        ) : (
          <MyLearningGrid
            courses={courses}
          />
        )}
      </div>
    </section>
  );
};

export default MyLearning;