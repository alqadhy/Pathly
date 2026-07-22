import { useState } from "react";

import SettingsSection from "../common/SettingsSection";
import SettingsField from "../common/SettingsField";

import EditPhoneDialog from "./EditPhoneDialog";
import EditPasswordDialog from "./EditPasswordDialog";
import EditFieldDialog from "../common/EditFieldDialog";
import type { User } from "../../../../types/auth.types";

const ProfileSection = () => {
  const [currentUser, setCurrentUser] =
    useState<User | null>(
      JSON.parse(
        localStorage.getItem(
          "currentUser"
        ) || "null"
      )
  );

  const [openPhoneDialog, setOpenPhoneDialog] =
    useState(false);

  const [
    openPasswordDialog,
    setOpenPasswordDialog,
  ] = useState(false);

  const [openNameDialog, setOpenNameDialog] =
    useState(false);

  const [
    openLocationDialog,
    setOpenLocationDialog,
  ] = useState(false);

  return (
    <>
      <SettingsSection
        title="Profile & Account"
      >
        <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
          <SettingsField
            label="Full Name"
            value={currentUser?.fullName || ""}
            editable
            onEdit={() =>
              setOpenNameDialog(true)
            }
          />

          <SettingsField
            label="Email"
            value={currentUser?.email || ""}
          />

          <SettingsField
            label="Phone Number"
            value={`${currentUser?.countryCode || ""} ${currentUser?.phone || ""}`}
            editable
            onEdit={() =>
              setOpenPhoneDialog(true)
            }
          />

          <SettingsField
            label="Location"
            value={
              currentUser?.location ||
              "Egypt"
            }
            editable
            onEdit={() =>
              setOpenLocationDialog(true)
            }
          />

          <SettingsField
            label="Password"
            value="••••••••"
            editable
            onEdit={() =>
              setOpenPasswordDialog(true)
            }
          />
        </div>
      </SettingsSection>

      <EditFieldDialog
        open={openNameDialog}
        onOpenChange={
          setOpenNameDialog
        }
        title="Edit Name"
        label="Full Name"
        field="fullName"
        onSuccess={setCurrentUser}
      />

      <EditFieldDialog
        open={openLocationDialog}
        onOpenChange={
          setOpenLocationDialog
        }
        title="Edit Location"
        label="Location"
        field="location"
        onSuccess={setCurrentUser}
      />

      <EditPhoneDialog
        open={openPhoneDialog}
        onOpenChange={
          setOpenPhoneDialog
        }
        onSuccess={setCurrentUser}
      />

      <EditPasswordDialog
        open={openPasswordDialog}
        onOpenChange={
          setOpenPasswordDialog
        }
        onSuccess={setCurrentUser}
      />
    </>
  );
};

export default ProfileSection;