import { useState } from "react";

import SettingsSection from "../common/SettingsSection";
import SettingsSwitch from "../common/SettingsSwitch";

import {
  getSettings,
  updateCV,
} from "../../../../Services/settings.service";

const CVSettingsSection = () => {
  const [cvSettings, setCVSettings] =
    useState(getSettings().cv);

  const handleChange = (
    key: keyof typeof cvSettings,
    value: boolean
  ) => {
    const updated = {
      ...cvSettings,
      [key]: value,
    };

    setCVSettings(updated);

    updateCV(updated);
  };

  return (
    <SettingsSection
      title="CV Settings"
    >
      <SettingsSwitch
        title="Modern ATS Friendly"
        description="Choose the default resume template used when creating or exporting your CV. ATS-friendly templates help improve compatibility with applicant tracking systems."
        checked={cvSettings.autoSave}
        onCheckedChange={(checked) =>
          handleChange(
            "autoSave",
            checked
          )
        }
      />

      <SettingsSwitch
        title="Auto Save Resume"
        description="Automatically save changes made to your CV to prevent data loss and ensure your latest updates are always available."
        checked={cvSettings.aiSuggestions}
        onCheckedChange={(checked) =>
          handleChange(
            "aiSuggestions",
            checked
          )
        }
      />

      <SettingsSwitch
        title="Skill Gap Analysis"
        description="Identify missing skills and qualifications by comparing your profile and CV against your target career path and desired job roles."
        checked={cvSettings.publicCV}
        onCheckedChange={(checked) =>
          handleChange(
            "publicCV",
            checked
          )
        }
      />
    </SettingsSection>
  );
};

export default CVSettingsSection;