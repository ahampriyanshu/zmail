import assert from 'node:assert/strict';
import test from 'node:test';
import { getMailboxFilterFromSearch } from './searchQuery';

test('getMailboxFilterFromSearch accepts mailbox commands with or without spaces', () => {
  assert.equal(getMailboxFilterFromSearch('in:sent'), 'sent');
  assert.equal(getMailboxFilterFromSearch('in: sent'), 'sent');
});

test('getMailboxFilterFromSearch ignores non-mailbox searches', () => {
  assert.equal(getMailboxFilterFromSearch('quarterly report'), null);
  assert.equal(getMailboxFilterFromSearch('in:unknown'), null);
});
