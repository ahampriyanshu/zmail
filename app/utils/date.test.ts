import assert from 'node:assert/strict';
import test from 'node:test';
import { getMobileListDate } from './date';

test('getMobileListDate formats mobile list dates as day and short month', () => {
  assert.equal(getMobileListDate('2026-07-05T04:30:00.000Z'), '5 Jul');
});
