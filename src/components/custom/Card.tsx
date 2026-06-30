import { CircleX } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "../../lib/utils";

export type CardActionTone = "primary" | "dark";
export type CardMediaShape = "circle" | "square";
export type CardMediaSize = "sm" | "md" | "lg";

export interface CardProps {
  title: string;
  titleAs?: "h2" | "h3" | "h4";
  subtitle?: string;
  body?: string;
  media?: {
    src: string;
    alt: string;
    shape?: CardMediaShape;
    size?: CardMediaSize;
  };
  meta?: {
    avatarSrc?: string;
    avatarAlt?: string;
    text: string;
  };
  actionLabel: string;
  actionTone?: CardActionTone;
  onAction?: () => void;
  onDismiss?: () => void;
  className?: string;
  children?: ReactNode;
  isActive?: boolean;
  actionState?: "default" | "following" | "pending" | "connected";
  viewType?: "companies" | "profiles";
}
const mediaSizeClasses: Record<CardMediaSize, string> = {
  sm: "h-16 w-16",
  md: "h-20 w-20",
  lg: "h-24 w-24",
};

export default function Card({
  title,
  titleAs: TitleTag = "h3",
  subtitle,
  body,
  media,
  meta,
  actionLabel,
  actionTone = "primary",
  onAction,
  onDismiss,
  className,
  children,
  isActive = false,
  actionState,
  viewType = "companies",
}: CardProps) {
  const mediaShape = media?.shape ?? "circle";
  const mediaSize = media?.size ?? "lg";

  const getButtonText = () => {
    if (!isActive) {
      return actionLabel;
    }
    
    if (viewType === "companies") {
      return "Following";
    }
    
    // For profiles
    if (actionState === "connected") {
      return "Connected";
    } else if (actionState === "pending") {
      return "Pending";
    }
    
    return "Following";
  };

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[20px] border border-border/70 bg-white px-3 py-3 shadow-[0_10px_26px_rgba(15,23,42,0.08)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(15,23,42,0.12)]",
        className,
      )}
    >
      {onDismiss ? (
        <button
          type="button"
          aria-label={`Dismiss ${title}`}
          onClick={onDismiss}
          className="absolute right-2.5 top-2.5 z-10 grid h-7 w-7 place-items-center rounded-full border border-border bg-white text-normal shadow-sm transition hover:border-primary-light hover:text-primary"
        >
          <CircleX className="size-4" />
        </button>
      ) : null}

      <div className="flex h-full flex-col items-center text-center">
        {media ? (
          <div className="mt-1 flex flex-col items-center">
            <div
              className={cn(
                "overflow-hidden bg-light/40 shadow-[0_10px_24px_rgba(15,23,42,0.12)]",
                mediaShape === "circle"
                  ? `${mediaSizeClasses[mediaSize]} rounded-full ring-4 ring-primary/10`
                  : `${mediaSizeClasses[mediaSize]} rounded-[18px] ring-4 ring-primary/10`,
              )}
            >
              <img
                src={media.src}
                alt={media.alt}
                className={cn(
                  "h-full w-full object-cover",
                  mediaShape === "circle" ? "rounded-full" : "rounded-[18px]",
                )}
              />
            </div>
          </div>
        ) : null}

        <TitleTag className="mt-3 text-[21px] font-extrabold leading-[1.15] tracking-[-0.03em] text-darker">
          {title}
        </TitleTag>

        {subtitle ? (
          <p className="mt-1 text-[14px] font-medium leading-5 text-[#a7b3d1]">
            {subtitle}
          </p>
        ) : null}

        {body ? (
          <p className="mt-0.5 max-w-55 text-[14px] font-medium leading-5 text-[#a7b3d1]">
            {body}
          </p>
        ) : null}

        {children}

        {meta ? (
          <div className="mt-3 flex items-center justify-center gap-2 text-left">
            {meta.avatarSrc ? (
              <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm">
                <img
                  src={meta.avatarSrc}
                  alt={meta.avatarAlt ?? `${title} meta avatar`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    // Show fallback
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
              <div class="h-full w-full bg-primary-light flex items-center justify-center text-[8px] font-medium text-primary">
                ${title?.charAt(0) || "U"}
              </div>
            `;
                    }
                  }}
                />
              </div>
            ) : (
              <div className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full border-2 border-white bg-primary-light shadow-sm flex items-center justify-center text-[8px] font-medium text-primary">
                {title?.charAt(0) || "U"}
              </div>
            )}
            <p className="max-w-42.5 text-[13px] leading-5 text-[#a7b3d1]">
              {meta.text}
            </p>
          </div>
        ) : null}

        <button
          type="button"
          onClick={onAction}
          className={cn(
            "mt-4 w-full rounded-xl px-3 py-2.5 text-[15px] font-semibold tracking-[0.01em] text-white transition",
            isActive
              ? "bg-gray-400 hover:bg-gray-500"
              : actionTone === "dark"
              ? "bg-primary-hover hover:bg-primary"
              : "bg-primary hover:bg-primary-hover",
          )}
        >
          {getButtonText()}
        </button>
      </div>
    </article>
  );
}
