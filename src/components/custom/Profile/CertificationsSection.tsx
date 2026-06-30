import React from 'react';
import ProfileSection from './ProfileSection';
import type{ Certification } from '../../../types/profile';
import { Award, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface CertificationsSectionProps {
  certifications: Certification[];
  onEdit: () => void;
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  onEdit,
}) => {
  return (
    <ProfileSection title="Certifications" onEdit={onEdit}>
      <div className="space-y-4">
        {certifications.map((cert) => (
          <div key={cert.id} className="flex items-start space-x-3">
            <div className="p-2 bg-success-light rounded-lg">
              <Award className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="font-medium text-foreground">{cert.name}</p>
              <p className="text-body-sm text-muted-foreground">{cert.issuer}</p>
              <div className="flex items-center mt-1 text-body-sm text-muted-foreground">
                <Calendar className="w-3 h-3 mr-1" />
                <span>Issued {format(new Date(cert.issuedDate), 'MMM yyyy')}</span>
                {cert.expiryDate && (
                  <>
                    <span className="mx-2">•</span>
                    <span>Expires {format(new Date(cert.expiryDate), 'MMM yyyy')}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ProfileSection>
  );
};

export default CertificationsSection;