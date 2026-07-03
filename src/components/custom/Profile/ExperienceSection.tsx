import React from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import type { Experience } from '../../../types/profile';
import { formatCalendarDate } from './dateUtils';

interface ExperienceSectionProps {
  experience: Experience[];
  onEdit: (experience: Experience) => void;
  onDelete?: (experience: Experience) => void;
  onAdd?: () => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  onEdit,
  onDelete,
  onAdd,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-h3 font-semibold text-foreground">Experience</h3>
        <button
          onClick={onAdd}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        {experience && experience.length > 0 ? (
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={exp.id || `${exp.title}-${exp.company}-${index}`} className="flex items-start space-x-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-sm bg-gray-100 flex items-center justify-center">
                    {exp.companyLogo ? (
                      <img
                        src={exp.companyLogo}
                        alt={exp.company}
                        className="w-full h-full object-cover rounded-sm"
                      />  ): (
                      <div className="text-gray-400 text-sm">C</div>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{exp.title}</h4>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatCalendarDate(exp.startDate)} - {formatCalendarDate(exp.endDate)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onEdit(exp)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      {onDelete && (
                        <button
                          onClick={() => onDelete(exp)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4 text-gray-600" />
                        </button>
                      )}
                    </div>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {exp.description.map((item, index) => (
                      <li key={`${exp.id}-desc-${index}`} className="text-sm text-foreground flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-body-md text-gray-400 leading-relaxed italic">
            Showcase your professional background, internships, freelance work, and achievements to strengthen your profile and attract relevant opportunities.
          </p>
        )}
      </div>
    </div>
  );
};

export default ExperienceSection;