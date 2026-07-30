export interface Enrollment {
  id: number;

  studentEmail: string;

  studentName: string;

  courseId: number;

  courseTitle: string;

  instructorEmail: string;

  joinedAt: string;

  progress: number;
}


const KEY = "learning.enrollments";


export const getEnrollments = (): Enrollment[] => {
  return JSON.parse(
    localStorage.getItem(KEY) || "[]"
  );
};



export const getUserEnrollments = (
  email: string
): Enrollment[] => {

  const enrollments = getEnrollments();

  return enrollments.filter(
    (item) =>
      item.studentEmail === email
  );
};



export const enrollStudent = (
  course: any
) => {

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );


  if (!currentUser.email) return;


  const enrollments = getEnrollments();


  const alreadyEnrolled =
    enrollments.some(
      (item) =>
        item.studentEmail === currentUser.email &&
        item.courseId === course.id
    );


  if (alreadyEnrolled) return;



  const newEnrollment: Enrollment = {

    id: Date.now(),

    studentEmail:
      currentUser.email,

    studentName:
      currentUser.name || "Student",

    courseId:
      course.id,

    courseTitle:
      course.title,

    instructorEmail:
      course.instructorEmail,

    joinedAt:
      new Date().toISOString(),

    progress: 0,
  };


  localStorage.setItem(
    KEY,
    JSON.stringify([
      ...enrollments,
      newEnrollment,
    ])
  );
};