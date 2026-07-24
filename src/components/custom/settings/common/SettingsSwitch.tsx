import { Switch } from "../../../ui/switch";

type Props = {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const SettingsSwitch = ({
  title,
  description,
  checked,
  onCheckedChange,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-md py-md">
      <div className="space-y-xs">
        <p className="text-h4 font-semibold text-text-primary">
          {title}
        </p>

        <p className="text-body-sm text-dark">
          {description}
        </p>
      </div>

      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};

export default SettingsSwitch;