import type { CVDraft } from "@/types/cv.types";

function ProfessionalLayout({ cv }: { cv: CVDraft }) {
  const { personalInfo, contactInfo, education, experience, skills, summary } = cv;

  return (
    <div id="cv-preview" className="w-[210mm] min-h-[297mm] bg-white font-sans text-black p-[20mm] mx-auto">
      
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-lg font-bold uppercase tracking-wide">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        
        <div className="text-xs mt-1.5 space-y-0.5">
          {personalInfo.currentPosition && <p>{personalInfo.currentPosition}</p>}
          <p>
            {[
              personalInfo.location,
              contactInfo.phoneNumber,
              contactInfo.email,
            ].filter(Boolean).join(" • ")}
          </p>
          {contactInfo.links?.map((link) => (
            <a
              key={link.id}
              href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline block"
            >
              {link.label || link.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </a>
          ))}
        </div>
      </div>

      <hr className="border-gray-300 mb-4" />

      {/* Summary */}
      {summary && (
        <>
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wide mb-1.5">Professional Summary</h2>
            <p className="text-xs leading-relaxed">{summary}</p>
          </div>
          <hr className="border-gray-200 mb-4" />
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wide mb-2">Professional Experience</h2>
            {experience.map((e) => (
              <div key={e.id} className="mb-2.5">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-xs">{e.jobTitle}</h3>
                  {e.yearsOfExperience && (
                    <span className="text-xs">{e.yearsOfExperience} yrs</span>
                  )}
                </div>
                <p className="text-xs italic">{e.company}</p>
                {e.bullets && e.bullets.length > 0 && (
                  <ul className="list-disc list-inside mt-1 text-xs">
                    {e.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <hr className="border-gray-200 mb-4" />
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <div className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wide mb-1.5">Education</h2>
            {education.map((e) => (
              <div key={e.id} className="flex justify-between text-xs mb-1">
                <span>{e.university}</span>
                <span>{e.yearsOfGraduation}</span>
              </div>
            ))}
          </div>
          <hr className="border-gray-200 mb-4" />
        </>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wide mb-1.5">Skills</h2>
          <p className="text-xs">
            {skills.map((s) => s.name).join(" • ")}
          </p>
        </div>
      )}

    </div>
  );
}

export default ProfessionalLayout;