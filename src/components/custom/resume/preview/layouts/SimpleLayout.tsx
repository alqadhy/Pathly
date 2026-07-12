import type { CVDraft } from "@/types/cv.types";

function SimpleLayout({ cv }: { cv: CVDraft }) {
  const { personalInfo, contactInfo, education, experience, skills, summary } = cv;

  return (
    <div id="cv-preview" className="w-[210mm] min-h-[297mm]  p-[20mm] font-sans text-(--text-primary) text-sm leading-relaxed flex flex-col">
     
      <div>
        <h1 className="text-xl font-bold uppercase">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        
     
        {personalInfo.currentPosition && (
          <p className="text-(--muted-foreground) font-medium">{personalInfo.currentPosition}</p>
        )}
        
        <p className="text-(--muted-foreground) mt-1">
          {[
            personalInfo.location,
            contactInfo.phoneNumber,
            contactInfo.email
          ].filter(Boolean).join(" • ")}
        </p>
        
      
        {contactInfo.links && contactInfo.links.length > 0 && (
          <div className="flex gap-2 mt-1 text-(--muted-foreground)">
            {contactInfo.links.map((link) => (
              <a 
                key={link.id} 
                href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-(--primary) underline"
              >
                {link.label || link.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </a>
            ))}
          </div>
        )}

     
        {personalInfo.industry && (
          <p className="text-(--muted-foreground) text-xs mt-1">Industry: {personalInfo.industry}</p>
        )}
      </div>

    
      {summary && (
        <Section title="Professional Summary">
          <p>{summary}</p>
        </Section>
      )}

    
      {skills.length > 0 && (
        <Section title="Skills">
          <ul className="grid grid-cols-2 gap-x-4 list-disc list-inside">
            {skills.map((s) => (
              <li key={s.id}>{s.name}</li>
            ))}
          </ul>
        </Section>
      )}

  
      {experience.length > 0 && (
        <Section title="Professional Experience">
          {experience.map((e) => (
            <div key={e.id} className="mb-3">
              <div className="flex justify-between font-semibold">
                <span>{e.jobTitle}</span>
                {e.yearsOfExperience && (
                  <span className="text-(--muted-foreground) font-normal">
                    {e.yearsOfExperience} {e.yearsOfExperience === '1' ? 'year' : 'years'}
                  </span>
                )}
              </div>
              <p className="text-(--muted-foreground)">{e.company}</p>
              {e.bullets && e.bullets.length > 0 && (
                <ul className="list-disc list-inside mt-1">
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

    
      {education.length > 0 && (
        <Section title="Education">
          {education.map((e) => (
            <div key={e.id} className="flex justify-between mb-1">
              <span className="font-medium">{e.university}</span>
              <span className="text-(--muted-foreground)">{e.yearsOfGraduation}</span>
            </div>
          ))}
        </Section>
      )}

     
      <div className="flex-1" />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <h2 className="text-sm font-bold uppercase border-b border-(--border) pb-1 mb-3">{title}</h2>
      {children}
    </div>
  );
}

export default SimpleLayout;