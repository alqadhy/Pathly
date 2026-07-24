import AISettingsSection from "../../components/custom/settings/ai/AISettingsSection";
import AIPersonalitySection from "../../components/custom/settings/ai/AIPersonalitySection";
import CVSettingsSection from "../../components/custom/settings/cv/CVSettingsSection";
import NotificationSection from "../../components/custom/settings/notifications/NotificationSection";
import ProfileSection from "../../components/custom/settings/personal/ProfileSection";
import PrivacySection from "../../components/custom/settings/privacy/PrivacySection";

const SettingsPage = () => {
  return (
    <div className="flex w-full flex-col gap-xl">
      <ProfileSection />

      <AISettingsSection />

      <AIPersonalitySection />

      <CVSettingsSection />

      <NotificationSection />

      <PrivacySection />
    </div>
  );
};

export default SettingsPage;