import { AppState } from '@/types';

export const ICON_COLOR = '#5f6368';
export const ICON_COLOR_DARK = 'rgb(68, 71, 70)';
export const INBOX_FILTER_ACTIVE_COLOR = '#0b57d0';

export const ACTION_TYPE = {
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  TOGGLE_MOBILE_DRAWER: 'TOGGLE_MOBILE_DRAWER',
  CLOSE_MOBILE_DRAWER: 'CLOSE_MOBILE_DRAWER',
  SET_MOBILE_SEARCH_ACTIVE: 'SET_MOBILE_SEARCH_ACTIVE',
  TOGGLE_SPLIT_VIEW: 'TOGGLE_SPLIT_VIEW',
  UPDATE_EMAIL: 'UPDATE_EMAIL',
  SET_SEARCH_PARAM: 'SET_SEARCH_PARAM',
  SET_FILTER_PARAM: 'SET_FILTER_PARAM',
  PUSH_EMAIL: 'PUSH_EMAIL',
  SET_IS_LOADED: 'SET_IS_LOADED',
} as const;

export const initialState: AppState = {
  isSideBarOpen: true,
  isMobileDrawerOpen: false,
  isMobileSearchActive: false,
  isSplitViewActive: false,
  searchParam: '',
  filterParam: 'inbox',
  emails: [],
  isLoaded: false,
};
