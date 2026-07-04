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
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
        <h3 className="text-h3 font-semibold text-foreground">Experience</h3>
        <button
          onClick={onAdd}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200 w-full sm:w-auto flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5 text-gray-600" />
          <span className="sm:hidden text-sm text-gray-600">Add Experience</span>
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
        {experience && experience.length > 0 ? (
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={exp.id || `${exp.title}-${exp.company}-${index}`} className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="shrink-0 w-full sm:w-auto flex justify-center sm:justify-start">
                  <div className="w-10 h-10 rounded-sm bg-gray-100 flex items-center justify-center">
                    {exp.companyLogo ? (
                      <img
                        src={exp.companyLogo}
                        alt={exp.company}
                        className="w-full h-full object-cover rounded-sm"
                      />
                    ) : (
                      <div className="text-gray-400 text-sm">C</div>
                    )}
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-2 sm:gap-0">
                    <div className="w-full sm:w-auto">
                      <h4 className="font-semibold text-foreground break-words">{exp.title}</h4>
                      <p className="text-sm text-muted-foreground break-words">{exp.company}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatCalendarDate(exp.startDate)} - {formatCalendarDate(exp.endDate)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 w-full sm:w-auto justify-end sm:justify-start">
                      <button
                        onClick={() => onEdit(exp)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex-1 sm:flex-none flex items-center justify-center"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                        <span className="sm:hidden ml-2 text-sm text-gray-600">Edit</span>
                      </button>
                      {onDelete && (
                        <button
                          onClick={() => onDelete(exp)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex-1 sm:flex-none flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4 text-gray-600" />
                          <span className="sm:hidden ml-2 text-sm text-gray-600">Delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {exp.description.map((item, index) => (
                      <li key={`${exp.id}-desc-${index}`} className="text-sm text-foreground flex items-start">
                        <span className="mr-2 text-primary shrink-0">•</span>
                        <span className="break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-body-md text-gray-400 leading-relaxed italic px-2 sm:px-0">
            Showcase your professional background, internships, freelance work, and achievements to strengthen your profile and attract relevant opportunities.
          </p>
        )}
      </div>
    </div>
  );
};

export default ExperienceSection;