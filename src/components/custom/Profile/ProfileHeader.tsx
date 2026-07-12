import React from "react";
import type { Profile } from "../../../types/profile";
import {
  MapPin,
  Briefcase,
  Share2,
  Eye,
  Camera,
  Pencil,
  Users,
  MessageSquare,
  Bookmark,
} from "lucide-react";
import { useSavedItemsStore } from "../../../store/saved-items.store";

interface ProfileHeaderProps {
  profile: Profile;
  onAvatarChange?: (imageUrl: string) => void;
  onCoverChange?: (imageUrl: string) => void;
  isPublicView?: boolean;
  onMessageClick?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  onAvatarChange,
  onCoverChange,
  isPublicView = false,
  onMessageClick,
}) => {
  const { saveItem, removeItem, savedItems } = useSavedItemsStore();
  const isSaved = savedItems.profiles.some((p) => p.id === profile.id);
  const [avatarSrc, setAvatarSrc] = React.useState(
    profile.avatarImage?.url || "",
  );
  const [coverSrc, setCoverSrc] = React.useState(profile.coverImage?.url || "");
  const [avatarBroken, setAvatarBroken] = React.useState(false);
  const [coverBroken, setCoverBroken] = React.useState(false);
  const avatarInputRef = React.useRef<HTMLInputElement>(null);
  const coverInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setAvatarSrc(profile.avatarImage?.url || "");
    setAvatarBroken(false);
  }, [profile.avatarImage?.url]);

  React.useEffect(() => {
    setCoverSrc(profile.coverImage?.url || "");
    setCoverBroken(false);
  }, [profile.coverImage?.url]);

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleCoverClick = () => {
    coverInputRef.current?.click();
  };

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Failed to read image file"));
      reader.readAsDataURL(file);
    });
  };

  const handleAvatarFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = await readFileAsDataUrl(file);
      console.log("Selected avatar:", imageUrl);
      setAvatarSrc(imageUrl);
      setAvatarBroken(false);

      if (onAvatarChange) {
        onAvatarChange(imageUrl);
      }
    }
  };

  const handleCoverFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = await readFileAsDataUrl(file);
      console.log("Selected cover:", imageUrl);
      setCoverSrc(imageUrl);
      setCoverBroken(false);

      if (onCoverChange) {
        onCoverChange(imageUrl);
      }
    }
  };

  return (
    <div>
      {/* Cover Image */}
      <div className="relative h-40 bg-[#1e3a8a] rounded-t-lg rounded-b-lg overflow-hidden">
        {/* Geometric purple patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-linear-to-br from-[#553be6] to-transparent opacity-80"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-linear-to-tl from-[#553be6] to-transparent opacity-80"></div>
        </div>

        {coverSrc && !coverBroken ? (
          <img
            src={coverSrc}
            alt={profile.coverImage.alt || "Cover image"}
            className="w-full h-full object-cover"
            onError={() => setCoverBroken(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Camera className="w-8 h-8 text-white/50" />
          </div>
        )}
        {!isPublicView && (
          <button
            onClick={handleCoverClick}
            className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-lg text-gray-700 transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
        )}
        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          onChange={handleCoverFileChange}
          className="hidden"
        />
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6">
        <div className="flex items-start flex-wrap">
          {/* Avatar */}
          <div className="relative -mt-16">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-34 md:h-34 rounded-full border-4 border-white bg-linear-to-br from-[#553be6] to-[#402cad]
             flex items-center justify-center text-white text-2xl sm:text-3xl font-bold overflow-hidden shrink-0">
              {avatarSrc && !avatarBroken ? (
                <img
                  src={avatarSrc}
                  alt={profile.avatarImage.alt || profile.name}
                  className="w-full h-full object-cover"
                  onError={() => {
                    setAvatarBroken(true);
                  }}
                />
              ) : (
                profile.name.charAt(0)
              )}
            </div>
            {!isPublicView && (
              <button
                onClick={handleAvatarClick}
                className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full text-[#553be6] hover:bg-gray-50 transition-colors border-2 border-gray-200"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            )}
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarFileChange}
              className="hidden"
            />
          </div>

          <div className="ml-4 flex-1 pt-4">
            <div className="flex items-start flex-wrap gap-3 justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-[#111827]">
                  {profile.name || "Your Name"}
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  {profile.title || "Your Title"}
                </p>
                <div className="flex items-center mt-2 text-sm text-[#553be6]">
                  <Users className="w-4 h-4 mr-1.5" />
                  <span className="font-medium">
                    {profile.followers || 0} followers
                  </span>
                </div>
                <div className="flex items-center flex-wrap gap-3 mt-3 space-x-4">
                  {profile.location && (
                    <div className="flex items-center text-sm text-gray-600 mr-4 sm:mr-0">
                      <MapPin className="w-4 h-4 mr-1.5" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile.industry && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Briefcase className="w-4 h-4 mr-1.5" />
                      <span>{profile.industry}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center flex-wrap gap-y-3 space-x-2 pt-1">
                {!isPublicView ? (
                  <>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-[#553be6] rounded-sm hover:bg-[#4d35cf] transition-colors duration-200 flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share Profile
                    </button>
                    <button className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-[#553be6] border-2 border-[#553be6] rounded-sm hover:bg-purple-50 transition-colors duration-200 flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      Public preview
                    </button>
                  </>
                ) : (
                  <>
                    {onMessageClick && (
                      <button 
                        onClick={onMessageClick}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#553be6] rounded-sm hover:bg-[#4d35cf] transition-colors duration-200 flex items-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (isSaved) {
                          removeItem("profiles", profile.id);
                        } else {
                          saveItem("profiles", {
                            id: profile.id,
                            picture: profile.avatarImage?.url || "",
                            name: profile.name,
                            headline: profile.title || "",
                            connections: {
                              profilePic: profile.avatarImage?.url || "",
                              text: profile.followers ? `${profile.followers} followers` : "",
                            },
                          });
                        }
                      }}
                      className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors duration-200 flex items-center gap-2 ${
                        isSaved
                          ? "text-[#553be6] border-2 border-[#553be6] hover:bg-purple-50"
                          : "text-white bg-[#553be6] hover:bg-[#4d35cf]"
                      }`}
                    >
                      <Bookmark className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} />
                      {isSaved ? "Saved" : "Save"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileHeader;