import EditButton from "./EditButton";

type Props = {
  label: string;
  value?: string;
  editable?: boolean;
  onEdit?: () => void;
};

const SettingsField = ({
  label,
  value,
  editable = false,
  onEdit,
}: Props) => {
  return (
    <div
      className=" flex items-center justify-between gap-lg py-lg"
    >
      <div className="space-y-xs">
        <p className="text-body-sm font-bold text-dark">
          {label}
        </p>

        <p className="text-body-lg font-medium text-text-primary">
            {value || "-"}
        </p>
      </div>

      {editable && <EditButton onClick={onEdit} />}
    </div>
  );
};

export default SettingsField;