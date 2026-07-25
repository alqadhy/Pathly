import React from 'react';
import { Edit2, Briefcase, Clock, TrendingUp, Monitor } from 'lucide-react';

interface HiringInfoSectionProps {
  openPositions: number;
  avgTimeToHire: string;
  acceptanceRate: string;
  remotePolicy: string;
  onEdit?: () => void;
  isPublicView?: boolean;
}

const HiringInfoSection: React.FC<HiringInfoSectionProps> = ({
  openPositions,
  avgTimeToHire,
  acceptanceRate,
  remotePolicy,
  onEdit,
  isPublicView = false,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-h3 font-semibold text-foreground">Hiring Info</h3>
        {!isPublicView && onEdit && (
          <button
            onClick={onEdit}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Edit2 className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">open positions</span>
          <span className="font-medium text-foreground">{openPositions}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Avg. time of hiring</span>
          <span className="font-medium text-foreground">{avgTimeToHire}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Acceptance rate</span>
          <span className="font-medium text-foreground">{acceptanceRate}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Remote policy</span>
          <span className="font-medium text-foreground">{remotePolicy}</span>
        </div>
      </div>
    </div>
  );
};

export default HiringInfoSection;