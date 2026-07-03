// Icons
import {
  StickyNote,
  BriefcaseBusiness,
  UserRoundSearch,
  BookOpen,
} from "lucide-react";

// Types
import type { SavedItemsCategory } from "../types/saved.types";

export const SAVED_ITEMS_TYPES: {
  id: number;
  icon: React.ReactElement;
  type: SavedItemsCategory;
}[] = [
  {
    id: 1,
    icon: <StickyNote />,
    type: "Feeds",
  },
  {
    id: 2,
    icon: <BriefcaseBusiness />,
    type: "Jobs",
  },
  {
    id: 3,
    icon: <UserRoundSearch />,
    type: "Profiles",
  },
  {
    id: 4,
    icon: <BookOpen />,
    type: "Courses",
  },
];
