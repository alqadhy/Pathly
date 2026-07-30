import { CircleCheck, PlayCircle } from "lucide-react";

import type { Course } from "../../../../types/courses.types";
import type { CourseModule } from "../../../../types/learning-content.types";

type Props = {
  course: Course & {
    modules?: CourseModule[];
  };
};

const LearningOverview = ({ course }: Props) => {
  return (
    <div className="p-md">

      {/* ABOUT */}
      <div>
        <p className="mt-lg text-h4 font-bold text-text-primary">
          About This Course
        </p>

        <p className="max-w-[980px] text-h4 leading-[190%] text-dark">
          {course.about}
        </p>
      </div>


      {/* LEARN */}
      {course.learn?.length > 0 && (
        <div className="mt-xl">

          <p className="mb-sm text-h4 font-bold text-text-primary">
            You will learn
          </p>


          <div className="space-y-sm">

            {course.learn.map((item) => (
              <div
                key={item}
                className="flex items-center gap-sm"
              >
                <CircleCheck
                  size={22}
                  className="fill-primary text-text-light"
                />

                <span className="text-[22px] text-dark">
                  {item}
                </span>

              </div>
            ))}

          </div>

        </div>
      )}



      {/* COURSE CONTENT */}
      {course.modules &&
        course.modules.length > 0 && (

        <div className="mt-2xl">

          <p className="mb-lg text-h4 font-bold text-text-primary">
            Course Content
          </p>


          <div className="space-y-lg">

            {course.modules.map((module) => (

              <div
                key={module.id}
                className="rounded-xl border border-border bg-card p-lg"
              >

                <h3 className="mb-md text-h5 font-bold text-text-primary">
                  {module.title}
                </h3>


                <div className="space-y-sm">

                  {module.lessons.map((lesson) => (

                    <div
                      key={lesson.id}
                      className="flex items-center justify-between rounded-lg bg-background p-md"
                    >

                      <div className="flex items-center gap-sm">

                        <PlayCircle
                          size={22}
                          className="text-primary"
                        />

                        <div>

                          <p className="font-semibold text-text-primary">
                            {lesson.title}
                          </p>


                          <p className="text-sm text-text-secondary">
                            {lesson.description}
                          </p>

                        </div>

                      </div>


                      <span className="text-sm text-text-secondary">
                        {lesson.duration}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
};

export default LearningOverview;