import React from 'react';
import ProfileSection from './ProfileSection';
import type { CV } from '../../../types/profile';
import { File, Download, Calendar, Upload } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface CVSectionProps {
  cv: CV | null;
  onEdit: () => void;
}

const CVSection: React.FC<CVSectionProps> = ({ cv, onEdit }) => {
  return (
    <ProfileSection title="CV" onEdit={onEdit}>
      {cv ? (
        <div className="border border-border rounded-lg p-4 bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-light rounded-lg">
                <File className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{cv.fileName}</p>
                <div className="flex items-center text-body-sm text-muted-foreground">
                  <span>{cv.fileSize}</span>
                  <span className="mx-2">•</span>
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>
                    Uploaded {formatDistanceToNow(new Date(cv.uploadDate), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
            <a
              href={cv.fileUrl}
              download
              className="p-2 text-primary hover:bg-primary-light rounded-lg transition-colors duration-200"
            >
              <Download className="w-5 h-5" />
            </a>
          </div>
        </div>
      ) : (
        <div className="text-center py-6">
          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No CV uploaded</p>
          <button
            onClick={onEdit}
            className="mt-2 text-body-sm text-primary hover:text-primary-hover transition-colors duration-200"
          >
            Upload CV
          </button>
        </div>
      )}
    </ProfileSection>
  );
};

export default CVSection;