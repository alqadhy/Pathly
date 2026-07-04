// Components
import { Button } from "../ui/button";
import { useState, useEffect } from "react";

// Icons
import { ChevronDown } from "lucide-react";

// User Avatar
import avatar from "../../assets/imgs/avatar_placeholder.png";
import { getStoredProfile } from "../custom/Profile/crud/profileStorage";
import type { Profile } from "../../types/profile";

function UserAvatar() {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const profile = getStoredProfile() as Profile | null;
    if (profile?.avatarImage?.url) {
      setProfileImageUrl(profile.avatarImage.url);
    }
  }, []);

  return (
    <Button size="icon" className="bg-input w-12 h-12 rounded-full relative">
      <img 
        src={profileImageUrl || avatar} 
        alt="Avatar" 
        className="rounded-full"
      />
      <span className="bg-input w-4 h-4 border border-card rounded-full flex justify-center items-center absolute bottom-0 right-0 [&_svg]:h-[8px]! [&_svg]:w-[8px]!">
        <ChevronDown />
      </span>
    </Button>
  );
}

export default UserAvatar;
