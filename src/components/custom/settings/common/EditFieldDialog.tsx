import { useEffect, useState } from "react";

import SettingsDialog from "../common/SettingsDialog";
import AuthInput from "../../auth/AuthInput";
import AuthButton from "../../auth/AuthButton";
import type { User } from "../../../../types/auth.types";

import {
  getCurrentUser,
  updateCurrentUser,
} from "../../../../utils/storage.service";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  label: string;
  field: "fullName" | "location";
  onSuccess: (user: User) => void;
};

const EditFieldDialog = ({
  open,
  onOpenChange,
  title,
  label,
  field,
  onSuccess,
}: Props) => {
  const [value, setValue] =
    useState("");

  useEffect(() => {
    if (open) {
      const currentUser =
        getCurrentUser();

      if (currentUser) {
        setValue(
          currentUser[field] || ""
        );
      }
    }
  }, [open, field]);

  const handleSave = () => {
    const currentUser =
      getCurrentUser();

    if (
      !currentUser ||
      !value.trim()
    )
      return;

    const updatedUser = {
      ...currentUser,
      [field]: value.trim(),
    };

    updateCurrentUser(updatedUser);

    onSuccess(updatedUser);

    onOpenChange(false);
  };

  return (
    <SettingsDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
    >
      <div className="space-y-lg">
        <AuthInput
          label={label}
          value={value}
          onChange={(e) =>
            setValue(
              e.target.value
            )
          }
        />

        <AuthButton
          onClick={handleSave}
        >
          Save Changes
        </AuthButton>
      </div>
    </SettingsDialog>
  );
};

export default EditFieldDialog;