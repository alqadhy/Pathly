export interface CommunityTab {
  id: string;
  label: string;
}

export interface CommunityProfileCard {
  id: string;
  name: string;
  role: string;
  subtitle: string;
  mutualConnections: string;
  avatarUrl: string;
}

export interface CommunitySection {
  id: string;
  title: string;
  cards: CommunityProfileCard[];
}

export interface CommunityPageData {
  sections: CommunitySection[];
}