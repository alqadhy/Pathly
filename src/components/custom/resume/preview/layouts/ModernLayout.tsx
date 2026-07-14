import type { CVDraft } from "@/types/cv.types";

function ModernLayout({ cv }: { cv: CVDraft }) {
  const { personalInfo, contactInfo, education, experience, skills, summary } = cv;

  return (
    <div id="cv-preview" className="w-[210mm] min-h-[297mm] bg-white font-sans text-black p-[20mm] mx-auto">
      
      {/* Header with Avatar */}
      <div className="flex items-center gap-5 mb-6">
        {personalInfo.avatarUrl && (
          <img 
            src={personalInfo.avatarUrl} 
            alt={`${personalInfo.firstName} ${personalInfo.lastName}`} 
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-wide">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.currentPosition && (
            <p className="text-sm font-medium mt-1">{personalInfo.currentPosition}</p>
          )}
          {personalInfo.industry && (
            <p className="text-xs text-gray-500 mt-0.5">{personalInfo.industry}</p>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="text-xs mb-5">
        <p>
          {[
            personalInfo.location,
            contactInfo.phoneNumber,
            contactInfo.email,
          ].filter(Boolean).join(" • ")}
        </p>
        {contactInfo.links && contactInfo.links.length > 0 && (
          <div className="flex gap-3 mt-1">
            {contactInfo.links.map((link) => (
              <a
                key={link.id}
                href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {link.label || link.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </a>
            ))}
          </div>
        )}
      </div>

      <hr className="border-gray-300 mb-5" />

      {/* Summary */}
      {summary && (
        <>
          <Section title="Professional Summary">
            <p className="text-xs leading-relaxed">{summary}</p>
          </Section>
          <hr className="border-gray-200 mb-4" />
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <Section title="Work Experience">
            <div className="space-y-4">
              {experience.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-sm">{e.jobTitle}</h3>
                    {e.yearsOfExperience && (
                      <span className="text-xs">
                        {e.yearsOfExperience} {e.yearsOfExperience === '1' ? 'year' : 'years'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium mb-1.5">{e.company}</p>
                  {e.bullets && e.bullets.length > 0 && (
                    <ul className="space-y-1">
                      {e.bullets.map((b, i) => (
                        <li key={i} className="text-xs flex gap-2">
                          <span className="text-gray-400">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Section>
          <hr className="border-gray-200 mb-4" />
        </>
      )}

      {/* Education & Skills Grid */}
      <div className="grid grid-cols-2 gap-8">
        {education.length > 0 && (
          <Section title="Education">
            <div className="space-y-2">
              {education.map((e) => (
                <div key={e.id}>
                  <p className="text-xs font-bold">{e.university}</p>
                  <p className="text-xs text-gray-500">{e.yearsOfGraduation}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {skills.length > 0 && (
          <Section title="Skills">
            <div className="space-y-1.5">
              {skills.map((s) => (
                <div key={s.id} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-black rounded-full"></span>
                  <span className="text-xs">{s.name}</span>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>

      {(!education.length || !skills.length) && education.length > 0 && (
        <Section title="Education">
          <div className="space-y-2">
            {education.map((e) => (
              <div key={e.id}>
                <p className="text-xs font-bold">{e.university}</p>
                <p className="text-xs text-gray-500">{e.yearsOfGraduation}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {(!education.length || !skills.length) && skills.length > 0 && (
        <Section title="Skills">
          <div className="space-y-1.5">
            {skills.map((s) => (
              <div key={s.id} className="flex items-center gap-2">
                <span className="w-1 h-1 bg-black rounded-full"></span>
                <span className="text-xs">{s.name}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="text-xs font-bold uppercase tracking-wider mb-2">{title}</h2>
      {children}
    </div>
  );
}

export default ModernLayout;