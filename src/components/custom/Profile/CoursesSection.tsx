import React from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import type { Course } from '../../../types/profile';
import { formatCalendarDate } from './dateUtils';

interface CoursesSectionProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete?: (course: Course) => void;
  onAdd?: () => void;
}

const CoursesSection: React.FC<CoursesSectionProps> = ({
  courses,
  onEdit,
  onDelete,
  onAdd,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-h3 font-semibold text-foreground">Courses</h3>
        <button
          onClick={onAdd}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        {courses && courses.length > 0 ? (
          <div className="space-y-6">
            {courses.map((course) => (
              <div key={course.id} className="flex items-start space-x-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-sm bg-gray-100 flex items-center justify-center">
                    {course.courseLogo ? (
                      <img
                        src={course.courseLogo}
                        alt={course.name}
                        className="w-full h-full object-cover rounded-sm"
                      />  ): (
                      <div className="text-gray-400 text-sm">C</div>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{course.name}</h4>
                      <p className="text-sm text-muted-foreground">{course.provider}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatCalendarDate(course.completionDate)}
                      </p>
                      {course.skills && course.skills.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-medium text-foreground mb-2">Skills Acquired</p>
                          <ul className="space-y-1">
                            {course.skills.map((skill, index) => (
                              <li key={index} className="text-sm text-foreground flex items-start">
                                <span className="mr-2 text-primary">•</span>
                                <span>{skill}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onEdit(course)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      {onDelete && (
                        <button
                          onClick={() => onDelete(course)}
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
            Showcase the courses you've completed to highlight your knowledge, skills, and commitment to continuous learning.
          </p>
        )}
      </div>
    </div>
  );
};

export default CoursesSection;