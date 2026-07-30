import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from "lucide-react";

import { learningCourses } from "../../../public/mocked/learning/learning";
import { learningContent } from "../../../public/mocked/learning/learningContent";
import { learningReviews } from "../../../public/mocked/learning/learningReviews";

import { instructorService } from "../../Services/instructor.service";

import useLearningPlayer from "../../hooks/useLearningPlayer";

import { LearningPlayerContext } from "../../Context/LearningPlayerContext";

import { Button } from "../../components/ui/button";
import {
  Sheet,
  SheetContent,
} from "../../components/ui/sheet";

import CoursePlayer from "../../components/custom/learning/player/CoursePlayer";
import CurrentLessonInfo from "../../components/custom/learning/player/CurrentLessonInfo";
import CourseCurriculum from "../../components/custom/learning/curriculum/CourseCurriculum";

import LearningInstructor from "../../components/custom/learning/details/LearningInstructor";
import LearningOverviewBadges from "../../components/custom/learning/details/LearningOverview-Badges";

import AddComment from "../../components/custom/learning/player/AddComment";
import LearningReview from "../../components/custom/learning/player/LearningReview";

const LearningLesson = () => {
  const { id } = useParams();

  const [openCurriculum, setOpenCurriculum] =
    useState(false);

  // Instructor Course
  const instructorCourse =
    instructorService
      .getPublishedCourses()
      .find(
        (item) =>
          item.id === Number(id)
      );

  // Normal Course
  const course =
    instructorCourse ??
    learningCourses.find(
      (item) =>
        item.id === Number(id)
    );

  // Course Content
  const content = instructorCourse
    ? {
        courseId:
          instructorCourse.id,

        modules:
          (instructorCourse.modules ?? []).map(
            (module) => ({
              id: module.id,

              title: module.title,

              lessons:
                module.lessons.map(
                  (
                    lesson,
                    index
                  ) => ({
                    id: lesson.id,

                    order:
                      index + 1,

                    title:
                      lesson.title,

                    description:
                      lesson.description,

                    youtubeId:
                      lesson.youtubeId,

                    duration:
                      lesson.duration,

                    isPreview:
                      lesson.isPreview,

                    thumbnail:
                      lesson.youtubeId
                        ? `https://img.youtube.com/vi/${lesson.youtubeId}/maxresdefault.jpg`
                        : "",
                  })
                ),
            })
          ),
      }
    : learningContent.find(
        (item) =>
          item.courseId ===
          Number(id)
      );

  const review =
    learningReviews.find(
      (item) =>
        item.courseId ===
        Number(id)
    );

  const allLessons = useMemo(
    () =>
      content?.modules.flatMap(
        (module) =>
          module.lessons
      ) ?? [],
    [content]
  );

  const player =
    useLearningPlayer({
      courseId:
        course?.id ?? 0,

      lessons:
        allLessons,
    });

  if (
    !course ||
    !content ||
    !player.currentLesson
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Course Not Found
      </div>
    );
  }

  return (
    <LearningPlayerContext.Provider
      value={player}
    >
      <section className="min-h-screen">
        <Sheet
          open={
            openCurriculum
          }
          onOpenChange={
            setOpenCurriculum
          }
        >
          <SheetContent
            side="right"
            className="w-[420px] max-w-[95vw] overflow-y-auto bg-white p-0 xl:hidden"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-lg py-md">
              <h2 className="text-xl font-bold text-text-primary">
                Course Content
              </h2>
            </div>

            <CourseCurriculum
              modules={
                content.modules
              }
              totalLessons={
                course.totalLessons ??
                0
              }
            />
          </SheetContent>
        </Sheet>

        <div className="mx-auto flex max-w-[1700px] gap-8 px-4 py-6 lg:px-8">
          <div className="flex min-w-0 flex-1 flex-col bg-white">
            <div className="mb-6 flex items-center justify-between gap-md">
              <p className="text-xl font-bold text-text-primary md:text-3xl xl:text-4xl">
                {course.title}
              </p>

              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full bg-input hover:bg-light-hover xl:hidden"
                onClick={() =>
                  setOpenCurriculum(
                    true
                  )
                }
              >
                <Menu className="h-6 w-6 text-primary" />
              </Button>
            </div>

            <CoursePlayer />

            <CurrentLessonInfo />

            <LearningInstructor
              course={course}
            />

            <LearningOverviewBadges
              course={course}
            />

            <AddComment />

            {review && (
              <LearningReview
                name={
                  review.name
                }
                job={
                  review.job
                }
                image={
                  review.image
                }
                rating={
                  review.rating
                }
                comment={
                  review.comment
                }
              />
            )}
          </div>

          <div className="hidden w-[380px] shrink-0 xl:block">
            <CourseCurriculum
              modules={
                content.modules
              }
              totalLessons={
                course.totalLessons ??
                0
              }
            />
          </div>
        </div>
      </section>
    </LearningPlayerContext.Provider>
  );
};

export default LearningLesson;