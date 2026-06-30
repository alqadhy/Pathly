import { useEffect, useState, useCallback } from "react";

export interface FollowedCompany {
  id: string;
  name: string;
  followedAt: string;
}

export interface ConnectedProfile {
  id: string;
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

async function loadFollowsData(): Promise<FollowsData> {
  const response = await fetch("/mocked/Community/follows.json");
  
  if (!response.ok) {
    throw new Error("Failed to load follows data");
  }
  
  return response.json() as Promise<FollowsData>;
}

async function saveFollowsData(data: FollowsData): Promise<void> {
  // In a real app, this would be an API call
  // For now, we'll just log it and update localStorage
  console.log("Saving follows data:", data);
  localStorage.setItem("followsData", JSON.stringify(data));
}

export function useFollows() {
  const [followsData, setFollowsData] = useState<FollowsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadFollowsData();
        setFollowsData(data);
      } catch (error) {
        console.error("Error loading follows data:", error);
        // Initialize with empty data if fetch fails
        const emptyData: FollowsData = {
          followedCompanies: [],
          connectedProfiles: [],
          lastUpdated: new Date().toISOString(),
        };
        setFollowsData(emptyData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const followCompany = useCallback(async (companyId: string, companyName: string) => {
    if (!followsData) return;

    const updatedData: FollowsData = {
      ...followsData,
      followedCompanies: [
        ...followsData.followedCompanies,
        {
          id: companyId,
          name: companyName,
          followedAt: new Date().toISOString(),
        },
      ],
      lastUpdated: new Date().toISOString(),
    };

    setFollowsData(updatedData);
    await saveFollowsData(updatedData);
  }, [followsData]);

  const unfollowCompany = useCallback(async (companyId: string) => {
    if (!followsData) return;

    const updatedData: FollowsData = {
      ...followsData,
      followedCompanies: followsData.followedCompanies.filter(
        (company) => company.id !== companyId
      ),
      lastUpdated: new Date().toISOString(),
    };

    setFollowsData(updatedData);
    await saveFollowsData(updatedData);
  }, [followsData]);

  const connectProfile = useCallback(async (profile: {
    id: string;
    name: string;
    role: string;
    subtitle: string;
    mutualConnections: string;
    avatarUrl: string;
    isConnected?: boolean;
  }) => {
    if (!followsData) return;

    const updatedData: FollowsData = {
      ...followsData,
      connectedProfiles: [
        ...followsData.connectedProfiles,
        {
          id: profile.id,
          name: profile.name,
          role: profile.role,
          subtitle: profile.subtitle,
          mutualConnections: profile.mutualConnections,
          avatarUrl: profile.avatarUrl,
          isConnected: profile.isConnected ?? false,
          connectedAt: new Date().toISOString(),
        },
      ],
      lastUpdated: new Date().toISOString(),
    };

    setFollowsData(updatedData);
    await saveFollowsData(updatedData);
  }, [followsData]);

  const disconnectProfile = useCallback(async (profileId: string) => {
    if (!followsData) return;

    const updatedData: FollowsData = {
      ...followsData,
      connectedProfiles: followsData.connectedProfiles.filter(
        (profile) => profile.id !== profileId
      ),
      lastUpdated: new Date().toISOString(),
    };

    setFollowsData(updatedData);
    await saveFollowsData(updatedData);
  }, [followsData]);

  const isFollowingCompany = useCallback(
    (companyId: string) => {
      return followsData?.followedCompanies.some((c) => c.id === companyId) ?? false;
    },
    [followsData]
  );

  const isConnectedToProfile = useCallback(
    (profileId: string) => {
      return followsData?.connectedProfiles.some((p) => p.id === profileId) ?? false;
    },
    [followsData]
  );

  return {
    followsData,
    loading,
    followCompany,
    unfollowCompany,
    connectProfile,
    disconnectProfile,
    isFollowingCompany,
    isConnectedToProfile,
  };
}