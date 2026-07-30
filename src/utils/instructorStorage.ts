import type { InstructorCourse } from "../types/instructor.types";

const STORAGE_KEY = "instructorCourses";

export const getAllInstructorCourses =
  (): InstructorCourse[] => {
    const data =
      localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
  };

const saveAllCourses = (
  courses: InstructorCourse[]
) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(courses)
  );
};

export const addInstructorCourse = (
  instructorEmail: string,
  course: InstructorCourse
) => {
  const courses =
    getAllInstructorCourses();

  courses.push({
    ...course,
    instructorEmail,
  });

  saveAllCourses(courses);
};

export const getInstructorCourses = (
  instructorEmail: string
) => {
  return getAllInstructorCourses().filter(
    (course) =>
      course.instructorEmail ===
      instructorEmail
  );
};

export const getInstructorCourse = (
  instructorEmail: string,
  courseId: number
) => {
  return getAllInstructorCourses().find(
    (course) =>
      course.id === courseId &&
      course.instructorEmail ===
        instructorEmail
  );
};

export const updateInstructorCourse = (
  instructorEmail: string,
  updatedCourse: InstructorCourse
) => {
  const courses =
    getAllInstructorCourses();

  const index = courses.findIndex(
    (course) =>
      course.id === updatedCourse.id &&
      course.instructorEmail ===
        instructorEmail
  );

  if (index === -1) return;

  courses[index] = {
    ...courses[index],
    ...updatedCourse,
  };

  saveAllCourses(courses);
};

export const deleteInstructorCourse = (
  instructorEmail: string,
  courseId: number
) => {
  const courses =
    getAllInstructorCourses().filter(
      (course) =>
        !(
          course.id === courseId &&
          course.instructorEmail ===
            instructorEmail
        )
    );

  saveAllCourses(courses);
};