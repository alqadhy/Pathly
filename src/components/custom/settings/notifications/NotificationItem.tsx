import { Switch } from "../../../ui/switch";

type Props = {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const NotificationItem = ({
  label,
  checked,
  onCheckedChange,
}: Props) => {
  return (
    <div className="flex items-center justify-between py-sm">
      <p className="text-body-md font-medium text-dark">
        {label}
      </p>

      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};

export default NotificationItem;