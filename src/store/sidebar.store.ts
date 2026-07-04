import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useSidebarStore = create<SidebarStore>()((set) => ({
  isOpen: false,

  open: () => {
    set((state) => ({ ...state, isOpen: true }));
  },

  close: () => {
    set((state) => ({ ...state, isOpen: false }));
  },
}));
