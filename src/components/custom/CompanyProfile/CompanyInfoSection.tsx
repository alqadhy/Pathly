import React from 'react';
import { Edit2, Mail, Phone, Globe, Building2, Users } from 'lucide-react';
import type { Link } from './types';

interface CompanyInfoSectionProps {
  foundedYear?: number;
  employeeCount?: string;
  email?: string;
  phone?: string;
  website?: string;
  links?: Link[];
  onEdit?: () => void;
  isPublicView?: boolean;
}

const CompanyInfoSection: React.FC<CompanyInfoSectionProps> = ({
  foundedYear,
  employeeCount,
  email,
  phone,
  website,
  links,
  onEdit,
  isPublicView = false,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-h3 font-semibold text-foreground">Company's info</h3>
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
        {foundedYear && (
          <div className="flex items-center text-sm text-gray-600">
            <Building2 className="w-4 h-4 mr-3 text-gray-400" />
            <span>founded {foundedYear}</span>
          </div>
        )}
        
        {employeeCount && (
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-3 text-gray-400" />
            <span>{employeeCount} employees</span>
          </div>
        )}
        
        {email && (
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 mr-3 text-gray-400" />
            <a href={`mailto:${email}`} className="hover:text-[#553be6] transition-colors">
              {email}
            </a>
          </div>
        )}
        
        {phone && (
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 mr-3 text-gray-400" />
            <a href={`tel:${phone}`} className="hover:text-[#553be6] transition-colors">
              {phone}
            </a>
          </div>
        )}
        
        {website && (
          <div className="flex items-center text-sm text-gray-600">
            <Globe className="w-4 h-4 mr-3 text-gray-400" />
            <a href={website} target="_blank" rel="noopener noreferrer" className="hover:text-[#553be6] transition-colors">
              {website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
        
        {links && links.length > 0 && (
          <div className="space-y-2 pt-2">
            {links.map((link, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <Globe className="w-4 h-4 mr-3 text-gray-400" />
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#553be6] transition-colors">
                  {link.platform}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyInfoSection;