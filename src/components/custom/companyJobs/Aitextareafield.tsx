import { Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FieldWrapper } from "./FieldWrapper";
import type {
  Control,
  FieldValues,
  Path,
  FieldErrors,
} from "react-hook-form";
import { Controller } from "react-hook-form";

interface AITextareaFieldProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  name: Path<TFormValues>;
  label: string;
  errors: FieldErrors<TFormValues>;
  placeholder?: string;
  onRewriteWithAI?: (currentValue: string) => void;
  isRewriting?: boolean;
}

export function AITextareaField<TFormValues extends FieldValues>({
  control,
  name,
  label,
  errors,
  placeholder = "Describe...",
  onRewriteWithAI,
  isRewriting = false,
}: AITextareaFieldProps<TFormValues>) {
  const error = errors[name]?.message as string | undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FieldWrapper label={label} htmlFor={name} error={error}>
          <div className="relative">
            <Textarea
              {...field}
              id={name}
              placeholder={placeholder}
              rows={4}
              className="resize-none bg-[var(--input)] border-[var(--border)] pb-12"
            />
            <Button
              type="button"
              size="sm"
              disabled={isRewriting}
              onClick={() => onRewriteWithAI?.(field.value ?? "")}
              className="absolute bottom-3 right-3 bg-[var(--primary-darker)] hover:bg-[var(--primary-dark)] text-white gap-1.5"
            >
              <Sparkles className="size-3.5" />
              {isRewriting ? "Rewriting..." : "Rewrite by AI"}
            </Button>
          </div>
        </FieldWrapper>
      )}
    />
  );
}