import React from 'react';
import ProfileSection from './ProfileSection';
import type { Experience } from '../../../types/profile';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface ExperienceSectionProps {
  experience: Experience[];
  onEdit: () => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  onEdit,
}) => {
  return (
    <ProfileSection title="Experience" onEdit={onEdit}>
      <div className="space-y-6">
        {experience.map((exp) => (
          <div key={exp.id} className="border-l-2 border-primary pl-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-foreground">{exp.title}</h4>
                <p className="text-body-md text-muted-foreground">{exp.company}</p>
                <span className="text-body-sm text-muted-foreground">{exp.employmentType}</span>
              </div>
              <div className="flex items-center text-body-sm text-muted-foreground whitespace-nowrap ml-4">
                <Calendar className="w-3 h-3 mr-1" />
                <span>
                  {format(new Date(exp.startDate), 'MMM yyyy')} -{' '}
                  {format(new Date(exp.endDate), 'MMM yyyy')}
                </span>
              </div>
            </div>
            <ul className="mt-2 space-y-1">
              {exp.description.map((item, index) => (
                <li key={index} className="text-body-sm text-foreground flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ProfileSection>
  );
};

export default ExperienceSection;