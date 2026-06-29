import type { Course } from "../types/courses.types";

import webDevImg     from "@/assets/imgs/coursesSection1.png";
import pythonImg     from "@/assets/imgs/CoursesSection2.png";
import reactImg      from "@/assets/imgs/CoursesSection3.png";
import javascriptImg from "@/assets/imgs/CoursesSection4.png";

const courseImages = {
  webDev:     webDevImg,
  python:     pythonImg,
  react:      reactImg,
  javascript: javascriptImg,
};

export const courses: Course[] = [
  {
    id: 1,
    title: "Web Development Bootcamp",
    instructor: "Mohamad Karim",
    rating: 4,
    reviews: "3.2k",
    duration: "12 weeks",
    level: "Beginner",
    hasCertificate: true,
    price: 1500,
    image: courseImages.webDev,
  },
  {
    id: 2,
    title: "Data Science & AI Mastery",
    instructor: "Sara Ahmed",
    rating: 4.8,
    reviews: "1.8k",
    duration: "16 weeks",
    level: "Intermediate",
    hasCertificate: true,
    price: 1499,
    image: courseImages.python,
  },
  {
    id: 3,
    title: "Advanced React.js Strategies",
    instructor: "John Doe",
    rating: 4.7,
    reviews: "950",
    duration: "8 weeks",
    level: "Advanced",
    hasCertificate: false,
    price: 1299,
    image: courseImages.react,
  },
  {
    id: 4,
    title: "Javascript Mastery",
    instructor: "Dr. Emily",
    rating: 5,
    reviews: "3.1k",
    duration: "6 weeks",
    level: "All Levels",
    hasCertificate: true,
    price: 2499,
    image: courseImages.javascript,
  },
];