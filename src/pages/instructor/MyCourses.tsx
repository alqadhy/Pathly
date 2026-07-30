import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Plus } from "lucide-react";

import { instructorService } from "../../Services/instructor.service";
import { APP_ROUTES } from "../../constants";

import type { InstructorCourse } from "../../types/instructor.types";

import { Button } from "../../components/ui/button";
import CourseStats from "../../components/custom/instructor/MyCourses/CourseStats";
import InstructorCourseCard from "../../components/custom/instructor/MyCourses/InstructorCourseCard";

const MyCourses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<InstructorCourse[]>([]);

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    );

    if (!currentUser.email) return;

    setCourses(
      instructorService.getCourses(currentUser.email)
    );
  }, []);

  const totalStudents = courses.reduce(
    (sum, course) => sum + (course.students ?? 0),
    0
  );

  const totalRevenue = courses.reduce(
    (sum, course) => sum + course.revenue,
    0
  );

  const averageRating =
    courses.length > 0
      ? courses.reduce(
          (sum, course) => sum + course.rating,
          0
        ) / courses.length
      : 0;

  return (
    <section className="space-y-2xl">
      <div className="flex flex-col gap-lg md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-h2 font-bold text-text-primary">
            My Courses
          </h2>

          <p className="mt-xs text-body-md text-text-secondary">
            Manage, track and grow your course catalog.
          </p>
        </div>

        <Button
          onClick={() =>
            navigate(APP_ROUTES.instructor.addCourse)
          }
          className="flex items-center gap-sm"
        >
          <Plus size={18} />
          Add New Course
        </Button>
      </div>

      <CourseStats
        students={totalStudents}
        revenue={totalRevenue}
        courses={courses.length}
        rating={Number(
          averageRating.toFixed(1)
        )}
      />

      <div className="grid grid-cols-1 gap-xl md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <InstructorCourseCard
            key={course.id}
            {...course}
            students={course.students ?? 0}
            category={course.category ?? ""}
            totalLessons={course.totalLessons ?? 0}
            onEdit={() =>
              navigate(
                APP_ROUTES.instructor.editCourse(
                  course.id
                )
              )
            }
          />
        ))}
      </div>
    </section>
  );
};

export default MyCourses;