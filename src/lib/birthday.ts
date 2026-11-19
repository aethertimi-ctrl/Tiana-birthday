import { birthday } from '@/data/celebration';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function birthdayInYear(year: number): Date {
  return new Date(year, birthday.month - 1, birthday.day, 0, 0, 0);
}

/**
 * Local midnight for the next birthday, in the visitor's time zone.
 * On the birthday itself, keep today's date so the countdown doesn't roll over
 * while the celebration is in progress. After that day, target next year.
 */
export function birthdayStart(now: number = Date.now()): Date {
  const currentYear = new Date(now).getFullYear();
  const thisYear = birthdayInYear(currentYear);

  if (now < thisYear.getTime()) return thisYear;

  const tomorrow = new Date(currentYear, birthday.month - 1, birthday.day + 1, 0, 0, 0);
  return now < tomorrow.getTime() ? thisYear : birthdayInYear(currentYear + 1);
}

/** True only during the local calendar day of the birthday. */
export function hasArrived(now: number = Date.now()): boolean {
  const currentYear = new Date(now).getFullYear();
  const start = birthdayInYear(currentYear).getTime();
  const end = new Date(currentYear, birthday.month - 1, birthday.day + 1, 0, 0, 0).getTime();
  return now >= start && now < end;
}

/** e.g. "November 20" */
export const birthdayLabel = `${MONTHS[birthday.month - 1]} ${birthday.day}`;
