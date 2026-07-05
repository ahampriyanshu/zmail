import { EmailAttributes, EmailTag, EmailType } from '@/types';

const getSearchableText = (email: EmailAttributes) =>
  [
    email.subject,
    email.summary,
    email.id,
    email.sender.name,
    email.sender.email,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

export const filterMail = (
  email: EmailAttributes,
  type: EmailType,
  tag: EmailTag | null,
  searchParam: string
) => {
  switch (type) {
    case 'inbox':
      return email.tag === tag && email.isActive;
    case 'starred':
      return Boolean(email.isFav && email.isActive);
    case 'draft':
      return email.type === 'draft' && email.isActive;
    case 'bin':
      return !email.isActive;
    case 'search':
      return getSearchableText(email).includes(
        searchParam.toLowerCase().trim()
      );
    default:
      return email.type === type && email.isActive;
  }
};
