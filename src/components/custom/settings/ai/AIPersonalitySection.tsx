import { useState } from "react";

import SettingsSection from "../common/SettingsSection";
import SettingsRadioGroup from "../common/SettingsRadioGroup";

import {
  getSettings,
  updateAI,
} from "../../../../Services/settings.service";

const AIPersonalitySection = () => {
  const [ai, setAI] = useState(
    getSettings().ai
  );

  const handleChange = (
    key: keyof typeof ai,
    value: string
  ) => {
    const updated = {
      ...ai,
      [key]: value,
    };

    setAI(updated);
    updateAI(updated);
  };

  return (
    <SettingsSection title="AI Personality">
      <div className="space-y-2xl">
        <div className="space-y-md">
          <h3 className="text-body-lg font-semibold text-text-primary">
            Assistant Tone
          </h3>

          <SettingsRadioGroup
            value={ai.personality}
            onValueChange={(value) =>
              handleChange(
                "personality",
                value
              )
            }
            options={[
              {
                value: "professional",
                label: "Professional",
              },
              {
                value: "friendly",
                label: "Friendly",
              },
              {
                value: "motivational",
                label: "Motivational",
              },
            ]}
          />
        </div>

        <div className="space-y-md">
          <h3 className="text-body-lg font-semibold text-text-primary">
            Response Length
          </h3>

          <SettingsRadioGroup
            value={ai.responseLength}
            onValueChange={(value) =>
              handleChange(
                "responseLength",
                value
              )
            }
            options={[
              {
                value: "short",
                label: "Short",
              },
              {
                value: "medium",
                label: "Medium",
              },
              {
                value: "detailed",
                label: "Detailed",
              },
            ]}
          />
        </div>

        <div className="space-y-md">
          <h3 className="text-body-lg font-semibold text-text-primary">
            Recommendation Frequency
          </h3>

          <SettingsRadioGroup
            value={ai.frequency}
            onValueChange={(value) =>
              handleChange(
                "frequency",
                value
              )
            }
            options={[
              {
                value: "daily",
                label: "Daily",
              },
              {
                value: "weekly",
                label: "Weekly",
              },
              {
                value: "monthly",
                label: "Monthly",
              },
            ]}
          />
        </div>
      </div>
    </SettingsSection>
  );
};

export default AIPersonalitySection;