export interface SavedFeed {
  id: number;
  user: {
    profilePic: string;
    name: string;
    headline: string;
    uploadTime: string;
  };
  content: string;
  feedImage?: string;
}

export interface SavedJob {
  id: number;
  companyPic: string;
  jobTitle: string;
  desc: string;
  connections?: {
    profilePic: string;
    text: string;
  };
}

export interface SavedProfile {
  id: number;
  picture: string;
  name: string;
  headline: string;
  connections?: {
    profilePic: string;
    text: string;
  };
}

export interface SavedCourse {
  id: number;
  img: string;
  title: string;
  instructor: string;
  rating: number;
  review: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  hasCertificate: boolean;
  price: number;
  tag?: "New" | "Popular";
}

export type SavedItemsCategory = "Feeds" | "Jobs" | "Profiles" | "Courses";

export interface SavedItemsType {
  feeds: SavedFeed[];
  jobs: SavedJob[];
  profiles: SavedProfile[];
  courses: SavedCourse[];
}