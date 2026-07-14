const templateImages = import.meta.glob<{ default: string }>(
  '../assets/imgs/cv/templetes/*.{png,jpg,jpeg}',
  { eager: true }
);

const resumeImages = import.meta.glob<{ default: string }>(
  '../assets/imgs/cv/resumes/*.{png,jpg,jpeg}',
  { eager: true }
);


const resumeIdToFile: Record<string, string> = {
  "resume-1": "main3.png",
  "resume-2": "main2.jpg",
  "resume-3": "main4.png",
};

export function getTemplateThumbnail(id: string): string | undefined {
  const key = `../assets/imgs/cv/templetes/${id}.png`;
  if (templateImages[key]) return templateImages[key]?.default;
  
  const jpgKey = `../assets/imgs/cv/templetes/${id}.jpg`;
  return templateImages[jpgKey]?.default;
}

export function getResumeThumbnail(id: string): string | undefined {
  const filename = resumeIdToFile[id];
  if (!filename) return undefined;
  
  const key = `../assets/imgs/cv/resumes/${filename}`;
  return resumeImages[key]?.default;
}