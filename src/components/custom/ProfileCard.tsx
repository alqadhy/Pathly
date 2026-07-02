// Components
import { Button } from "../ui/button";

// Icons
import { Plus } from "lucide-react";

// Types
import type { UserProfileCard } from "../../types/profile.types";

function ProfileCard({
  type,
  picture,
  username,
  headline,
  connections,
}: UserProfileCard) {
  return (
    <div className="bg-card p-6 border-muted border-1 rounded-xl shadow-sm text-center">
      <div className="w-25 h-25 rounded-full mx-auto overflow-hidden">
        <img src={picture} alt={username} />
      </div>
      <h3>{username}</h3>
      <p className="text-text-light leading-(--h6-line-height)">{headline}</p>
      {connections && (
        <div className="flex justify-center items-center gap-2 mt-1 mb-[15px]">
          <img
            src={connections.profilePic}
            alt="avatar"
            className="w-6! h-6 rounded-full"
          />
          <p className="text-text-light text-center text-body-sm grow">
            {connections.text}
          </p>
        </div>
      )}
      <Button className="flex items-center gap-1 w-full h-10 py-3 px-4 rounded-sm text-card">
        {type == "User" ? "Connect" : "Apply"}
        {type == "User" && <Plus />}
      </Button>
    </div>
  );
}

export default ProfileCard;
