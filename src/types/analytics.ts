import type { ReactNode } from "react";

// stat item type
export interface StatItem {
  id: number;
  iconName: string;
  iconBg: string;
  iconColor: string;
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

// segmented progress bar type
export interface SegmentedProgressBarProps {
  title: string;
  subtitle: string;
  value: number;
  totalSegments?: number;
  colorClass?: string;
  textClass?: string;
}

// AI Insight type
export interface AIInsightItem {
  id: number;
  title: string;
  description: string;
  actionText: string;
  iconName: string;
  containerClass: string;
  titleClass: string;
  textClass: string;
  linkClass: string;
}
// skill gap type
export interface SkillGapItem {
  id: number;
  title: string;
  priority: string;
  priorityClass: string;
  value: number;
}
