import { useResumeStore } from '@/store/useResumeStore';

export function useResumes() {
  const resumes = useResumeStore((s) => s.resumes);
  const saveResume = useResumeStore((s) => s.saveResume);
  const deleteResume = useResumeStore((s) => s.deleteResume);
  const duplicateResume = useResumeStore((s) => s.duplicateResume);
  const getResumeById = useResumeStore((s) => s.getResumeById);

  return { resumes, saveResume, deleteResume, duplicateResume, getResumeById };
}
