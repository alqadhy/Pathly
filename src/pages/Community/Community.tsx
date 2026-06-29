import { Outlet, useLocation } from "react-router-dom";

import CommunityTabs from "./CommunityTabs";
import type { CommunityViewId } from "./useCommunityPageData";

function Community() {
  const location = useLocation();
  const activeTab: CommunityViewId = location.pathname.includes("companies")
    ? "companies"
    : "profiles";

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(85,59,230,0.08),transparent_34%),linear-gradient(180deg,#f8f9fc_0%,#f4f6fb_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 sm:gap-5">
        <CommunityTabs activeTab={activeTab} />
        <Outlet />
      </div>
    </main>
  );
}

export default Community;
