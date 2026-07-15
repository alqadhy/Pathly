export interface Course {
  id: number;

  title: string;
  instructor: string;

  rating: number;
  reviews: string;

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

  students?: string;
  about?: string;
  learn: string[];
  track?: string;
  instructorImage?: string;
  category?: string;
showProgress?: boolean;
completedLessons?: number;
totalLessons: number;
}