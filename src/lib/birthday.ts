import { birthday } from '@/data/celebration';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Local midnight at the start of the birthday, in the visitor's time zone. */
export function birthdayStart(): Date {
  return new Date(birthday.year, birthday.month - 1, birthday.day, 0, 0, 0);
}

/** True from the start of the birthday onwards (stays true afterwards, so the letter is always reachable). */
export function hasArrived(now: number = Date.now()): boolean {
  return now >= birthdayStart().getTime();
}

/** e.g. "November 20" */
export const birthdayLabel = `${MONTHS[birthday.month - 1]} ${birthday.day}`;
