import React from 'react';
import ProfileSection from './ProfileSection';
import type { PersonalInfo } from '../../../types/profile';
import { Mail, Phone, MapPin, Briefcase, Globe, Link2 } from 'lucide-react';

interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
  onEdit: () => void;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  personalInfo,
  onEdit,
}) => {
  const hasAnyInfo = personalInfo.email || personalInfo.phone || personalInfo.location || 
                     personalInfo.currentPosition || personalInfo.industry || personalInfo.links.length > 0;

  const infoItems = [
    { icon: Mail, value: personalInfo.email },
    { icon: Phone, value: personalInfo.phone },
    { icon: MapPin, value: personalInfo.location },
    { icon: Briefcase, value: personalInfo.currentPosition },
    { icon: Globe, value: personalInfo.industry },
  ];

  return (
    <ProfileSection title="Personal info" onEdit={onEdit}>
      {hasAnyInfo ? (
        <div className="space-y-4">
          {infoItems.map((item, index) => (
            item.value && (
              <div key={index} className="flex items-center space-x-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-body-md text-primary">{item.value}</span>
              </div>
            )
          ))}
          {personalInfo.links.length > 0 && (
            <div className="space-y-2">
              {personalInfo.links.map((link, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Link2 className="w-5 h-5 text-muted-foreground" />
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-hover text-body-md transition-colors duration-200"
                  >
                    {link.platform === 'Portfolio' ? link.platform : link.url}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="text-body-md text-gray-400 leading-relaxed italic">
          Add your contact information and professional details to help others connect with you.
        </p>
      )}
    </ProfileSection>
  );
};

export default PersonalInfoSection;