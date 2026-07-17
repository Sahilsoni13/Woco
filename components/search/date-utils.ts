export type DateRange = {
  from: Date | null;
  to: Date | null;
};

const MONTH_FORMATTER = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
const MONTH_DAY_FORMATTER = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

export function startOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function isBefore(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

export function isWithinRange(day: Date, from: Date | null, to: Date | null): boolean {
  if (!from || !to) return false;
  const time = startOfDay(day).getTime();
  return time > startOfDay(from).getTime() && time < startOfDay(to).getTime();
}

export function formatMonthYear(date: Date): string {
  return MONTH_FORMATTER.format(date);
}

export function formatMonthDay(date: Date): string {
  return MONTH_DAY_FORMATTER.format(date);
}

/** Calendar grid cells for a month, padded with `null` before day 1 so weeks align under Sun–Sat. */
export function getMonthGrid(monthStart: Date): Array<Date | null> {
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const cells: Array<Date | null> = Array.from({ length: firstWeekday }, () => null);
  for (let day = 1; day <= totalDays; day++) {
    cells.push(new Date(year, month, day));
  }
  return cells;
}
