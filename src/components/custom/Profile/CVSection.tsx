import React from 'react';
import ProfileSection from './ProfileSection';
import type { CV } from '../../../types/profile';
import { File, Upload } from 'lucide-react';
import { formatCalendarDateTime } from './dateUtils';

interface CVSectionProps {
  cv: CV | null;
  onAdd: () => void;
  onDelete: () => void;
}

const CVSection: React.FC<CVSectionProps> = ({ cv, onAdd, onDelete }) => {
  const isImage = cv?.fileUrl?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  
  return (
    <ProfileSection title="CV" onAdd={onAdd} showAdd={true} showEdit={false}>
      {cv ? (
        <div className="border border-border rounded-lg overflow-hidden bg-background">
          <div className="relative">
            {isImage ? (
              <div className="flex flex-col items-center">
                <img 
                  src={cv.fileUrl} 
                  alt={cv.fileName}
                  className="w-full max-h-100 object-contain bg-gray-50"
                />
                <div className="p-3 sm:p-4 bg-background flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                  <div className="w-full sm:w-auto">
                    <p className="text-body-sm font-medium text-foreground break-words">{cv.fileName}</p>
                    <p className="text-body-sm text-muted-foreground">
                      {cv.fileSize} • Uploaded {formatCalendarDateTime(cv.uploadDate)}
                    </p>
                  </div>
                  <button
                    onClick={onDelete}
                    className="w-full sm:w-auto px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 text-body-sm font-medium text-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-100 flex items-center justify-center" style={{ minHeight: '300px' }}>
                <div className="text-center p-6 sm:p-8 w-full">
                  <File className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-body-md font-medium text-foreground mb-2 break-words px-2">{cv.fileName}</p>
                  <p className="text-body-sm text-muted-foreground mb-4">
                    {cv.fileSize} • Uploaded {formatCalendarDateTime(cv.uploadDate)}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={cv.fileUrl}
                      download
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors duration-200"
                    >
                      Download CV
                    </a>
                    <button
                      onClick={onDelete}
                      className="w-full sm:w-auto px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 text-body-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-border rounded-lg p-6 sm:p-8 text-center">
          <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-body-md text-gray-400 mb-2 px-2">
            Add your CV to complete your profile
          </p>
          <p className="text-body-sm text-muted-foreground px-2">
            Supported formats: PDF, DOC, DOCX, Images (Max 5MB)
          </p>
        </div>
      )}
    </ProfileSection>
  );
};

export default CVSection;