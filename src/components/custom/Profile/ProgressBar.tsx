// src/components/custom/Profile/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  completion: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completion }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-[#111827]">Profile completion</h3>
        <span className="text-sm font-semibold text-[#111827]">{completion}%</span>
      </div>
      <div className="w-full bg-[#f0f1f2] rounded-full h-2">
        <div
          className="bg-[#553be6] h-2 rounded-full transition-all duration-500"
          style={{ width: `${completion}%` }}
        />
      </div>
      {completion < 100 && (
        <p className="mt-2 text-xs text-[#6b7280]">
          Add your CV to complete your profile and get 5x more profile views.
        </p>
      )}
    </div>
  );
};

export default ProgressBar;