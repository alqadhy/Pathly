import { cn } from "../../lib/utils";
import { getATSScoreLabel } from "../../lib/utils";

interface ATSScoreBarProps {
  score: number; 
  showLabel?: boolean;
  className?: string;
}

function ATSScoreBar({ score, showLabel = true, className }: ATSScoreBarProps) {
  const clamped = Math.min(Math.max(score, 0), 100);

  const barColor =
    clamped < 50 ? "bg-danger" : clamped < 60 ? "bg-warning" : "bg-primary";

  return (
    <div className={cn("flex items-center gap-2 w-full", className)}>
      <div className="flex-1 h-1 rounded-radius-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-radius-full transition-all", barColor)}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {clamped}% ATS Score
        </span>
      )}
    </div>
  );
}

export default ATSScoreBar;
export { getATSScoreLabel };
