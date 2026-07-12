export type TemplateTag = 'Simple' | 'ATS Friendly' | 'Popular' | 'Professional' | 'Modern' | 'Creative';

export interface Template {
  id: string;
  name: string;
  tags: TemplateTag[];
  thumbnail: string; // path under /src/assets/images/templates
  layoutType: 'simple' | 'professional' | 'modern'; // controls which Preview layout component renders it
  hasPhoto: boolean; // whether this template shows an avatar (Alexander/Andreea templates have photos)
}
