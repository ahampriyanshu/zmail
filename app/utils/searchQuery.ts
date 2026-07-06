import { EmailType } from '@/types';

const emailTypes: EmailType[] = [
  'inbox',
  'sent',
  'draft',
  'snoozed',
  'starred',
  'spam',
  'bin',
  'search',
];

const isEmailType = (value: string): value is EmailType =>
  emailTypes.includes(value as EmailType);

export const getMailboxFilterFromSearch = (searchParam: string) => {
  const match = searchParam.trim().match(/^in:\s*(\S+)$/i);
  if (!match) return null;

  const type = match[1].toLowerCase();
  return isEmailType(type) ? type : null;
};
