export interface CommunityTab {
  id: string;
  label: string;
}

export interface CommunityProfileCard {
  id: number;
  name: string;
  role: string;
  subtitle: string;
  mutualConnections: string;
  avatarUrl: string;
}

export interface CommunitySection {
  id: number;
  title: string;
  cards: CommunityProfileCard[];
}

export interface CommunityPageData {
  sections: CommunitySection[];
}