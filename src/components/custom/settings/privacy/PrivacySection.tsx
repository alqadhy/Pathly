import { useState } from "react";

import SettingsSection from "../common/SettingsSection";
import SettingsRadioGroup from "../common/SettingsRadioGroup";
import SettingsSwitch from "../common/SettingsSwitch";

import {
  getSettings,
  updatePrivacy,
} from "../../../../Services/settings.service";

const PrivacySection = () => {
  const [privacy, setPrivacy] = useState(
    getSettings().privacy
  );

  const handleVisibility = (
    value: "public" | "recruiters" | "private"
  ) => {
    const updated = {
      ...privacy,
      profileVisibility: value,
    };

    setPrivacy(updated);
    updatePrivacy(updated);
  };

  const handleSwitch = (
    key: "searchVisibility" | "activityStatus" | "dataCollection",
    checked: boolean
  ) => {
    const updated = {
      ...privacy,
      [key]: checked,
    };

    setPrivacy(updated);
    updatePrivacy(updated);
  };

  return (
    <SettingsSection title="Privacy & Visibility">
      <div className="space-y-xl">
        <div className="space-y-sm">
          <h3 className="text-body-md font-semibold text-text-primary">
            Profile Visibility
          </h3>

          <SettingsRadioGroup
            value={privacy.profileVisibility}
            onValueChange={(value) =>
              handleVisibility(
                value as
                  | "public"
                  | "recruiters"
                  | "private"
              )
            }
            options={[
              {
                value: "public",
                label: "Public",
              },
              {
                value: "recruiters",
                label: "Recruiters Only",
              },
              {
                value: "private",
                label: "Private",
              },
            ]}
          />
        </div>

        <SettingsSwitch
          title="Appear in Search Results"
          description="Allow recruiters to find your profile."
          checked={privacy.searchVisibility}
          onCheckedChange={(checked) =>
            handleSwitch(
              "searchVisibility",
              checked
            )
          }
        />

        <SettingsSwitch
          title="Show Activity Status"
          description="Let others know when you're active."
          checked={privacy.activityStatus}
          onCheckedChange={(checked) =>
            handleSwitch(
              "activityStatus",
              checked
            )
          }
        />

        <SettingsSwitch
          title="Allow Data Collection"
          description="Help improve AI recommendations using anonymous usage data."
          checked={privacy.dataCollection}
          onCheckedChange={(checked) =>
            handleSwitch(
              "dataCollection",
              checked
            )
          }
        />
      </div>
    </SettingsSection>
  );
};

export default PrivacySection;