import React from 'react';
import { Edit2 } from 'lucide-react';

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  onEdit?: () => void;
  className?: string;
  showEdit?: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  children,
  onEdit,
  className = '',
  showEdit = true,
}) => {
  return (
    <div className={`bg-card rounded-lg shadow-sm p-6 border border-border transition-all duration-200 hover:shadow-md ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-h3 font-semibold text-foreground">{title}</h3>
        {showEdit && onEdit && (
          <button
            onClick={onEdit}
            className="text-body-sm text-primary hover:text-primary-hover font-medium flex items-center gap-1 transition-colors duration-200"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default ProfileSection;