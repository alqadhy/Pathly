import type { ReactNode } from "react";

// stat item type
export interface StatItem {
  id: number;
  icon: ReactNode;
  iconBg: string;
  badgeText: string;
  badgeClass: string;
  value: string;
  label: string;
}

// progress bar  type
export interface ProgressBarProps {
  title: string;
  value: number;
  subtitle?: string;
  colorClass?: string;
  labelRight?: string | ReactNode;
  labelRightClass?: string;
}

export interface SegmentedProgressBarProps {
  title: string;
  subtitle: string;
  value: number;
  totalSegments?: number;
  colorClass?: string;
  textClass?: string;
}
