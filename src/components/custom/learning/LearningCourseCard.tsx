import { Bookmark } from "lucide-react";
import CourseCard from "../CourseCard";

import { useSavedItemsStore } from "../../../store/saved-items.store";

import type { Course } from "../../../types/courses.types";

type Props = {
  course: Course;
  onClick: () => void;
};

const LearningCourseCard = ({
  course,
  onClick,
}: Props) => {
  const { savedItems, saveItem, removeItem } =
    useSavedItemsStore();

  const isSaved = savedItems.courses.some(
    (item) => item.id === course.id
  );

  const handleSave = () => {
    if (isSaved) {
      removeItem("courses", course.id);
    } else {
      saveItem("courses", {
        id: course.id,
        img: course.image,
        title: course.title,
        instructor: course.instructor,
        rating: course.rating,
        review: course.reviews,
        duration: course.duration,
        level: course.level,
        hasCertificate: course.hasCertificate,
        price: course.price,
      });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleSave}
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-primary-light"
      >
        <Bookmark
          size={20}
          className={
            isSaved
              ? "fill-warning text-warning"
              : "text-primary"
          }
        />
      </button>

      <CourseCard
        {...course}
        buttonText="View Details"
        onClickFn={onClick}
      />
    </div>
  );
};

export default LearningCourseCard;