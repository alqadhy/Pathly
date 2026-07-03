// Types
import type {
  SavedFeed,
  SavedItemsType,
  SavedJob,
  SavedProfile,
} from "../types/saved.types";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedItemsStore {
  savedItems: SavedItemsType;
  saveItem: (
    category: string,
    newItem: SavedFeed | SavedJob | SavedProfile | SavedProfile,
  ) => void;
  removeItem: (category: string, id: number) => void;
}

export const useSavedItemsStore = create<SavedItemsStore>()(
  persist<SavedItemsStore>(
    (set) => ({
      savedItems: {
        feeds: [],
        jobs: [],
        profiles: [],
        courses: [],
      },

      saveItem: (category, newItem) => {
        const currentKey = category.toLowerCase() as keyof SavedItemsType;

        set((state) => {
          const targetArray = state.savedItems[currentKey] as any[];
          const alreadyExists = state.savedItems[currentKey].some(
            (existingItem) => existingItem.id === newItem.id,
          );

          if (alreadyExists) return {};

          return {
            savedItems: {
              ...state.savedItems,
              [currentKey]: [...targetArray, newItem],
            },
          };
        });
      },

      removeItem: (category, id) => {
        const currentKey = category.toLowerCase() as keyof SavedItemsType;

        set((state) => {
          const newSavedItems = state.savedItems[currentKey].filter(
            (item) => item.id != id,
          );
          return {
            savedItems: {
              ...state.savedItems,
              [currentKey]: newSavedItems,
            },
          };
        });
      },
    }),
    {
      name: "saved-items",
    },
  ),
);