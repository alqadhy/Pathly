export interface CourseLesson {
  id: number;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  isPreview: boolean;
}


export interface CourseModule {
  id: number;
  title: string;
  lessons: CourseLesson[];
}