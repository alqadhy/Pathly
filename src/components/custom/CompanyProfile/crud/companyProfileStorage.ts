import type { CompanyProfile } from "../types";

const COMPANY_PROFILE_STORAGE_KEY = "pathly.company.profile";

const hasLocalStorage = (): boolean => {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
};

export const getStoredCompanyProfile = (): CompanyProfile | null => {
  if (!hasLocalStorage()) return null;

  const rawProfile = window.localStorage.getItem(COMPANY_PROFILE_STORAGE_KEY);
  if (!rawProfile) return null;

  try {
    return JSON.parse(rawProfile) as CompanyProfile;
  } catch {
    window.localStorage.removeItem(COMPANY_PROFILE_STORAGE_KEY);
    return null;
  }
};

export const saveStoredCompanyProfile = (profile: CompanyProfile): void => {
  if (!hasLocalStorage()) return;

  window.localStorage.setItem(
    COMPANY_PROFILE_STORAGE_KEY,
    JSON.stringify(profile),
  );
};

export const clearStoredCompanyProfile = (): void => {
  if (!hasLocalStorage()) return;

  try {
    window.localStorage.removeItem(COMPANY_PROFILE_STORAGE_KEY);
  } catch {
    // Silently fail
  }
};

export const loadCompanyProfile = (fallbackProfile: CompanyProfile | null): CompanyProfile | null => {
  const storedProfile = getStoredCompanyProfile();
  if (storedProfile) return storedProfile;

  if (fallbackProfile) {
    saveStoredCompanyProfile(fallbackProfile);
    return fallbackProfile;
  }

  return null;
};