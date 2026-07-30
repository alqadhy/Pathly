import jobPosts from "../../public/mocked/applications/job-posts.json";

export type ApplicationStatus = "active" | "draft" | "closed";
export type WorkType = "Remote" | "Hybrid" | "On-site";
export type Department = "Design" | "Engineering" | "Marketing" | "HR";

export interface JobPost {
  id: number;
  company: {
    name: string;
    companyLogo: string;
  };
  title: string;
  location: string;
  postedAt: {
    text: string;
    date: string;
  };
  totalApplications: number;
  workType: {
    type: WorkType;
    time: string;
    location: string;
  };
  deadline: string;
  status: ApplicationStatus;
  department: Department;
}

// Simulated network latency so loading states have something real to show.
const SIMULATED_DELAY_MS = 500;

function delay<T>(value: T, ms = SIMULATED_DELAY_MS): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

export const applicationsService = {
  async getApplications(): Promise<JobPost[]> {
    try {
      return await delay(jobPosts as JobPost[]);
    } catch (error) {
      throw new Error("Failed to fetch applications");
    }
  },
};
