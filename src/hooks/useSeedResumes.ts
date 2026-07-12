import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSeedResumes } from '@/Services/resume.service';
import { useResumeStore } from '@/store/useResumeStore';


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
