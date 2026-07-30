import type { InstructorCourse } from "../types/instructor.types";
import type { Course } from "../types/courses.types";

import {
  addInstructorCourse,
  deleteInstructorCourse,
  getAllInstructorCourses,
  getInstructorCourse,
  getInstructorCourses,
  updateInstructorCourse,
} from "../utils/instructorStorage";

export const mapInstructorCourseToLearningCourse = (
  course: InstructorCourse
): Course => ({
  id: course.id,

  title: course.title,

  instructor: course.instructor,

  instructorEmail: course.instructorEmail,

  rating: course.rating,

  reviews: course.reviews,

  description: course.description,

  duration: course.duration,

  level: course.level,

  hasCertificate: course.hasCertificate,

  price: course.price,

  image: course.image,

  tag: course.tag,

  students: course.students,

  about: course.about,

  learn: course.learn,

  track: course.track,

  instructorImage: course.instructorImage,

  category: course.category,

  totalLessons: course.totalLessons,

  status: course.status,

  showProgress: false,
  modules: course.modules,

});
export const instructorService = {
  
  getCourses(email: string) {
    return getInstructorCourses(email);
  },

  getCourse(
    email: string,
    courseId: number
  ) {
    return getInstructorCourse(
      email,
      courseId
    );
  },

  getPublishedCourses() {
    return getAllInstructorCourses().filter(
      (course) => course.published
    );
  },

  addCourse(
    email: string,
    course: InstructorCourse
  ) {
    addInstructorCourse(email, course);
  },

  updateCourse(
    email: string,
    course: InstructorCourse
  ) {
    updateInstructorCourse(
      email,
      course
    );
  },

  deleteCourse(
    email: string,
    courseId: number
  ) {
    deleteInstructorCourse(
      email,
      courseId
    );
  },
  
  publishCourse(
  email: string,
  courseId: number
) {
  const course = getInstructorCourse(
    email,
    courseId
  );

  if (!course) return;

  updateInstructorCourse(
    email,
    {
      ...course,
      published: true,
      status: "published",
    }
  );
},

incrementStudents(
  email: string,
  courseId: number
) {
  const course = getInstructorCourse(
    email,
    courseId
  );

  if (!course) return;

  updateInstructorCourse(
    email,
    {
      ...course,
      students: (course.students ?? 0) + 1,
    }
  );
},
};