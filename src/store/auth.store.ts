// store/auth.store.ts
import { create } from "zustand";

type CurrentUser = {
  role: string;
  [key: string]: any;
} | null;

type AuthState = {
  currentUser: CurrentUser;
  setCurrentUser: (user: CurrentUser) => void;
  logout: () => void;
};

const getInitialUser = (): CurrentUser => {
  try {
    const raw = localStorage.getItem("currentUser");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: getInitialUser(),

  setCurrentUser: (user) => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
    set({ currentUser: user });
  },

  logout: () => {
    localStorage.removeItem("currentUser");
    set({ currentUser: null });
  },
}));