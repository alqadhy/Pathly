import React from 'react';
import ProfileSection from './ProfileSection';
import type { Track } from '../../../types/profile';

interface TracksSectionProps {
  tracks: Track[];
  onEdit?: (track: Track) => void;
  onAdd?: () => void;
  onDelete?: (track: Track) => void;
  isPublicView?: boolean;
}

const TracksSection: React.FC<TracksSectionProps> = ({ tracks, onEdit, onAdd, onDelete, isPublicView = false }) => {
  return (
    <ProfileSection title="Tracks" onEdit={onAdd} showAdd={true} isPublicView={isPublicView}>
      {tracks && tracks.length > 0 ? (
        <div className="space-y-2">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">
                {track.name}
              </span>
              {!isPublicView && (
                <div className="flex items-center gap-1">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(track)}
                      className="p-1 text-blue-500 hover:text-blue-700 transition-colors"
                      title="Edit track"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(track)}
                      className="p-1 text-red-500 hover:text-red-700 transition-colors"
                      title="Delete track"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <p className="text-body-md text-gray-400 leading-relaxed italic">
            Add learning tracks to organize your career development journey.
          </p>
        </div>
      )}
    </ProfileSection>
  );
};

export default TracksSection;