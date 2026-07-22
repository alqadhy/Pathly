import axios from 'axios';
import type { JobApplicationMockData } from '../types/application.types';
import type { JobApplicationFormData} from '../types/application.types'
import { useApplicationsStore } from '@/store/useApplicationsStore';

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
        message: 'Application submitted and stored successfully!' 
      });
    }, 1500);
  });
};