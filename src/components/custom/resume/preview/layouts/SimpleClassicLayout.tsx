import type { CVDraft } from "@/types/cv.types";

function SimpleClassicLayout({ cv }: { cv: CVDraft }) {
  const { personalInfo, contactInfo, education, experience, skills, summary } = cv;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white font-sans text-(--text-primary) flex flex-col">
      {/* Header with background */}
      <div className="bg-(--primary) text-white px-[20mm] py-[10mm]">
        <h1 className="text-3xl font-bold tracking-wide">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        
        {personalInfo.currentPosition && (
          <p className="text-lg font-light mt-2 opacity-90">{personalInfo.currentPosition}</p>
        )}
        
        {personalInfo.industry && (
          <p className="text-sm opacity-75 mt-1">{personalInfo.industry}</p>
        )}
      </div>

      {/* Main Content - takes available space */}
      <div className="flex-1 px-[20mm] py-[8mm] text-sm leading-relaxed">
        
        {/* Contact Bar */}
        <div className="flex flex-wrap gap-4 text-xs bg-gray-50 p-4 rounded-lg -mt-[15mm] relative z-10 shadow-sm">
          {personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <span className="text-(--primary) font-semibold">📍</span>
              <span>{personalInfo.location}</span>
            </div>
          )}
          {contactInfo.email && (
            <div className="flex items-center gap-1.5">
              <span className="text-(--primary) font-semibold">✉️</span>
              <span>{contactInfo.email}</span>
            </div>
          )}
          {contactInfo.phoneNumber && (
            <div className="flex items-center gap-1.5">
              <span className="text-(--primary) font-semibold">📞</span>
              <span>{contactInfo.phoneNumber}</span>
            </div>
          )}
          {contactInfo.links?.map((link) => (
            <div key={link.id} className="flex items-center gap-1.5">
              <span className="text-(--primary) font-semibold">🔗</span>
              <a 
                href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-(--primary) underline"
              >
                {link.label || link.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </a>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Left Column - 2/3 width */}
          <div className="col-span-2 space-y-6">
            {/* Summary */}
            {summary && (
              <Section title="Professional Summary">
                <p className="text-gray-600 leading-relaxed">{summary}</p>
              </Section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <Section title="Work Experience">
                <div className="space-y-4">
                  {experience.map((e) => (
                    <div key={e.id} className="border-l-2 border-(--primary) pl-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-base">{e.jobTitle}</h3>
                          <p className="text-(--primary) font-medium text-sm">{e.company}</p>
                        </div>
                        {e.yearsOfExperience && (
                          <span className="text-xs bg-(--primary) text-white px-2 py-1 rounded-full whitespace-nowrap">
                            {e.yearsOfExperience} {e.yearsOfExperience === '1' ? 'yr' : 'yrs'}
                          </span>
                        )}
                      </div>
                      {e.bullets && e.bullets.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {e.bullets.map((b, i) => (
                            <li key={i} className="text-gray-600 flex gap-2">
                              <span className="text-(--primary) mt-1">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <Section title="Education" icon="🎓">
                <div className="space-y-3">
                  {education.map((e) => (
                    <div key={e.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                      <span className="font-semibold">{e.university}</span>
                      <span className="text-(--primary) text-xs font-medium">{e.yearsOfGraduation}</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Skills */}
            {skills.length > 0 && (
              <Section title="Skills">
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span 
                      key={s.id} 
                      className="bg-(--primary)/10 text-(--primary) px-3 py-1.5 rounded-full text-xs font-medium"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </Section>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer - always at bottom */}
      <div className="px-[20mm] py-[5mm] bg-gray-50 text-center text-xs text-gray-400 border-t mt-auto">
        {personalInfo.firstName} {personalInfo.lastName} • {personalInfo.currentPosition || personalInfo.industry || 'Professional CV'}
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon?: string; children: React.ReactNode }) {
  return (
    <div id="cv-preview">
      <h2 className="flex items-center gap-2 text-base font-bold uppercase text-(--primary) mb-3">
        {icon && <span className="text-lg">{icon}</span>}
        <span className="border-b-2 border-(--primary) pb-1">{title}</span>
      </h2>
      {children}
    </div>
  );
}

export default SimpleClassicLayout;