import { birthday } from '@/data/celebration';

/**
 * True for the whole local calendar day of the birthday (and every
 * anniversary of it), so the page can switch from "is coming" to "is here".
 */
export function isBirthdayToday(now: Date = new Date()): boolean {
  return (
    now.getFullYear() >= birthday.year &&
    now.getMonth() === birthday.month - 1 &&
    now.getDate() === birthday.day
  );
}
