export type LearningCourse = {
  id: string;

  title: string;

  instructor: string;

  category: string;

  level: string;

  duration: string;

  price: number;

  discount?: number;

  rating: number;

  students: string;

  thumbnail: string;

  videoUrl: string;

  description: string;

  certificate: boolean;

  learn: string[];
};