export type SearchType =
  | "job"
  | "learning"
  | "community"
  | "post";

export interface SearchItem {
  id: number;
  title: string;
  type: SearchType;
  route: string;
}

export interface RecentSearch {
  id: number;
  title: string;
}