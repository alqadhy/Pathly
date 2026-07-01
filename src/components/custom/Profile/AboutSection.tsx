import React from 'react';
import { Edit2 } from 'lucide-react';

interface AboutSectionProps {
  about: string;
  onEdit: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ about, onEdit }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-h3 font-semibold text-foreground">About</h3>
        <button
          onClick={onEdit}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          <Edit2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        {about && about.trim() !== "" ? (
          <p className="text-body-md text-foreground leading-relaxed">{about}</p>
        ) : (
          <p className="text-body-md text-gray-400 leading-relaxed italic">
            Share your background, skills, interests, and career aspirations to help us personalize your learning journey, job recommendations, and AI-powered career guidance.
          </p>
        )}
      </div>
    </div>
  );
};

export default AboutSection;