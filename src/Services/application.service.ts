import axios from 'axios';
import type {
  JobApplicationMockData,
  JobApplicationFormData,
  SubmittedApplication,
  ApplicationStatus,
  InterviewDetails,
} from '../types/application.types';
import { useApplicationsStore } from '../store/useApplicationsStore';

export const getJobApplicationData = async (): Promise<JobApplicationMockData> => {
  const response = await axios.get<JobApplicationMockData>('/mocked/jobs/job-application-data.json');
  return response.data;
};

export const submitJobApplication = async (
  data: JobApplicationFormData,
  jobId: string,
  jobTitle: string,
  companyName: string
): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { resumeFile, ...submissionData } = data;

      const { addApplication } = useApplicationsStore.getState();

      addApplication({
        ...submissionData,
        jobId,
        jobTitle,
        companyName,
      });

      resolve({
        success: true,
        message: 'Application submitted and stored successfully!',
      });
    }, 1500);
  });
};


export interface GetApplicationsParams {
  jobId?: string;
  search?: string;
  status?: ApplicationStatus | 'all';
  sortBy?: 'submittedAt' | 'name';
}

export const getApplications = async (
  params: GetApplicationsParams = {}
): Promise<SubmittedApplication[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { getAllApplications, getApplicationsByJobId } = useApplicationsStore.getState();
      let result = params.jobId ? getApplicationsByJobId(params.jobId) : getAllApplications();

      if (params.search) {
        const q = params.search.toLowerCase();
        result = result.filter(
          (a) => a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q)
        );
      }

      if (params.status && params.status !== 'all') {
        result = result.filter((a) => a.status === params.status);
      }

      if (params.sortBy === 'submittedAt') {
        result = [...result].sort(
          (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        );
      } else if (params.sortBy === 'name') {
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
      }

      resolve(result);
    }, 300);
  });
};

export const getApplicationById = async (
  id: string
): Promise<SubmittedApplication | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(useApplicationsStore.getState().getApplicationById(id));
    }, 150);
  });
};

export const updateApplicationStatus = async (
  id: string,
  status: ApplicationStatus
): Promise<SubmittedApplication | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      useApplicationsStore.getState().updateApplicationStatus(id, status);
      resolve(useApplicationsStore.getState().getApplicationById(id));
    }, 300);
  });
};

export const scheduleInterview = async (
  id: string,
  interviewDetails: InterviewDetails
): Promise<SubmittedApplication | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      useApplicationsStore.getState().scheduleInterview(id, interviewDetails);
      resolve(useApplicationsStore.getState().getApplicationById(id));
    }, 300);
  });
};

export const sendApplicationMessage = async (
  id: string,
  subject: string,
  body: string
): Promise<{ success: true }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mock message sent to application', id, { subject, body });
      resolve({ success: true });
    }, 300);
  });
};