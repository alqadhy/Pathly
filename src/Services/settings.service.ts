const SETTINGS_KEY = "settings";

export interface Settings {
  notifications: {
    email: boolean;
    push: boolean;
    jobAlerts: boolean;
    community: boolean;
    marketing: boolean;
  };

privacy: {
  profileVisibility:
    | "public"
    | "recruiters"
    | "private";

  searchVisibility: boolean;
  activityStatus: boolean;
  dataCollection: boolean;
}

ai: {
  recommendations: boolean;
  cvSuggestions: boolean;
  jobMatching: boolean;
  careerInsights: boolean;

  personality: string;
  responseLength: string;
  frequency: string;
};

  cv: {
    autoSave: boolean;
    aiSuggestions: boolean;
    publicCV: boolean;
  };
}

const defaultSettings: Settings = {
  notifications: {
    email: true,
    push: true,
    jobAlerts: true,
    community: false,
    marketing: false,
  },

  privacy: {
    profileVisibility: "public",

    searchVisibility: true,
    activityStatus: true,
    dataCollection: false,
  },

ai: {
  recommendations: true,
  cvSuggestions: true,
  jobMatching: true,
  careerInsights: true,

  personality: "professional",
  responseLength: "short",
  frequency: "daily",
},

  cv: {
    autoSave: true,
    aiSuggestions: true,
    publicCV: false,
  },
};

/* ---------------- Get Settings ---------------- */

export const getSettings = (): Settings => {
  const settings =
    localStorage.getItem(SETTINGS_KEY);

  if (!settings) {
    saveSettings(defaultSettings);
    return defaultSettings;
  }

  return JSON.parse(settings);
};

/* ---------------- Save Settings ---------------- */

export const saveSettings = (
  settings: Settings
) => {
  localStorage.setItem(
    SETTINGS_KEY,
    JSON.stringify(settings)
  );
};

/* ---------------- Reset Settings ---------------- */

export const resetSettings = () => {
  saveSettings(defaultSettings);
};

/* ---------------- Update Notifications ---------------- */

export const updateNotifications =
  (
    notifications: Settings["notifications"]
  ) => {
    const settings =
      getSettings();

    saveSettings({
      ...settings,
      notifications,
    });
  };

/* ---------------- Update Privacy ---------------- */

export const updatePrivacy = (
  privacy: Settings["privacy"]
) => {
  const settings =
    getSettings();

  saveSettings({
    ...settings,
    privacy,
  });
};

/* ---------------- Update AI ---------------- */

export const updateAI = (
  ai: Settings["ai"]
) => {
  const settings =
    getSettings();

  saveSettings({
    ...settings,
    ai,
  });
};

/* ---------------- Update CV ---------------- */

export const updateCV = (
  cv: Settings["cv"]
) => {
  const settings =
    getSettings();

    saveSettings({
      ...settings,
      cv,
    });
};