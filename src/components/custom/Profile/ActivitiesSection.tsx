import React, { useState } from "react";
import type { Activity } from "../../../types/profile";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Send,
  MoreVertical,
  Edit2,
  Trash2,
  Plus,
} from "lucide-react";
import { formatCalendarDateTime } from "./dateUtils";

interface ActivitiesSectionProps {
  activities: Activity[];
  onEdit: (activity?: Activity) => void;
  onDelete?: (activity: Activity) => void;
  onAdd?: () => void;
  profileName?: string;
  profileTitle?: string;
  profileImage?: string;
}

const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({
  activities,
  onEdit,
  onDelete,
  onAdd,
  profileName = "Ahmed Hossam",
  profileTitle = "Senior Product Designer",
  profileImage,
}) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleMenuToggle = (activityId: string) => {
    setOpenMenuId(openMenuId === activityId ? null : activityId);
  };

  const handleEditClick = (activity: Activity) => {
    onEdit(activity);
    setOpenMenuId(null);
  };

  const handleDeleteClick = (activity: Activity) => {
    if (onDelete) {
      onDelete(activity);
      setOpenMenuId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-h3 font-semibold text-foreground">Activities</h3>
        <div className="flex items-center gap-2">
          {onAdd && (
            <button
              onClick={onAdd}
              className="text-body-sm text-foreground hover:text-foreground/80 font-medium flex items-center gap-1 transition-colors duration-200"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {activities && activities.length > 0 ? (
        <div className="overflow-x-auto scrollbar-thumb-gray-300 scrollbar-track-gray-100 pb-2 px-4">
          <div className="flex gap-4" style={{ width: "max-content" }}>
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-lg border border-border p-4 shrink-0"
                style={{ width: "380px" }}
              >
                {/* Header with user info and menu */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt={profileName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-base">
                        {profileName}{" "}
                        <span className="text-gray-500 font-normal">(You)</span>
                      </h4>
                      <p className="text-sm text-gray-500">
                        {profileTitle} • {formatCalendarDateTime(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => handleMenuToggle(activity.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {openMenuId === activity.id && (
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                        <button
                          onClick={() => handleEditClick(activity)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        {onDelete && (
                          <button
                            onClick={() => handleDeleteClick(activity)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Activity content */}
                <div className="mb-3">
                  <p className="text-gray-700 whitespace-pre-line">
                    {activity.content}
                  </p>
                </div>

                {/* Activity image (if exists) */}
                {activity.image && (
                  <div className="mb-3 rounded-lg overflow-hidden">
                    <img
                      src={activity.image}
                      alt="Activity"
                      className="w-full h-auto"
                    />
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-[#553be6] transition-colors group">
                    <Heart className="w-5 h-5 group-hover:fill-current" />
                    <span className="text-sm font-medium">Like</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-[#553be6] transition-colors group">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Comment</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-[#553be6] transition-colors group">
                    <Repeat2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Repost</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-[#553be6] transition-colors group">
                    <Send className="w-5 h-5" />
                    <span className="text-sm font-medium">Send</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-border p-8 text-center">
          <p className="text-body-md text-gray-400 leading-relaxed italic">
            Share your thoughts, achievements, projects, or learning journey
            with the community and start building your professional presence.
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivitiesSection;
