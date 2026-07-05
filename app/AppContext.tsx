'use client';
import React, {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { ACTION_TYPE, initialState } from './constants/ui.constants';
import { Action, AppState, EmailAttributes } from '@/types';
import {
  createEmailInLocalStorage,
  getEmailsFromLocalStorage,
  setInitialDate,
  setEmailsToLocalStorage,
  setRecentDate,
} from './utils/localStorage';
import { asyncEmailList, permanentEmailList } from './data';
import { Loader } from './components/Loader/Loader';

const hydrateEmail = (
  email: EmailAttributes,
  storedEmail?: EmailAttributes
): EmailAttributes => ({
  ...email,
  date: storedEmail?.date || email.date,
  isFav: storedEmail?.isFav ?? false,
  isActive: storedEmail?.isActive ?? true,
  isOpened: storedEmail?.isOpened ?? false,
});

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case ACTION_TYPE.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSideBarOpen: !state.isSideBarOpen,
      };
    case ACTION_TYPE.TOGGLE_MOBILE_DRAWER:
      return {
        ...state,
        isMobileDrawerOpen: !state.isMobileDrawerOpen,
      };
    case ACTION_TYPE.CLOSE_MOBILE_DRAWER:
      return {
        ...state,
        isMobileDrawerOpen: false,
      };
    case ACTION_TYPE.SET_MOBILE_SEARCH_ACTIVE:
      return {
        ...state,
        isMobileSearchActive: action.payload,
      };
    case ACTION_TYPE.TOGGLE_SPLIT_VIEW:
      return {
        ...state,
        isSplitViewActive: !state.isSplitViewActive,
      };
    case 'SET_SEARCH_PARAM':
      return {
        ...state,
        searchParam: action.payload || '',
      };
    case 'SET_FILTER_PARAM':
      return {
        ...state,
        filterParam: action.payload || 'inbox',
      };
    case 'PUSH_EMAIL':
      return {
        ...state,
        emails: state.emails.some((email) => email.id === action.payload.id)
          ? state.emails.map((email) =>
              email.id === action.payload.id ? action.payload : email
            )
          : [action.payload, ...state.emails],
      };
    case 'SET_IS_LOADED':
      return {
        ...state,
        isLoaded: action.payload,
      };
    case 'RESET_EMAILS':
      return {
        ...state,
        emails: action?.payload || getEmailsFromLocalStorage(),
      };
    case ACTION_TYPE.UPDATE_EMAIL: {
      return {
        ...state,
        emails: state.emails.map((email) => {
          if (email.id === action.payload.emailId) {
            return {
              ...email,
              ...action.payload.data,
            };
          }
          return email;
        }),
      };
    }
    default:
      return state;
  }
}

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(`
    ███████╗███╗   ███╗ █████╗ ██╗██╗     
    ╚══███╔╝████╗ ████║██╔══██╗██║██║     
      ███╔╝ ██╔████╔██║███████║██║██║     
     ███╔╝  ██║╚██╔╝██║██╔══██║██║██║     
    ███████╗██║ ╚═╝ ██║██║  ██║██║███████╗
    ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝
    `);
    const storedEmails = getEmailsFromLocalStorage();
    const storedEmailById = new Map(
      storedEmails.map((email) => [email.id, email])
    );
    const hydratedPermanentEmails = permanentEmailList.map((email) =>
      hydrateEmail(email, storedEmailById.get(email.id))
    );
    const storedAsyncEmails = asyncEmailList
      .filter((email) => storedEmailById.has(email.id))
      .map((email) => hydrateEmail(email, storedEmailById.get(email.id)));
    const knownEmailIds = new Set([
      ...permanentEmailList.map((email) => email.id),
      ...asyncEmailList.map((email) => email.id),
    ]);
    const otherStoredEmails = storedEmails.filter(
      (email) => !knownEmailIds.has(email.id)
    );
    const hydratedEmails = [
      ...hydratedPermanentEmails,
      ...storedAsyncEmails,
      ...otherStoredEmails,
    ];

    setEmailsToLocalStorage(hydratedEmails);
    dispatch({ type: 'SET_IS_LOADED', payload: true });
    dispatch({ type: 'RESET_EMAILS', payload: hydratedEmails });

    const newEmails = asyncEmailList.filter(
      (email) =>
        !storedEmails.some((storedEmail) => storedEmail.id === email.id)
    );
    if (newEmails.length > 0) {
      setInitialDate();
      setRecentDate();

      newEmails.forEach((email, index) => {
        setTimeout(
          () => {
            const data = {
              ...email,
              date: new Date().toISOString(),
              isFav: false,
              isActive: true,
              isOpened: false,
            };
            createEmailInLocalStorage(data);
            dispatch({ type: 'PUSH_EMAIL', payload: data });
          },
          (index + 1) * 3000
        );
      });
    }
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {isLoading ? <Loader setIsLoading={setIsLoading} /> : children}
    </AppContext.Provider>
  );
}

export default AppProvider;
