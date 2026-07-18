import React from 'react';
import { Edit2, Plus, Trash2, UserPlus } from 'lucide-react';
import Card from '../Card';
import { useFollows } from '../Community/useFollows';
import type { TeamMember } from './types';

interface PeopleSectionProps {
  managementTeam: TeamMember[];
  designerTeam: TeamMember[];
  onEdit?: (member: TeamMember, team: 'management' | 'designer') => void;
  onDelete?: (member: TeamMember, team: 'management' | 'designer') => void;
  onAdd?: (team: 'management' | 'designer') => void;
  isPublicView?: boolean;
}

const PeopleSection: React.FC<PeopleSectionProps> = ({
  managementTeam = [],
  designerTeam = [],
  onEdit,
  onDelete,
  onAdd,
  isPublicView = false,
}) => {
  const { connectProfile, disconnectProfile, isConnectedToProfile, followsData } = useFollows();
  const renderTeam = (members: TeamMember[], teamName: string, teamType: 'management' | 'designer') => {
    if (!members || members.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-foreground">{teamName}</h4>
          {!isPublicView && onAdd && (
            <button
              onClick={() => onAdd(teamType)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => {
            const memberId = parseInt(member.id, 10);
            const isConnected = isConnectedToProfile(memberId);
            
            const handleConnect = () => {
              if (isConnected) {
                disconnectProfile(memberId);
              } else {
                connectProfile({
                  id: memberId,
                  name: member.name,
                  role: member.position,
                  subtitle: `${member.mutualConnections} mutual connections`,
                  mutualConnections: member.mutualConnections.toString(),
                  avatarUrl: member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=553be6&color=fff`,
                  isConnected: false,
                });
              }
            };
            
            return (
              <Card
                key={member.id}
                title={member.name}
                subtitle={member.position}
                media={{
                  src: member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=553be6&color=fff`,
                  alt: member.name,
                  size: "lg",
                  shape: "circle",
                }}
                meta={{
                  avatarSrc: member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=553be6&color=fff`,
                  avatarAlt: `${member.name} avatar`,
                  text: `${member.mutualConnections} mutual connections`,
                }}
                actionLabel="connect +"
                actionTone="primary"
                onAction={handleConnect}
                onMediaClick={() => {
                  if (onEdit) {
                    onEdit(member, teamType);
                  }
                }}
                isActive={isConnected}
                actionState={isConnected ? "connected" : "default"}
                viewType="profiles"
                className="relative"
              >
                {!isPublicView && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onEdit) {
                        onEdit(member, teamType);
                      }
                    }}
                    className="absolute top-2 right-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors z-10"
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  const hasTeams = managementTeam.length > 0 || designerTeam.length > 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-h3 font-semibold text-foreground">People</h3>
      </div>
      
      {hasTeams ? (
        <div>
          {renderTeam(managementTeam, 'Management team', 'management')}
          {renderTeam(designerTeam, 'Designer team', 'designer')}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No team members added yet</p>
        </div>
      )}
    </div>
  );
};

export default PeopleSection;