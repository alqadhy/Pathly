import { useEffect, useState } from "react";

import type { CommunityPageData } from "../../../types/Community";

export type CommunityViewId = "profiles" | "companies";

async function loadCommunityPageData(view: CommunityViewId): Promise<CommunityPageData> {
  const response = await fetch(`/mocked/Community/${view}.json`);

  if (!response.ok) {
    throw new Error(`Failed to load community ${view} data`);
  }

  return response.json() as Promise<CommunityPageData>;
}

export function useCommunityPageData(view: CommunityViewId) {
  const [data, setData] = useState<CommunityPageData | null>(null);

  useEffect(() => {
    let isMounted = true;

    void loadCommunityPageData(view).then((nextData) => {
      if (isMounted) {
        setData(nextData);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [view]);

  return data;
}
