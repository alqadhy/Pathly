import React from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import type { Education } from '../../../types/profile';
import { formatCalendarDate } from './dateUtils';

interface EducationSectionProps {
  education: Education[];
  onEdit: (education: Education) => void;
  onDelete?: (education: Education) => void;
  onAdd?: () => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  onEdit,
  onDelete,
  onAdd,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-h3 font-semibold text-foreground">Education</h3>
        <button
          onClick={onAdd}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        {education && education.length > 0 ? (
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-start space-x-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-sm bg-gray-100 flex items-center justify-center">
                    {edu.institutionLogo ? (
                      <img
                        src={edu.institutionLogo}
                        alt={edu.institution}
                        className="w-full h-full object-cover rounded-sm"
                      />  ): (
                      <div className="text-gray-400 text-sm">I</div>
                    )}
                  </div>
                </div>
              
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{edu.institution}</h4>
                      <p className="text-sm text-muted-foreground">
                        {edu.degree} in {edu.fieldOfStudy}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatCalendarDate(edu.startDate)} - {formatCalendarDate(edu.endDate)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onEdit(edu)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      {onDelete && (
                        <button
                          onClick={() => onDelete(edu)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4 text-gray-600" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-body-md text-gray-400 leading-relaxed italic">
            Showcase your academic background, degrees, certifications, and areas of study to strengthen your profile and improve personalized recommendations.
          </p>
        )}
      </div>
    </div>
  );
};

export default EducationSection;