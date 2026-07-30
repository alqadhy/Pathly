import { useEffect } from 'react';
import axios from 'axios';
import { useApplicationsStore } from '../store/useApplicationsStore';
import type { SubmittedApplication } from '../types/application.types';


export function useSeedApplications() {
  const seedApplications = useApplicationsStore((s) => s.seedApplications);

  useEffect(() => {
    axios
      .get<SubmittedApplication[]>('/mocked/applications/seed-applications.json')
      .then((res) => seedApplications(res.data))
      .catch((err) => console.error('Failed to load mocked applications:', err));
  }, [seedApplications]);
}