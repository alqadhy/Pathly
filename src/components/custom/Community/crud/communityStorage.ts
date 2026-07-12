export interface FollowedCompany {
  id: number;
  name: string;
  followedAt: string;
}

export interface ConnectedProfile {
  id: number;
  name: string;
  role: string;
  subtitle: string;
  mutualConnections: string;
  avatarUrl: string;
  isConnected: boolean;
  connectedAt: string;
}

export interface FollowsData {
  followedCompanies: FollowedCompany[];
  connectedProfiles: ConnectedProfile[];
  lastUpdated: string;
}

const COMMUNITY_FOLLOWS_STORAGE_KEY = "pathly.community.follows";

const hasLocalStorage = (): boolean => {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
};

const asArray = <T>(value: unknown): T[] => {
  return Array.isArray(value) ? (value as T[]) : [];
};

const asText = (value: unknown): string => {
  return typeof value === "string" ? value : "";
};

export const normalizeFollowsData = (data: FollowsData): FollowsData => {
  return {
    followedCompanies: asArray(data.followedCompanies)
      .map((company, index) => {
        const item = company as Partial<FollowedCompany> | null;
        const id = item?.id || item?.name || `company-${index}`;
        const name = asText(item?.name).trim();

        if (!id && !name) return null;

        return {
          id: id || `company-${index}-${name}`,
          name,
          followedAt: asText(item?.followedAt) || new Date().toISOString(),
        };
      })
      .filter((item): item is FollowedCompany => Boolean(item)),
    connectedProfiles: asArray(data.connectedProfiles)
      .map((profile, index) => {
        const item = profile as Partial<ConnectedProfile> | null;
        const id = item?.id || item?.name || `profile-${index}`;
        const name = asText(item?.name).trim();

        if (!id && !name) return null;

        return {
          id: id || `profile-${index}-${name}`,
          name,
          role: asText(item?.role),
          subtitle: asText(item?.subtitle),
          mutualConnections: asText(item?.mutualConnections),
          avatarUrl: asText(item?.avatarUrl),
          isConnected: Boolean(item?.isConnected),
          connectedAt: asText(item?.connectedAt) || new Date().toISOString(),
        };
      })
      .filter((item): item is ConnectedProfile => Boolean(item)),
    lastUpdated: asText(data.lastUpdated) || new Date().toISOString(),
  };
};

export const getStoredCommunityFollows = (): FollowsData | null => {
  if (!hasLocalStorage()) return null;

  const rawData = window.localStorage.getItem(COMMUNITY_FOLLOWS_STORAGE_KEY);
  if (!rawData) return null;

  try {
    return normalizeFollowsData(JSON.parse(rawData) as FollowsData);
  } catch {
    window.localStorage.removeItem(COMMUNITY_FOLLOWS_STORAGE_KEY);
    return null;
  }
};

export const saveStoredCommunityFollows = (data: FollowsData): void => {
  if (!hasLocalStorage()) return;

  window.localStorage.setItem(
    COMMUNITY_FOLLOWS_STORAGE_KEY,
    JSON.stringify(normalizeFollowsData(data)),
  );
};

export const loadCommunityFollows = (fallbackData: FollowsData | null): FollowsData | null => {
  const storedData = getStoredCommunityFollows();
  if (storedData) return storedData;

  if (fallbackData) {
    const normalizedData = normalizeFollowsData(fallbackData);
    saveStoredCommunityFollows(normalizedData);
    return normalizedData;
  }

  return null;
};