// Components
import { Button } from "../ui/button";
import { useState, useEffect } from "react";

// Icons
import { ChevronDown } from "lucide-react";

// User Avatar
import { getStoredProfile, getCurrentUser } from "../custom/Profile/crud/profileStorage";
import type { Profile } from "../../types/profile";

function UserAvatar() {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [userInitial, setUserInitial] = useState<string>("U");

  useEffect(() => {
    const profile = getStoredProfile() as Profile | null;
    if (profile?.avatarImage?.url) {
      setProfileImageUrl(profile.avatarImage.url);
    } else {
      // Get first letter from currentUser if no profile image
      const currentUser = getCurrentUser();
      if (currentUser?.fullName) {
        setUserInitial(currentUser.fullName.charAt(0).toUpperCase());
      }
    }
  }, []);

  return (
    <Button size="icon" className="bg-input w-12 h-12 rounded-full relative ">
      {profileImageUrl ? (
        <img 
          src={profileImageUrl} 
          alt="Avatar" 
          className="  w-full h-full rounded-full"
        />
      ) : (
        <span className="flex items-center justify-center w-full h-full text-lg font-semibold text-primary ">
          {userInitial}
        </span>
      )}
      <span className="bg-input w-4 h-4 border border-card rounded-full flex justify-center items-center absolute bottom-0 right-0 [&_svg]:h-[8px]! [&_svg]:w-[8px]!">
        <ChevronDown />
      </span>
    </Button>
  );
}

export default UserAvatar;
