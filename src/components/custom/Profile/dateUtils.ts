import { format, isValid, parseISO } from 'date-fns';

const toDate = (value: string | Date | null | undefined): Date | null => {
  if (!value) return null;
  if (value instanceof Date) return isValid(value) ? value : null;

  if (typeof value === 'string' && value.trim().toLowerCase() === 'present') {
    return null;
  }

  const parsed = parseISO(String(value));
  if (isValid(parsed)) return parsed;

  const fallbackParsed = new Date(String(value));
  return isValid(fallbackParsed) ? fallbackParsed : null;
};

export const formatMonthYear = (
  value: string | Date | null | undefined,
  fallback = '—',
): string => {
  return formatCalendarDate(value, fallback);
};

export const formatCalendarDate = (
  value: string | Date | null | undefined,
  fallback = '—',
): string => {
  if (!value) return fallback;

  if (typeof value === 'string' && value.trim().toLowerCase() === 'present') {
    return 'Present';
  }

  const date = toDate(value);
  if (!date) return String(value).trim() || fallback;

  return format(date, 'MMM d, yyyy');
};

export const formatCalendarDateTime = (
  value: string | Date | null | undefined,
  fallback = '—',
): string => {
  if (!value) return fallback;

  if (typeof value === 'string' && value.trim().toLowerCase() === 'present') {
    return 'Present';
  }

  const date = toDate(value);
  if (!date) return String(value).trim() || fallback;

  return format(date, 'MMM d, yyyy h:mm a');
};