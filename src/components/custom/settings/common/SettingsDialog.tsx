import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
};

const SettingsDialog = ({
  open,
  onOpenChange,
  title,
  children,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px] rounded-2xl border-0 bg-card p-xl shadow-card">
        <DialogHeader>
          <DialogTitle className="text-heading-sm font-semibold text-text-primary">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="pt-md">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;