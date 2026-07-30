import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../../../ui/dialog";
import { ChevronLeft, X, Globe, Users, UserX } from "lucide-react";

interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  postVisibility: string;
  setPostVisibility: (val: any) => void;
  commentVisibility: string;
  setCommentVisibility: (val: any) => void;
}

export const PostSettingsModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  postVisibility,
  setPostVisibility,
  commentVisibility,
  setCommentVisibility,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-[90vw]! max-w-[550px]! p-0 bg-card border-none rounded-2xl shadow-2xl overflow-hidden [&>button]:hidden">
        {" "}
        <DialogTitle className="sr-only">Post Settings</DialogTitle>
        <div className="flex items-center justify-between p-5 md:p-6 pb-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-foreground">Post Settings</h2>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-border bg-transparent text-normal hover:bg-light transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 pt-2 space-y-8">
          {/* Who Can See */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-foreground">
              Who Can See your post?
            </h3>
            <div className="space-y-2">
              {[
                { label: "Anyone", icon: Globe },
                { label: "Connections only", icon: Users },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    className="flex items-center justify-between cursor-pointer group py-2"
                    onClick={() => setPostVisibility(item.label)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 text-foreground transition-colors group-hover:bg-slate-200">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <span className="text-[15px] font-semibold text-foreground">
                        {item.label}
                      </span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-[2.5px] flex items-center justify-center transition-colors ${postVisibility === item.label ? "border-primary" : "border-border"}`}
                    >
                      {postVisibility === item.label && (
                        <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                      )}
                    </div>
                  </div>
                  {item.label === "Anyone" && <hr className="border-border" />}
                </div>
              ))}
            </div>
          </div>

          {/* Who Can Comment */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-foreground">
              Who Can comment your post?
            </h3>
            <div className="space-y-2">
              {[
                { label: "Anyone", icon: Globe },
                { label: "Connections only", icon: Users },
                { label: "No one", icon: UserX },
              ].map((item, index) => (
                <div key={item.label}>
                  <div
                    className="flex items-center justify-between cursor-pointer group py-2"
                    onClick={() => setCommentVisibility(item.label)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 text-foreground transition-colors group-hover:bg-slate-200">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <span className="text-[15px] font-semibold text-foreground">
                        {item.label}
                      </span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-[2.5px] flex items-center justify-center transition-colors ${commentVisibility === item.label ? "border-primary" : "border-border"}`}
                    >
                      {commentVisibility === item.label && (
                        <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                      )}
                    </div>
                  </div>
                  {index !== 2 && <hr className="border-border" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
