import { ReactElement, ReactNode } from 'react';

export type TooltipProps = {
  id?: string;
  disabled?: boolean;
  content: ReactNode;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  children?: ReactElement;
};

export type PopoverProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
};

export type ToastProps = {
  message: string;
  duration?: number;
};

export type EmailTag = 'primary' | 'social' | 'promotions';
export type EmailType =
  | 'inbox'
  | 'sent'
  | 'draft'
  | 'snoozed'
  | 'starred'
  | 'spam'
  | 'bin'
  | 'search';

export type Action =
  | { type: 'TOGGLE_SIDEBAR'; payload?: never }
  | { type: 'TOGGLE_MOBILE_DRAWER'; payload?: never }
  | { type: 'CLOSE_MOBILE_DRAWER'; payload?: never }
  | { type: 'SET_MOBILE_SEARCH_ACTIVE'; payload: boolean }
  | { type: 'TOGGLE_SPLIT_VIEW'; payload?: never }
  | { type: 'SET_SEARCH_PARAM'; payload: string }
  | { type: 'SET_FILTER_PARAM'; payload: EmailType }
  | { type: 'PUSH_EMAIL'; payload: EmailAttributes }
  | { type: 'SET_IS_LOADED'; payload: boolean }
  | { type: 'RESET_EMAILS'; payload?: EmailAttributes[] }
  | {
      type: 'UPDATE_EMAIL';
      payload: { emailId: string; data: Partial<EmailAttributes> };
    };

export type AppState = {
  isSideBarOpen: boolean;
  isMobileDrawerOpen: boolean;
  isMobileSearchActive: boolean;
  isSplitViewActive: boolean;
  searchParam: string;
  filterParam: EmailType;
  emails: EmailAttributes[];
  isLoaded: boolean;
};

export type EmailAttributes = {
  id: string;
  subject: string;
  summary?: string;
  body?: string;
  priority: number;
  type: EmailType;
  tag?: EmailTag;
  isOpened?: boolean;
  isFav?: boolean;
  isActive?: boolean;
  date?: string;
  sender: {
    name: string;
    logo?: string;
    email: string;
  };
  file?: {
    name: string;
    size: string;
    type: string;
  };
};

export type IconMap = {
  [key: string]: {
    [key: string]: JSX.Element;
  };
};
