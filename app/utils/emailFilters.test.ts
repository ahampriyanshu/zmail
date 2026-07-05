import assert from 'node:assert/strict';
import test from 'node:test';
import { EmailAttributes } from '@/types';
import { filterMail } from './emailFilters';

const baseEmail: EmailAttributes = {
  id: 'linkedin',
  sender: {
    name: 'Priyanshu Tiwari',
    email: 'invitations@linkedin.com',
  },
  subject: 'I want to connect',
  priority: 1,
  type: 'inbox',
  tag: 'primary',
  isActive: true,
  isFav: false,
};

test('filterMail search ignores missing optional fields', () => {
  assert.equal(filterMail(baseEmail, 'search', null, 'connect'), true);
  assert.equal(filterMail(baseEmail, 'search', null, 'missing'), false);
});

test('filterMail excludes inactive messages from inbox', () => {
  assert.equal(
    filterMail({ ...baseEmail, isActive: false }, 'inbox', 'primary', ''),
    false
  );
});
