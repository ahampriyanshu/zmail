const IST_TIME_ZONE = 'Asia/Kolkata';
const IST_OFFSET_MINUTES = 5 * 60 + 30;
const TARGET_EMAIL = 'avampriyanshu@gmail.com';
const EVENT_DURATION_MINUTES = 30;

const formatGoogleCalendarDate = (date: Date) =>
  date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z');

const getIstParts = (date: Date) => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: IST_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  }).formatToParts(date);

  const valueFor = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value || '';

  return {
    year: Number(valueFor('year')),
    month: Number(valueFor('month')),
    day: Number(valueFor('day')),
    weekday: valueFor('weekday'),
  };
};

const weekdayIndexMap: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export const getNextSundayMeetRange = (from = new Date()) => {
  const { year, month, day, weekday } = getIstParts(from);
  const dayIndex = weekdayIndexMap[weekday] ?? 0;
  const daysUntilNextSunday = (7 - dayIndex) % 7 || 7;
  const istMidnightAsUtc = Date.UTC(year, month - 1, day);
  const tenAmIstAsUtcMinutes = 10 * 60 - IST_OFFSET_MINUTES;
  const start = new Date(
    istMidnightAsUtc +
      daysUntilNextSunday * 24 * 60 * 60 * 1000 +
      tenAmIstAsUtcMinutes * 60 * 1000
  );
  const end = new Date(start.getTime() + EVENT_DURATION_MINUTES * 60 * 1000);

  return { start, end };
};

export const getMeetScheduleUrl = (from = new Date()) => {
  const { start, end } = getNextSundayMeetRange(from);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Meet with Priyanshu',
    dates: `${formatGoogleCalendarDate(start)}/${formatGoogleCalendarDate(end)}`,
    add: TARGET_EMAIL,
    ctz: IST_TIME_ZONE,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
