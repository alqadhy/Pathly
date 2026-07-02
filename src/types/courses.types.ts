export interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  reviews: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  hasCertificate: boolean;
  price: number;
  image: string;
  tag?: "Popular" | "New";
}
