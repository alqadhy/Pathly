// src/components/custom/Profile/ProgressBar.tsx
import React from 'react';

interface ProgressBarProps {
  completion: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completion }) => {
  return (
    <div className="bg-[#f0f0ff] rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-[#111827]">Profile completion</h3>
        <span className="text-sm font-semibold text-[#553be6]">{completion}%</span>
      </div>
      <div className="w-full bg-white rounded-full h-2">
        <div
          className="bg-[#553be6] h-2 rounded-full transition-all duration-500"
          style={{ width: `${completion}%` }}
        />
      </div>
      {completion < 100 && (
        <p className="mt-3 text-sm text-[#111827]">
          Add your CV to complete your profile and get 5x more profile views.
        </p>
      )}
    </div>
  );
};

export default ProgressBar;