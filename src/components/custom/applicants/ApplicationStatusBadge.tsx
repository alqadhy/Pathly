import { cn } from '@/lib/utils';
import type { ApplicationStatus } from '@/types/application.types';

const STATUS_LABEL: Record<ApplicationStatus, string> = {
  pending: 'New',
  reviewed: 'Screening',
  interview: 'Interview',
  rejected: 'Rejected',
  hired: 'Hired',
};

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  pending: 'bg-blue-100 text-blue-700 border border-blue-200',
  reviewed: 'bg-amber-100 text-amber-700 border border-amber-200',
  interview: 'bg-teal-100 text-teal-700 border border-teal-200',
  rejected: 'bg-red-100 text-red-700 border border-red-200',
  hired: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
};

export function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        STATUS_STYLES[status]
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}