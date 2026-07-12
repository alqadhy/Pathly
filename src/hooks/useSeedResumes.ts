import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSeedResumes } from '@/Services/resume.service';
import { useResumeStore } from '@/store/useResumeStore';

/**
 * Call this once near the app root (e.g. in App.tsx or DashboardLayout).
 * Fetches /public/mock/resumes.json and hydrates useResumeStore, but only
 * if the store is still empty — so it never overwrites what the user has
 * already saved to localStorage in a real session.
 */
export function useSeedResumes() {
  const hydrateSeed = useResumeStore((s) => s.hydrateSeed);

  const query = useQuery({
    queryKey: ['seed-resumes'],
    queryFn: fetchSeedResumes,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (query.data) {
      hydrateSeed(query.data);
    }
  }, [query.data, hydrateSeed]);

  return query;
}
