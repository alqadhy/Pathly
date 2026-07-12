export type TemplateTag = 'Simple' | 'ATS Friendly' | 'Popular' | 'Professional' | 'Modern' | 'Creative';

export interface Template {
  id: string;
  name: string;
  tags: TemplateTag[];
  thumbnail: string; 
  layoutType: 'simple' | 'professional' | 'modern'; 
  hasPhoto: boolean; 
}
