import assert from 'node:assert/strict';
import test from 'node:test';
import { getUnopenedMailLabel } from './mailCounts';

test('getUnopenedMailLabel returns the exact count up to 99', () => {
  assert.equal(getUnopenedMailLabel(0), '0');
  assert.equal(getUnopenedMailLabel(12), '12');
  assert.equal(getUnopenedMailLabel(99), '99');
});

test('getUnopenedMailLabel caps counts above 99', () => {
  assert.equal(getUnopenedMailLabel(100), '99+');
});
