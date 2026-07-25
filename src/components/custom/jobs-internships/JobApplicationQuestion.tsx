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
  const { control, register, watch, setValue, formState: { errors } } = form;
  
  const question = watch(`screeningQuestions.${index}`);
  // ✅ Watch the type separately to trigger re-render
  const questionType = watch(`screeningQuestions.${index}.type`);
  const [newOption, setNewOption] = useState("");

  if (!question) return null;

  const questionText = question.question;
  const questionOptions = question.options || [];
  const questionId = question.id;
  
  const hasType = !!questionType;
  const isPredefinedQuestion = !!questionId;
  const isFirstQuestion = index === 0;

  // ✅ Get errors for this question
  const questionError = errors.screeningQuestions?.[index];

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
            <div>
              <Input
                value={questionText}
                onChange={(e) => setValue(`screeningQuestions.${index}.question`, e.target.value)}
                className={`bg-input border-border font-medium ${questionError?.question ? 'border-red-500 border-2' : ''}`}
              />
              {questionError?.question && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {questionError.question.message}
                </p>
              )}
            </div>
          )}

          {!hasType && (
            <div>
              <Input
                placeholder="Answer"
                disabled
                className="bg-input border-border text-muted-foreground mt-2"
              />
              {questionError?.type && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  Please select a question type
                </p>
              )}
            </div>
          )}

          {hasType && questionType === "Short Answer" && (
            <div>
              <Input
                placeholder="Enter your answer..."
                {...register(`screeningQuestions.${index}.answer`)}
                className={`bg-input border-border mt-2 ${questionError?.answer ? 'border-red-500 border-2' : ''}`}
              />
              {questionError?.answer && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {questionError.answer.message}
                </p>
              )}
            </div>
          )}

          {hasType && questionType === "Long Answer" && (
            <div>
              <div className="relative mt-2">
                <Textarea
                  placeholder="describe..."
                  className={`min-h-[100px] bg-input border-border pr-24 ${questionError?.answer ? 'border-red-500 border-2' : ''}`}
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
              {questionError?.answer && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {questionError.answer.message}
                </p>
              )}
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
              
              {questionError?.answer && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {questionError.answer.message}
                </p>
              )}
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
                // ✅ هذا هو الجزء المصحح
                <Controller
                  control={control}
                  name={`screeningQuestions.${index}.answer`}
                  render={({ field }) => (
                    <>
                      <div className="space-y-2">
                        {questionOptions.map((opt, optIdx) => {
                          // نقوم بتحويل القيمة المخزنة (نص مفصول بفواصل) إلى مصفوفة للتحقق
                          const currentValues = field.value ? field.value.split(",").filter(Boolean) : [];
                          
                          return (
                            <div key={optIdx} className="flex items-center space-x-3">
                              <Checkbox
                                id={`q${index}-chk${optIdx}`}
                                // نتحقق هل القيمة موجودة في المصفوفة
                                checked={currentValues.includes(opt)}
                                className="h-5 w-5 rounded border-2 border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary [&_svg]:h-3 [&_svg]:w-3 [&_svg]:stroke-[3] [&_svg]:stroke-white [&_svg]:fill-none"
                                onCheckedChange={(checked) => {
                                  const newValues = checked
                                    ? [...currentValues, opt]
                                    : currentValues.filter((a) => a !== opt);
                                  
                                  // نعيد تحويل المصفوفة إلى نص مفصول بفواصل وتحديث الحقل رسمياً
                                  field.onChange(newValues.join(","));
                                }}
                              />  
                              <Label htmlFor={`q${index}-chk${optIdx}`} className="font-normal text-foreground">
                                {opt}
                              </Label>
                            </div>
                          );
                        })}
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
                      
                      {questionError?.answer && (
                        <p className="text-red-500 text-sm mt-1" role="alert">
                          {questionError.answer.message}
                        </p>
                      )}
                    </>
                  )}
                />
              )}
            </div>
          )}
        </div>

       
      </div>
    </div>
  );
}