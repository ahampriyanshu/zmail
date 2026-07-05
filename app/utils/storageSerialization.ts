import { EmailAttributes } from '@/types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isEmail = (value: unknown): value is EmailAttributes => {
  if (!isRecord(value)) return false;
  if (
    typeof value.id !== 'string' ||
    typeof value.subject !== 'string' ||
    typeof value.priority !== 'number' ||
    typeof value.type !== 'string' ||
    !isRecord(value.sender)
  ) {
    return false;
  }

  return (
    typeof value.sender.name === 'string' &&
    typeof value.sender.email === 'string'
  );
};

const parseJson = (storedValue: string | null): unknown => {
  if (!storedValue) return null;

  try {
    return JSON.parse(storedValue);
  } catch {
    return null;
  }
};

export const parseEmailList = (
  storedValue: string | null
): EmailAttributes[] => {
  const parsedValue = parseJson(storedValue);
  return Array.isArray(parsedValue) ? parsedValue.filter(isEmail) : [];
};

export const parseStringList = (storedValue: string | null): string[] => {
  const parsedValue = parseJson(storedValue);
  return Array.isArray(parsedValue)
    ? parsedValue.filter((item): item is string => typeof item === 'string')
    : [];
};
