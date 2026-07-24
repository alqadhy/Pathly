import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

type Option = {
  value: string;
  label: string;
};

type Props = {
  value: string;
  onValueChange: (value: string) => void;
  options: Option[];
};

const SettingsRadioGroup = ({
  value,
  onValueChange,
  options,
}: Props) => {
  return (
    <RadioGroupPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      className="space-y-md"
    >
      {options.map((option) => (
        <label
          key={option.value}
          htmlFor={option.value}
          className="flex cursor-pointer items-center gap-md"
        >
          <RadioGroupPrimitive.Item
            id={option.value}
            value={option.value}
            className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-border transition-colors data-[state=checked]:border-primary"
          >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
            </RadioGroupPrimitive.Indicator>
          </RadioGroupPrimitive.Item>

          <span className="text-body-md font-medium text-dark">
            {option.label}
          </span>
        </label>
      ))}
    </RadioGroupPrimitive.Root>
  );
};

export default SettingsRadioGroup;