import React from 'react';
import ProfileSection from './ProfileSection';
import type{ Course } from '../../../types/profile';
import { BookOpen, Calendar, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface CoursesSectionProps {
  courses: Course[];
  onEdit: () => void;
}

const CoursesSection: React.FC<CoursesSectionProps> = ({ courses, onEdit }) => {
  return (
    <ProfileSection title="Courses" onEdit={onEdit}>
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="border border-border rounded-lg p-4 bg-background">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-secondary-light rounded-lg">
                  <BookOpen className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{course.name}</h4>
                  <p className="text-body-sm text-muted-foreground">{course.provider}</p>
                  <div className="flex items-center mt-1 text-body-sm text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>Completed {format(new Date(course.completionDate), 'MMM yyyy')}</span>
                  </div>
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            {course.skills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {course.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground rounded text-body-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </ProfileSection>
  );
};

export default CoursesSection;