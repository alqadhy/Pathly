import React from 'react';
import { Edit2, Trash2, Target, Eye } from 'lucide-react';

interface VisionMissionSectionProps {
  vision?: string;
  mission?: string;
  onEdit?: () => void;
  onDeleteVision?: () => void;
  onDeleteMission?: () => void;
  isPublicView?: boolean;
}

const VisionMissionSection: React.FC<VisionMissionSectionProps> = ({
  vision,
  mission,
  onEdit,
  onDeleteVision,
  onDeleteMission,
  isPublicView = false,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-h3 font-semibold text-foreground">Vision & Mission</h3>
        {!isPublicView && (
          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <Edit2 className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
        {vision && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#553be6]" />
                <h4 className="font-semibold text-foreground">Vision</h4>
              </div>
              {!isPublicView && onDeleteVision && (
                <button
                  onClick={onDeleteVision}
                  className="p-1.5 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              )}
            </div>
            <p className="text-body-md text-foreground leading-relaxed">{vision}</p>
          </div>
        )}
        
        {mission && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#553be6]" />
                <h4 className="font-semibold text-foreground">Mission</h4>
              </div>
              {!isPublicView && onDeleteMission && (
                <button
                  onClick={onDeleteMission}
                  className="p-1.5 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              )}
            </div>
            <p className="text-body-md text-foreground leading-relaxed">{mission}</p>
          </div>
        )}
        
        {!vision && !mission && (
          <p className="text-body-md text-gray-400 leading-relaxed italic">
            Define your company's vision and mission to help others understand your purpose and goals.
          </p>
        )}
      </div>
    </div>
  );
};

export default VisionMissionSection;