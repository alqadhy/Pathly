import { useEffect, useState } from 'react';
import { Send, Pencil, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useApplication, useSendApplicationMessage } from '@/hooks/useApplications';
import { useApplicationsUIStore } from '@/store/useApplicationsUIStore';

function buildDefaultMessage(firstName: string, jobTitle: string, companyName: string) {
  return `Congratulations, ${firstName}! 🎉

We're excited to let you know that you've been selected for the ${jobTitle} position at ${companyName}.
After carefully reviewing your application, we were impressed by your experience and background. We'd love to have you join our team.

Our HR team will contact you shortly with your official offer letter and onboarding details.

Congratulations once again, and welcome to the team!

Best regards,
The Hiring Team`;
}

export function SendMessageDialog() {
  const { activeModal, selectedApplicationId, closeModal } = useApplicationsUIStore();
  const open = activeModal === 'message';

  const { data: application } = useApplication(selectedApplicationId);
  const { mutate: sendMessage, isPending } = useSendApplicationMessage();

  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (application) {
      setSubject(application.jobTitle);
      setBody(
        buildDefaultMessage(
          application.name.split(' ')[0],
          application.jobTitle,
          application.companyName
        )
      );
    }
  }, [application]);

  if (!application) return null;

  const handleSend = () => {
    sendMessage(
      { id: application.id, subject, body },
      { onSuccess: closeModal }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeModal()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Send Message to {application.name.split(' ')[0]}</DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-between rounded-lg border px-3 py-2">
          <span className="text-sm text-muted-foreground">{subject}</span>
          <Pencil className="h-4 w-4 text-muted-foreground" />
        </div>

        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={12}
          className="resize-none"
        />

        <div className="flex items-center justify-between pt-2">
          <Button variant="ghost" size="sm" className="gap-1 text-indigo-600">
            <Sparkles className="h-4 w-4" />
            Rewrite AI
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={closeModal}>
              Send Mail
            </Button>
            <Button
              onClick={handleSend}
              disabled={isPending}
              className="gap-1 bg-indigo-600 hover:bg-indigo-700"
            >
              Send
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}