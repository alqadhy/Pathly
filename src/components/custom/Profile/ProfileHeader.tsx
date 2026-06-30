import React from 'react';
import type { Profile } from '../../../types/profile';
import { MapPin, Users, Share2, Eye, Camera } from 'lucide-react';

interface ProfileHeaderProps {
  profile: Profile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  // Handle image error - fallback to gradient
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none';
    // Show fallback
    const parent = e.currentTarget.parentElement;
    if (parent) {
      const fallback = document.createElement('div');
      fallback.className = 'w-full h-full bg-gradient-to-r from-[#553be6] to-[#2ebccf] flex items-center justify-center';
      fallback.innerHTML = `<svg class="w-8 h-8 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`;
      parent.appendChild(fallback);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-32 bg-gradient-to-r from-[#553be6] to-[#2ebccf]">
        {profile.coverImage?.url ? (
          <img
            src={profile.coverImage.url}
            alt={profile.coverImage.alt || 'Cover image'}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-[#553be6] to-[#2ebccf] flex items-center justify-center">
            <Camera className="w-8 h-8 text-white/50" />
          </div>
        )}
        <button className="absolute bottom-3 right-3 p-1.5 bg-black/50 hover:bg-black/70 rounded-lg text-white transition-colors">
          <Camera className="w-4 h-4" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="px-5 pb-5">
        <div className="flex items-start ">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-white bg-gradient-to-br from-[#553be6] to-[#402cad] flex items-center justify-center text-white text-2xl font-bold overflow-hidden flex-shrink-0">
              {profile.avatarImage?.url ? (
                <img
                  src={profile.avatarImage.url}
                  alt={profile.avatarImage.alt || profile.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.textContent = profile.name.charAt(0);
                      parent.className = 'w-20 h-20 rounded-full border-4 border-white bg-gradient-to-br from-[#553be6] to-[#402cad] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0';
                    }
                  }}
                />
              ) : (
                profile.name.charAt(0)
              )}
            </div>
            <button className="absolute bottom-0 right-0 p-1 bg-[#553be6] rounded-full text-white hover:bg-[#4d35cf] transition-colors border-2 border-white">
              <Camera className="w-3 h-3" />
            </button>
          </div>

          <div className="ml-4 flex-1 pt-2">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-bold text-[#111827]">{profile.name}</h1>
                <p className="text-sm text-[#6b7280]">{profile.title}</p>
                <div className="flex items-center mt-1 text-xs text-[#6b7280]">
                  <Users className="w-3 h-3 mr-1" />
                  <span className="mr-2">{profile.followers} followers</span>
                  <span className="mr-2">•</span>
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{profile.location}</span>
                </div>
                <div className="mt-0.5 text-xs text-[#6b7280]">
                  {profile.industry}
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-1">
                <button className="px-3 py-1.5 text-xs text-[#553be6] border border-[#553be6] rounded-lg hover:bg-[#eeebfd] transition-colors duration-200 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5" />
                  Share Profile
                </button>
                <button className="px-3 py-1.5 text-xs text-white bg-[#553be6] rounded-lg hover:bg-[#4d35cf] transition-colors duration-200 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  Public preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;