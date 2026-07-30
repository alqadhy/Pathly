import type { Course } from "./courses.types";
import type { CourseModule } from "./learning-content.types";

export interface InstructorCourse extends Course {
  instructorEmail: string;
  revenue: number;
  published: boolean;
}

export interface InstructorStudent {
  id: number;
  name: string;
  email: string;
  avatar: string;
  courseId: number;
  courseTitle: string;
  progress: number;
  completedAssignments: number;
  totalAssignments: number;
  status: "Active" | "Completed" | "Frozen" | "Dropped";
  joinedAt: string;
  lastActivity: string;
  enrolledDate: string;
}

export interface InstructorTransaction {
  id: number;
  instructorEmail: string;
  studentName: string;
  studentEmail: string;
  studentAvatar: string;
  courseTitle: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  date: string;
}

export interface InstructorPayment {
  upcomingPayout: number;
  payoutDate: string;
  cardHolder: string;
  cardNumber: string;
  expiry: string;
}

export interface InstructorRevenuePoint {
  month: string;
  income: number;
}

export interface AddCourseFormData {
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  price: number;
  image: string;

  learningObjectives: string[];

  assignments: string[];
  tasks: string[];

modules: CourseModule[];
}
