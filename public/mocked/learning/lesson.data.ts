export type Lesson = {
  id: number;
  title: string;
  youtubeId: string;
  duration: string;
};

export type Module = {
  id: number;
  title: string;
  lessons: Lesson[];
};

export type CourseLessons = {
  courseId: number;
  modules: Module[];
};

export const courseLessons: CourseLessons[] = [];