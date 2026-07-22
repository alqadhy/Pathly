import { useState } from "react";

import SettingsSection from "../common/SettingsSection";
import SettingsSwitch from "../common/SettingsSwitch";

import {
  getSettings,
  updateAI,
} from "../../../../Services/settings.service";

const AISettingsSection = () => {
  const [aiSettings, setAISettings] =
    useState(getSettings().ai);

  const handleChange = (
    key: keyof typeof aiSettings,
    value: boolean
  ) => {
    const updated = {
      ...aiSettings,
      [key]: value,
    };

    setAISettings(updated);

    updateAI(updated);
  };

  return (
    <SettingsSection
      title="AI Assistant Settings"
    >
      <SettingsSwitch
        title="AI Career Coach"
        description="Get personalized career guidance, skill recommendations, and actionable advice based on your profile, experience, goals, and activity."
        checked={aiSettings.recommendations}
        onCheckedChange={(checked) =>
          handleChange(
            "recommendations",
            checked
          )
        }
      />

      <SettingsSwitch
        title="AI Resume Optimizer"
        description="Analyze your profile information and improve your CV content, formatting, and keywords to increase recruiter visibility.."
        checked={aiSettings.cvSuggestions}
        onCheckedChange={(checked) =>
          handleChange(
            "cvSuggestions",
            checked
          )
        }
      />

      <SettingsSwitch
        title="AI Learning Recommendations"
        description="Recommend courses, certifications, and learning paths based on your profile, skill gaps, career goals, and completed learning activities."
        checked={aiSettings.jobMatching}
        onCheckedChange={(checked) =>
          handleChange(
            "jobMatching",
            checked
          )
        }
      />

      <SettingsSwitch
        title="AI Job Recommendations"
        description="Recommend relevant job opportunities based on your skills, experience, preferred industries, career goals, and profile information."
        checked={aiSettings.careerInsights}
        onCheckedChange={(checked) =>
          handleChange(
            "careerInsights",
            checked
          )
        }
      />

      <SettingsSwitch
        title="AI Weekly Career Report"
        description="Receive weekly insights about your profile progress, learning achievements, job opportunities, and recommended next steps."
        checked={aiSettings.careerInsights}
        onCheckedChange={(checked) =>
          handleChange(
            "careerInsights",
            checked
          )
        }
      />
    </SettingsSection>
  );
};

export default AISettingsSection;