import React from 'react';
import ProfileSection from './ProfileSection';
import type { Skill } from '../../../types/profile';

interface SkillsSectionProps {
  skills: Skill[];
  onEdit?: () => void;
  onAdd?: () => void;
  isPublicView?: boolean;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, onEdit, onAdd, isPublicView = false }) => {
  return (
    <ProfileSection title="skills" onEdit={onEdit} onAdd={onAdd} showAdd={true} isPublicView={isPublicView}>
      {skills && skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="px-4 py-1.5 bg-[#f0f0ff] text-[#553be6] rounded-full text-body-sm font-medium"
            >
              {skill.name}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-body-md text-gray-400 leading-relaxed italic">
          Showcase your technical and professional skills to strengthen your profile and receive more relevant job and course recommendations.
        </p>
      )}
    </ProfileSection>
  );
};

export default SkillsSection;