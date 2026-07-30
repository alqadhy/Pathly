import type { InstructorTransaction } from "../../../src/types/instructor.types";

export const instructorTransactions: InstructorTransaction[] = [
  {
    id: 1,
    studentName: "Ahmed Mohamed",
    studentAvatar: "/images/users/user-1.png",
    courseTitle: "React Fundamentals",
    amount: 1200,
    status: "Completed",
    date: "22 Jul 2026",
  },
  {
    id: 2,
    studentName: "Sara Ali",
    studentAvatar: "/images/users/user-2.png",
    courseTitle: "Advanced TypeScript",
    amount: 950,
    status: "Completed",
    date: "20 Jul 2026",
  },
  {
    id: 3,
    studentName: "Omar Hassan",
    studentAvatar: "/images/users/user-3.png",
    courseTitle: "UI Design",
    amount: 850,
    status: "Pending",
    date: "18 Jul 2026",
  },
  {
    id: 4,
    studentName: "Mariam Adel",
    studentAvatar: "/images/users/user-4.png",
    courseTitle: "React Fundamentals",
    amount: 1200,
    status: "Failed",
    date: "17 Jul 2026",
  },
];