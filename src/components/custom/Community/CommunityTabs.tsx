import { Building2, Users } from "lucide-react";

import type { CommunityViewId } from "./useCommunityPageData";

const communityTabs: Array<{ id: CommunityViewId; label: string; icon: typeof Users }> = [
  {
    id: "profiles",
    label: "Profiles",
    icon: Users,
  },
  {
    id: "companies",
    label: "Companies",
    icon: Building2,
  },
];

type CommunityTabsProps = {
  activeTab: CommunityViewId;
  onTabChange: (tab: CommunityViewId) => void;
};

export default function CommunityTabs({ activeTab, onTabChange }: CommunityTabsProps) {
  return (
    <section className="rounded-2xl bg-white p-1 shadow-[0_6px_18px_rgba(15,23,42,0.05)] ring-1 ring-border/50 backdrop-blur-sm">
      <div className="grid grid-cols-2 gap-1">
        {communityTabs.map(({ id, label, icon: Icon }) => {
          const isActive = id === activeTab;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange(id)}
              aria-current={isActive ? "page" : undefined}
              className={`group flex h-11 items-center justify-center gap-2 rounded-[14px] text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-primary-light text-primary shadow-[0_10px_24px_rgba(85,59,230,0.14)]"
                  : "text-normal hover:bg-light hover:text-darker"
              }`}
            >
              <Icon className={`size-4 transition-transform duration-200 ${isActive ? "scale-105" : "group-hover:scale-105"}`} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

