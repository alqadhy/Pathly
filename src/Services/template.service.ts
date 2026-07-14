import type { Template } from '@/types/template.types';

const BASE = '/mocked/cv';

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export function fetchTemplates(): Promise<Template[]> {
  return fetchJson<Template[]>(`${BASE}/templetes.json`);
}
