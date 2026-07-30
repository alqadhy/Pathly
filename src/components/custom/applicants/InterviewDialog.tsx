import { useState } from 'react';
import { Video, Phone, Building2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useScheduleInterview } from '@/hooks/useApplications';
import { useApplicationsUIStore } from '@/store/useApplicationsUIStore';
import type { InterviewType } from '@/types/application.types';

const INTERVIEW_TYPES: { value: InterviewType; label: string; icon: typeof Video }[] = [
  { value: 'video', label: 'Video Call', icon: Video },
  { value: 'phone', label: 'Phone Call', icon: Phone },
  { value: 'onsite', label: 'On site', icon: Building2 },
];

export function InterviewDialog() {
  const { activeModal, selectedApplicationId, closeModal } = useApplicationsUIStore();
  const open = activeModal === 'interview';

  const [type, setType] = useState<InterviewType>('video');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const { mutate: scheduleInterview, isPending } = useScheduleInterview();

  if (!selectedApplicationId) return null;

  const handleSubmit = () => {
    scheduleInterview(
      {
        id: selectedApplicationId,
        interviewDetails: { type, date, time, notes: notes || undefined },
      },
      { onSuccess: closeModal }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeModal()}>
      <DialogContent className="p-5 max-w-170 min-h-[480px] flex flex-col">
  <DialogHeader>
    <DialogTitle className="mb-5">Interview</DialogTitle>
  </DialogHeader>

  <div className="flex flex-col flex-1 space-y-4">
    <div>
      <Label className="mb-5 block">Interview Type</Label>
      <div className="flex gap-2">
        {INTERVIEW_TYPES.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => setType(value)}
            className={cn(
              'flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors mb-4',
              type === value
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-muted-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="interview-date" className="mb-2">Date</Label>
        <Input
          id="interview-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="interview-time" className="mb-2">Time</Label>
        <Input 
          id="interview-time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
    </div>

    <div className="flex-1 mt-4">
      <Label htmlFor="interview-notes " className="mb-2">Notes (optional)</Label>
      <Textarea
        id="interview-notes"
        placeholder="Any specific instructions ..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="h-full min-h-[100px]"
      />
    </div>

    <div className="flex justify-end pt-2">
      <Button
        onClick={handleSubmit}
        disabled={!date || !time || isPending}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-6 rounded-sm"
      >
        Continue
      </Button>
    </div>
  </div>
</DialogContent>
    </Dialog>
  );
}