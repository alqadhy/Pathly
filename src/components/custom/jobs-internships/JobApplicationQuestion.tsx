import { useState } from "react";
import { Controller } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { JobApplicationFormData } from "../../../schemas/application.schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface JobApplicationQuestionProps {
  index: number;
  form: UseFormReturn<JobApplicationFormData>;
  onAddQuestion: () => void;
  isLastQuestion: boolean;
}

export function JobApplicationQuestion({
  index,
  form,
}: JobApplicationQuestionProps) {
  const { control, register, watch, setValue } = form;
  
  const question = watch(`screeningQuestions.${index}`);
  const [newOption, setNewOption] = useState("");

  if (!question) return null;

  const questionText = question.question;
  const questionType = question.type;
  const questionOptions = question.options || [];
  const questionId = question.id;
  
  const hasType = !!questionType;
  const isPredefinedQuestion = !!questionId;
  const isFirstQuestion = index === 0;

  console.log(`Question ${index}:`, { questionText, questionType, questionOptions, questionId });

  const handleAddOption = () => {
    const trimmed = newOption.trim();
    if (!trimmed || questionOptions.includes(trimmed)) {
      setNewOption("");
      return;
    }
    setValue(`screeningQuestions.${index}.options`, [...questionOptions, trimmed], {
      shouldDirty: true,
    });
    setNewOption("");
  };

  const handleOptionKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddOption();
    }
  };

  const currentAnswers =
    watch(`screeningQuestions.${index}.answer`)?.split(",").filter(Boolean) || [];

  return (
    <div className="bg-card p-6 rounded-lg border border-border space-y-4">
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-2 flex-1">
          <Label className="text-foreground font-medium">
            Question {index + 1}
          </Label>

          {isPredefinedQuestion ? (
            <h3 className="text-lg font-semibold text-foreground mt-1">
              {questionText}
            </h3>
          ) : (
            <Input
              value={questionText}
              onChange={(e) => setValue(`screeningQuestions.${index}.question`, e.target.value)}
              className="bg-input border-border font-medium"
            />
          )}

          {!hasType && (
            <Input
              placeholder="Answer"
              disabled
              className="bg-input border-border text-muted-foreground mt-2"
            />
          )}

          {hasType && questionType === "Short Answer" && (
            <Input
              placeholder="Enter your answer..."
              {...register(`screeningQuestions.${index}.answer`)}
              className="bg-input border-border mt-2"
            />
          )}

          {hasType && questionType === "Long Answer" && (
            <div className="relative mt-2">
              <Textarea
                placeholder="describe..."
                className="min-h-[100px] bg-input border-border pr-24"
                {...register(`screeningQuestions.${index}.answer`)}
              />
              <Button
                type="button"
                className="absolute bottom-3 right-3 bg-primary-darker hover:bg-primary-dark-hover text-white text-xs rounded-full px-4 py-1 h-8 flex items-center gap-1"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Rewrite AI
              </Button>
            </div>
          )}

          {hasType && questionType === "Multiple Choice" && (
            <div className="space-y-3 pt-2">
              <Controller
                control={control}
                name={`screeningQuestions.${index}.answer`}
                render={({ field: radioField }) => (
                  <RadioGroup
                    onValueChange={radioField.onChange}
                    value={radioField.value}
                    className="space-y-2"
                  >
                    {questionOptions.map((opt, optIdx) => (
                      <div key={optIdx} className="flex items-center space-x-3">
                        <RadioGroupItem
                          value={opt}
                          id={`q${index}-opt${optIdx}`}
                          className="h-4 w-4 border-primary text-primary [&_svg]:h-2.5 [&_svg]:w-2.5 [&_svg]:fill-white [&_svg]:text-white data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Label htmlFor={`q${index}-opt${optIdx}`} className="font-normal text-foreground">
                          {opt}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />

              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add another answer"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  onKeyDown={handleOptionKeyDown}
                  className="bg-input border-border h-9"
                />
                <Button type="button" size="sm" variant="outline" onClick={handleAddOption} className="shrink-0 gap-1">
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </div>
            </div>
          )}

          {hasType && questionType === "Check Box" && (
            <div className="space-y-3 pt-2">
              {isFirstQuestion ? (
                <Controller
                  control={control}
                  name={`screeningQuestions.${index}.answer`}
                  render={({ field: radioField }) => (
                    <RadioGroup
                      onValueChange={radioField.onChange}
                      value={radioField.value}
                      className="space-y-2"
                    >
                      {questionOptions.map((opt, optIdx) => (
                        <div key={optIdx} className="flex items-center space-x-3">
                          <RadioGroupItem
                            value={opt}
                            id={`q${index}-radio${optIdx}`}
                            className="h-4 w-4 border-primary text-primary [&_svg]:h-2.5 [&_svg]:w-2.5 [&_svg]:fill-white [&_svg]:text-white data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <Label htmlFor={`q${index}-radio${optIdx}`} className="font-normal text-foreground">
                            {opt}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
              ) : (
                <>
                  <div className="space-y-2">
                    {questionOptions.map((opt, optIdx) => (
                      <div key={optIdx} className="flex items-center space-x-3">
                    <Checkbox
  id={`q${index}-chk${optIdx}`}
  checked={currentAnswers.includes(opt)}
  className="h-5 w-5 rounded border-2 border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary [&_svg]:h-3 [&_svg]:w-3 [&_svg]:stroke-[3] [&_svg]:stroke-white [&_svg]:fill-none"
  onCheckedChange={(checked) => {
    const newAnswers = checked
      ? [...currentAnswers, opt]
      : currentAnswers.filter((a) => a !== opt);
    setValue(`screeningQuestions.${index}.answer`, newAnswers.join(","));
  }}
/>  
                        <Label htmlFor={`q${index}-chk${optIdx}`} className="font-normal text-foreground">
                          {opt}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Add another answer"
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      onKeyDown={handleOptionKeyDown}
                      className="bg-input border-border h-9"
                    />
                    <Button type="button" size="sm" variant="outline" onClick={handleAddOption} className="shrink-0 gap-1">
                      <Plus className="w-4 h-4" /> Add
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="w-48 shrink-0">
          <Controller
            control={control}
            name={`screeningQuestions.${index}.type`}
            render={({ field: typeField }) => (
              <Select 
                onValueChange={typeField.onChange} 
                value={typeField.value}
                disabled={isPredefinedQuestion}
              >
                <SelectTrigger className="bg-input w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Multiple Choice">Multiple Choice</SelectItem>
                  <SelectItem value="Check Box">Check Box</SelectItem>
                  <SelectItem value="Long Answer">Long Answer</SelectItem>
                  <SelectItem value="Short Answer">Short Answer</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
    </div>
  );
}