import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "../../../ui/alert-dialog";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onDiscard: () => void;
  onSave: () => void;
}

export const DraftAlertDialog: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  onDiscard,
  onSave,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="w-[90vw] max-w-[450px]! p-6 bg-card border border-border rounded-3xl shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-h4 font-bold text-foreground">
            Save this post as a draft?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-body-sm text-normal mt-2">
            The post you started will be here when you return.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex sm:justify-center gap-3 mt-6 bg-white">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDiscard();
            }}
            className="flex-1 px-4 py-2 rounded-xl text-sm font-bold border-2 border-primary text-primary hover:bg-primary-light transition-colors"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSave();
            }}
            className="flex-1 px-4 py-2 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            Save
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
