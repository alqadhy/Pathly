import React from "react";
import { Edit2, Plus } from "lucide-react";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  onEdit?: () => void;
  onAdd?: () => void;
  className?: string;
  showEdit?: boolean;
  showAdd?: boolean;
  isPublicView?: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  children,
  onEdit,
  onAdd,
  className = "",
  showEdit = true,
  showAdd = false,
  isPublicView = false,
}) => {
  return (
    <>
      <div
        className={`bg-card rounded-lg shadow-sm p-6 border border-border transition-all duration-200 hover:shadow-md ${className}`}
      >
        <div className="flex items-center justify-between mb-4">
        <h3 className="text-h3 font-semibold text-foreground">{title}</h3>
          {!isPublicView && (
            <div className="flex items-center gap-2">
              {showAdd && onAdd && (
                <button
                  onClick={onAdd}
                  className="text-body-sm text-foreground hover:text-foreground/80 font-medium flex items-center gap-1 transition-colors duration-200"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
              {showEdit && onEdit && (
                <button
                  onClick={onEdit}
                  className="text-body-sm text-foreground hover:text-foreground/80 font-medium flex items-center gap-1 transition-colors duration-200"
                >
                 {title === "Certifications" ? "" : <Edit2 className="w-5 h-5" />} 
                </button>
              )}
            </div>
          )}
        </div>
        {children}
      </div>
    </>
  );
};

export default ProfileSection;
