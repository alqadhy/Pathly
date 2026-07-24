import { useState } from "react";

import AuthButton from "../../auth/AuthButton";
import AuthInput from "../../auth/AuthInput";

import SettingsDialog from "../common/SettingsDialog";

import {
  updateCurrentUser
} from "../../../../utils/storage.service";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (user: any) => void;
};

const EditPasswordDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: Props) => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] =
    useState("");

    const handleSave = () => {
    setError("");

    if (currentPassword !== currentUser.password) {
        setError("Current password is incorrect.");
        return;
    }

    if (newPassword !== confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

    const updatedUser = {
        ...currentUser,
        password: newPassword,
    };

updateCurrentUser(updatedUser);

    onSuccess(updatedUser);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    onOpenChange(false);
    };

  return (
    <SettingsDialog
      open={open}
      onOpenChange={
        onOpenChange
      }
      title="Change Password"
    >
      <div className="space-y-lg">
        <AuthInput
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(
              e.target.value
            )
          }
        />

        <AuthInput
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(
              e.target.value
            )
          }
        />

        <AuthInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          error={error}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
        />

        <AuthButton
          onClick={
            handleSave
          }
        >
          Save Changes
        </AuthButton>
      </div>
    </SettingsDialog>
  );
};

export default EditPasswordDialog;