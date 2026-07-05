import assert from 'node:assert/strict';
import test from 'node:test';
import { getMeetScheduleUrl, getNextSundayMeetRange } from './calendar';

test('getNextSundayMeetRange schedules the following Sunday at 10 AM IST', () => {
  const { start, end } = getNextSundayMeetRange(
    new Date('2026-07-04T12:00:00.000Z')
  );

  assert.equal(start.toISOString(), '2026-07-05T04:30:00.000Z');
  assert.equal(end.toISOString(), '2026-07-05T05:00:00.000Z');
});

test('getNextSundayMeetRange skips today when the current IST day is Sunday', () => {
  const { start } = getNextSundayMeetRange(
    new Date('2026-07-05T02:00:00.000Z')
  );

  assert.equal(start.toISOString(), '2026-07-12T04:30:00.000Z');
});

test('getMeetScheduleUrl includes the invited email and calendar range', () => {
  const url = getMeetScheduleUrl(new Date('2026-07-04T12:00:00.000Z'));

  assert.match(url, /^https:\/\/calendar\.google\.com\/calendar\/render\?/);
  assert.match(url, /action=TEMPLATE/);
  assert.match(url, /dates=20260705T043000Z%2F20260705T050000Z/);
  assert.match(url, /add=avampriyanshu%40gmail\.com/);
  assert.match(url, /ctz=Asia%2FKolkata/);
});
