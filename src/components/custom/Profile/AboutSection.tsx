import React from 'react';
import ProfileSection from './ProfileSection';

interface AboutSectionProps {
  about: string;
  onEdit: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ about, onEdit }) => {
  return (
    <ProfileSection title="About" onEdit={onEdit}>
      <p className="text-body-md text-foreground leading-relaxed">{about}</p>
    </ProfileSection>
  );
};

export default AboutSection;