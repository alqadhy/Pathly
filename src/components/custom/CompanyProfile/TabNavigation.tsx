import React from 'react';
import { cn } from '../../../lib/utils';

export interface Tab {
  id: string;
  label: string;
}

export interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
  className,
}: TabNavigationProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-3 items-center rounded-full bg-white ",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative px-6 py-2.5 text-[15px] font-semibold transition-all duration-200 rounded-full ",
            activeTab === tab.id
              ? "bg-[#EEEBFD] text-[#553be6]"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
