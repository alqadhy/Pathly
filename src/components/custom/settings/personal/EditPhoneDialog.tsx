import { useEffect, useState } from "react";

import SettingsDialog from "../common/SettingsDialog";
import AuthInput from "../../auth/AuthInput";
import AuthButton from "../../auth/AuthButton";

import {
  updateCurrentUser
} from "../../../../utils/storage.service";


type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (user: any) => void;
};

const EditPhoneDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: Props) => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (currentUser) {
      setCountryCode(currentUser.countryCode);
      setPhone(currentUser.phone);
    }
  }, [open]);

  const handleSave = () => {
    const updatedUser = {
      ...currentUser,
      countryCode,
      phone,
    };

updateCurrentUser(updatedUser);
    onSuccess(updatedUser);
    onOpenChange(false);
  };

  return (
    <SettingsDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Change Phone Number"
    >
      <div className="space-y-lg">
        <div className="flex gap-md">
          <div className="w-28">
            <AuthInput
              label="Code"
              value={countryCode}
              onChange={(e) =>
                setCountryCode(e.target.value)
              }
            />
          </div>

          <div className="flex-1">
            <AuthInput
              label="Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />
          </div>
        </div>

        <AuthButton onClick={handleSave}>
          Save Changes
        </AuthButton>
      </div>
    </SettingsDialog>
  );
};

export default EditPhoneDialog;