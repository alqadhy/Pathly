import React from 'react';
import ProfileSection from './ProfileSection';
import type { Skill } from '../../../types/profile';

interface SkillsSectionProps {
  skills: Skill[];
  onEdit: () => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, onEdit }) => {
  return (
    <ProfileSection title="Skills" onEdit={onEdit}>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill.id}
            className="px-3 py-1 bg-primary-light text-primary rounded-full text-body-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-sm"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </ProfileSection>
  );
};

export default SkillsSection;