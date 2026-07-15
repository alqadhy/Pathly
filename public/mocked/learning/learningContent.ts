export type LearningLesson = {
  id: number;
  order: number;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
  duration: string;
  isPreview: boolean;
};

export type LearningModule = {
  id: number;
  title: string;
  lessons: LearningLesson[];
};

export type LearningContent = {
  courseId: number;
  modules: LearningModule[];
};

const defaultModules: LearningModule[] = [
  {
    id: 1,
    title: "Introduction",
    lessons: [
      {
        id: 1,
        order: 1,
        title: "Course Introduction",
        description: "Welcome to the course and learning roadmap.",
        youtubeId: "Ke90Tje7VS0",
        thumbnail:
          "https://img.youtube.com/vi/Ke90Tje7VS0/maxresdefault.jpg",
        duration: "04:20",
        isPreview: true,
      },
      {
        id: 2,
        order: 2,
        title: "Environment Setup",
        description: "Prepare your development environment.",
        youtubeId: "UB1O30fR-EE",
        thumbnail:
          "https://img.youtube.com/vi/UB1O30fR-EE/maxresdefault.jpg",
        duration: "09:30",
        isPreview: true,
      },
      {
        id: 3,
        order: 3,
        title: "First Practical Example",
        description: "Build your first example.",
        youtubeId: "mU6anWqZJcc",
        thumbnail:
          "https://img.youtube.com/vi/mU6anWqZJcc/maxresdefault.jpg",
        duration: "15:45",
        isPreview: false,
      },
    ],
  },

  {
    id: 2,
    title: "Core Concepts",
    lessons: [
      {
        id: 4,
        order: 4,
        title: "Core Concept 1",
        description: "Understand the first core concept.",
        youtubeId: "hdI2bqOjy3c",
        thumbnail:
          "https://img.youtube.com/vi/hdI2bqOjy3c/maxresdefault.jpg",
        duration: "13:10",
        isPreview: false,
      },
      {
        id: 5,
        order: 5,
        title: "Core Concept 2",
        description: "Deep dive into the second concept.",
        youtubeId: "PkZNo7MFNFg",
        thumbnail:
          "https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
        duration: "18:20",
        isPreview: false,
      },
      {
        id: 6,
        order: 6,
        title: "Practice",
        description: "Hands-on practice session.",
        youtubeId: "JJSoEo8JSnc",
        thumbnail:
          "https://img.youtube.com/vi/JJSoEo8JSnc/maxresdefault.jpg",
        duration: "21:40",
        isPreview: false,
      },
    ],
  },

  {
    id: 3,
    title: "Projects",
    lessons: [
      {
        id: 7,
        order: 7,
        title: "Mini Project",
        description: "Apply what you've learned.",
        youtubeId: "1PnVor36_40",
        thumbnail:
          "https://img.youtube.com/vi/1PnVor36_40/maxresdefault.jpg",
        duration: "25:00",
        isPreview: false,
      },
      {
        id: 8,
        order: 8,
        title: "Final Project",
        description: "Build the final project.",
        youtubeId: "w7ejDZ8SWv8",
        thumbnail:
          "https://img.youtube.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
        duration: "32:15",
        isPreview: false,
      },
    ],
  },
];

export const learningContent: LearningContent[] = Array.from(
  { length: 29 },
  (_, index) => ({
    courseId: index + 1,
    modules: structuredClone(defaultModules),
  })
);