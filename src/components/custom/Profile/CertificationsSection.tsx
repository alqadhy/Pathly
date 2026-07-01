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
            <div key={cert.id || `${cert.name}-${index}`} className="flex items-center space-x-3">
              <BadgeCheck className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-base">
                  {cert.name}
                </p>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  <span>
                    Issued {formatCalendarDate(cert.issuedDate)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEdit && onEdit(cert)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  title="Edit certification"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {onDelete && (
                  <button
                    onClick={() => onDelete(cert)}
                    className="p-1.5 text-gray-400 hover:text-red-600 transition-colors duration-200"
                    title="Delete certification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-body-md text-gray-400 leading-relaxed italic">
          Showcase your certifications and professional credentials to validate
          your expertise and strengthen your profile.
        </p>
      )}
    </ProfileSection>
  );
};

export default CertificationsSection;
