export interface CompanyProfileImage {
  url: string;
  alt?: string;
}

export interface CompanyPeople {
  managementTeam: TeamMember[];
  designerTeam: TeamMember[];
}

export interface CompanyProfile {
  id: number;
  name: string;
  industry: string;
  location: string;
  followers: number;
  about: string;
  vision?: string;
  mission?: string;
  foundedYear?: number;
  employeeCount?: string;
  email?: string;
  phone?: string;
  website?: string;
  links?: Link[];
  openPositions: number;
  avgTimeToHire: string;
  acceptanceRate: string;
  remotePolicy: string;
  cultureValues: string[];
  jobs: Job[];
  people: CompanyPeople;
  coverImage: CompanyProfileImage;
  avatarImage: CompanyProfileImage;
}

export interface Job {
  id: string;
  title: string;
  type: 'on-site' | 'remote' | 'hybrid';
  experience: string;
  location: string;
  applicants: number;
  postedDate: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  mutualConnections: number;
}

export interface Link {
  platform: string;
  url: string;
}
