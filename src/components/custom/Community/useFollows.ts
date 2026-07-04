import { useEffect, useState, useCallback } from "react";

import {
  loadCommunityFollows,
  saveStoredCommunityFollows,
  type FollowsData,
} from "./crud/communityStorage";

export function useFollows() {
  const [followsData, setFollowsData] = useState<FollowsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Check for stored follows data in localStorage
        const storedData = loadCommunityFollows(null);
        if (storedData) {
          setFollowsData(storedData);
          return;
        }

        // No stored data - initialize with empty data
        const emptyData: FollowsData = {
          followedCompanies: [],
          connectedProfiles: [],
          lastUpdated: new Date().toISOString(),
        };
        const normalizedData = loadCommunityFollows(emptyData);
        setFollowsData(normalizedData || emptyData);
      } catch (error) {
        console.error("Error loading follows data:", error);
        // Initialize with empty data if error occurs
        const emptyData: FollowsData = {
          followedCompanies: [],
          connectedProfiles: [],
          lastUpdated: new Date().toISOString(),
        };
        setFollowsData(loadCommunityFollows(emptyData) || emptyData);
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
    saveStoredCommunityFollows(updatedData);
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
    saveStoredCommunityFollows(updatedData);
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
    saveStoredCommunityFollows(updatedData);
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
    saveStoredCommunityFollows(updatedData);
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