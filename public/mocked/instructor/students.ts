import type { InstructorStudent } from "../../../src/types/instructor.types";

export const instructorStudents: InstructorStudent[] = [
  {
    id: 1,
    name: "Ahmed Mohamed",
    email: "ahmed@gmail.com",
    avatar: "/images/users/user-1.png",

    courseId: 1,
    courseTitle: "React Fundamentals",

    progress: 75,

    completedAssignments: 6,
    totalAssignments: 8,

    status: "Active",

    joinedAt: "12 Jul 2026",
    lastActivity: "2 hours ago",
    enrolledDate: "12 Jul 2026",
  },

  {
    id: 2,
    name: "Sara Ali",
    email: "sara@gmail.com",
    avatar: "/images/users/user-2.png",

    courseId: 2,
    courseTitle: "Advanced TypeScript",

    progress: 45,

    completedAssignments: 4,
    totalAssignments: 10,

    status: "Active",

    joinedAt: "18 Jul 2026",
    lastActivity: "Yesterday",
    enrolledDate: "18 Jul 2026",
  },
];