import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  scheduleInterview,
  sendApplicationMessage,
  
} from '../Services/application.service';
import type {GetApplicationsParams}from '../Services/application.service'
import type { ApplicationStatus, InterviewDetails } from '../types/application.types';

export const applicationsKeys = {
  all: ['applications'] as const,
  list: (params: GetApplicationsParams) => [...applicationsKeys.all, 'list', params] as const,
  detail: (id: string) => [...applicationsKeys.all, 'detail', id] as const,
};

export function useApplications(params: GetApplicationsParams) {
  return useQuery({
    queryKey: applicationsKeys.list(params),
    queryFn: () => getApplications(params),
  });
}

export function useApplication(id: string | null) {
  return useQuery({
    queryKey: applicationsKeys.detail(id ?? ''),
    queryFn: () => getApplicationById(id as string),
    enabled: !!id,
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApplicationStatus }) =>
      updateApplicationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationsKeys.all });
    },
  });
}

export function useScheduleInterview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, interviewDetails }: { id: string; interviewDetails: InterviewDetails }) =>
      scheduleInterview(id, interviewDetails),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationsKeys.all });
    },
  });
}

export function useSendApplicationMessage() {
  return useMutation({
    mutationFn: ({ id, subject, body }: { id: string; subject: string; body: string }) =>
      sendApplicationMessage(id, subject, body),
  });
}