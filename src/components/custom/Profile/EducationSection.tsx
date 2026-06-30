import React from 'react';
import ProfileSection from './ProfileSection';
import type { Education } from '../../../types/profile';
import { GraduationCap, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface EducationSectionProps {
  education: Education[];
  onEdit: () => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  onEdit,
}) => {
  return (
    <ProfileSection title="Education" onEdit={onEdit}>
      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="flex items-start space-x-3">
            <div className="p-2 bg-info-light rounded-lg">
              <GraduationCap className="w-5 h-5 text-info" />
            </div>
            <div>
              <p className="font-medium text-foreground">{edu.institution}</p>
              <p className="text-body-md text-muted-foreground">
                {edu.degree} in {edu.fieldOfStudy}
              </p>
              <div className="flex items-center mt-1 text-body-sm text-muted-foreground">
                <Calendar className="w-3 h-3 mr-1" />
                <span>
                  {format(new Date(edu.startDate), 'MMM yyyy')} -{' '}
                  {format(new Date(edu.endDate), 'MMM yyyy')}
                </span>
                {edu.gpa && (
                  <>
                    <span className="mx-2">•</span>
                    <span>GPA: {edu.gpa}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ProfileSection>
  );
};

export default EducationSection;