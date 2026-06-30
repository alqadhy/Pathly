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
  const infoItems = [
    { icon: Mail, label: 'Email', value: personalInfo.email },
    { icon: Phone, label: 'Phone', value: personalInfo.phone },
    { icon: MapPin, label: 'Location', value: personalInfo.location },
    { icon: Briefcase, label: 'Position', value: personalInfo.currentPosition },
    { icon: Globe, label: 'Industry', value: personalInfo.industry },
  ];

  return (
    <ProfileSection title="Personal Info" onEdit={onEdit}>
      <div className="space-y-3">
        {infoItems.map((item, index) => (
          <div key={index} className="flex items-start space-x-3">
            <item.icon className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-body-sm text-muted-foreground">{item.label}</p>
              <p className="text-body-md text-foreground">{item.value}</p>
            </div>
          </div>
        ))}
        {personalInfo.links.length > 0 && (
          <div className="flex items-start space-x-3">
            <Link2 className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-body-sm text-muted-foreground">Links</p>
              <div className="space-y-1">
                {personalInfo.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-hover underline text-body-sm block transition-colors duration-200"
                  >
                    {link.platform}: {link.url}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ProfileSection>
  );
};

export default PersonalInfoSection;