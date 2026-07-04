import React from "react";
import ProfileSection from "./ProfileSection";
import type { Certification } from "../../../types/profile";
import { BadgeCheck, Calendar, Edit2, Trash2 } from "lucide-react";
import { formatCalendarDate } from "./dateUtils";

interface CertificationsSectionProps {
  certifications: Certification[];
  onEdit: (cert?: Certification) => void;
  onAdd?: () => void;
  onDelete?: (cert: Certification) => void;
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  onEdit,
  onAdd,
  onDelete,
}) => {
  return (
    <ProfileSection
      title="Certifications"
      onEdit={onEdit}
      onAdd={onAdd}
      showAdd={true}
    >
      {certifications && certifications.length > 0 ? (
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div key={cert.id || `${cert.name}-${index}`} className="flex flex-col sm:flex-row items-start justify-between sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 p-3 sm:p-0 border-b sm:border-b-0 border-gray-100 last:border-b-0">
              <div className="flex items-start sm:items-center space-x-3 w-full sm:w-auto">
                <BadgeCheck className="w-5 h-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-base break-words">
                    {cert.name}
                  </p>
                  <div className="flex flex-wrap items-center mt-1 text-sm text-gray-500">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                    <span>
                      Issued {formatCalendarDate(cert.issuedDate)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 w-full sm:w-auto justify-end sm:justify-start">
                <button
                  onClick={() => onEdit && onEdit(cert)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors duration-200 flex-1 sm:flex-none flex items-center justify-center"
                  title="Edit certification"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="sm:hidden ml-2 text-sm">Edit</span>
                </button>
                {onDelete && (
                  <button
                    onClick={() => onDelete(cert)}
                    className="p-1.5 text-gray-400 hover:text-red-600 transition-colors duration-200 flex-1 sm:flex-none flex items-center justify-center"
                    title="Delete certification"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="sm:hidden ml-2 text-sm">Delete</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-body-md text-gray-400 leading-relaxed italic px-2 sm:px-0">
          Showcase your certifications and professional credentials to validate
          your expertise and strengthen your profile.
        </p>
      )}
    </ProfileSection>
  );
};

export default CertificationsSection;