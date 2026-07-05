import assert from 'node:assert/strict';
import test from 'node:test';
import { parseEmailList, parseStringList } from './storageSerialization';

test('parseEmailList returns an empty list for invalid stored JSON', () => {
  assert.deepEqual(parseEmailList('not-json'), []);
});

test('parseEmailList keeps only email-shaped entries', () => {
  const storedValue = JSON.stringify([
    {
      id: 'linkedin',
      subject: 'I want to connect',
      priority: 1,
      type: 'inbox',
      sender: {
        name: 'Priyanshu Tiwari',
        email: 'invitations@linkedin.com',
      },
    },
    { id: 'broken' },
    null,
  ]);

  assert.deepEqual(
    parseEmailList(storedValue).map((email) => email.id),
    ['linkedin']
  );
});

test('parseStringList returns only string history entries', () => {
  assert.deepEqual(parseStringList(JSON.stringify(['inbox', 1, null])), [
    'inbox',
  ]);
});
