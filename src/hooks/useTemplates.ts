import { useQuery } from '@tanstack/react-query';
import { fetchTemplates } from '@/Services/template.service';

export function useTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: fetchTemplates,
    staleTime: Infinity, // static mock data, no need to refetch/invalidate
  });
}
