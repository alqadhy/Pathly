import React from 'react';
import ProfileSection from './ProfileSection';
import type { Activity } from '../../../types/profile';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle } from 'lucide-react';

interface ActivitiesSectionProps {
  activities: Activity[];
  onEdit: () => void;
}

const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({
  activities,
  onEdit,
}) => {
  return (
    <ProfileSection title="Activities" onEdit={onEdit}>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
            <div className="flex items-start space-x-3">
              <div className="flex-1">
                <p className="text-body-md text-foreground">{activity.content}</p>
                <div className="flex items-center mt-2 text-body-sm text-muted-foreground">
                  <span>{formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}</span>
                  {activity.likes && (
                    <>
                      <span className="mx-2">•</span>
                      <Heart className="w-3 h-3 mr-1" />
                      <span>{activity.likes} likes</span>
                    </>
                  )}
                  {activity.comments && (
                    <>
                      <span className="mx-2">•</span>
                      <MessageCircle className="w-3 h-3 mr-1" />
                      <span>{activity.comments} comments</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ProfileSection>
  );
};

export default ActivitiesSection;