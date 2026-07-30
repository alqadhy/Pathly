import type { CourseModule } from "./learning-content.types";
export interface Course {
  id: number;

  title: string;
  instructor: string;
  instructorEmail?: string;
  rating: number;
  reviews: string;
  description: string;
  duration: string;

  level:
    | "Beginner"
    | "Intermediate"
    | "Advanced"
    | "All Levels";

  hasCertificate: boolean;

  price: number;

  image: string;

  tag?: "Popular" | "New";

  buttonText?: string;
  onClickFn?: () => void;

  students?: number;
  about?: string;
  learn: string[];
  track: string;
  instructorImage?: string;
  category?: string;
  showProgress?: boolean;
  completedLessons?: number;
  totalLessons: number;
  status?: "draft" | "published";
  modules: CourseModule[];
}