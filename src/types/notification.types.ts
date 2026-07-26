export type NotificationType =
  | "course"
  | "job"
  | "saved"
  | "profile"
  | "community"
  | "certificate";

export interface Notification {
  id: string;

  title: string;

  description: string;

  type: NotificationType;

  image?: string;

  icon?: string;

  targetId?: number;

  targetRoute?: string;

  createdAt: string;

  isRead: boolean;

  generated?: boolean;
}