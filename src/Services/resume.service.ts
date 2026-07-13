import type { ResumeRecord } from '@/types/resume.types';

const BASE = '/mocked/cv';

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}


export function fetchSeedResumes(): Promise<ResumeRecord[]> {
  return fetchJson<ResumeRecord[]>(`${BASE}/resumes.json`);
}
