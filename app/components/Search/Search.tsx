'use client';
import { ChangeEvent, KeyboardEvent, useContext, useRef } from 'react';
import styles from './search.module.scss';
import { AppContext } from '@/app/AppContext';
import { IconBtn } from '../Icons/IconBtn';
import { Back, Filters, SearchIcon } from '../Icons/Icons';
import { useEmailActions } from '@/app/hooks/useEmailActions';
import { PRODUCT_TOUR } from '@/app/constants/common.constants';
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

export function Search() {
  const { state, dispatch } = useContext(AppContext);
  const { isMobileSearchActive = false, searchParam = '' } = state || {};
  const { updateSearchHistory } = useEmailActions();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch({ type: 'SET_SEARCH_PARAM', payload: value });
    if (value === '') {
      dispatch({ type: 'SET_FILTER_PARAM', payload: 'inbox' });
    } else {
      dispatch({ type: 'SET_FILTER_PARAM', payload: 'search' });
    }
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const [command, type] = searchParam.split(/(?<=in: )/);
      updateSearchHistory(searchParam);
      if (command === 'in: ' && isEmailType(type)) {
        dispatch({ type: 'SET_FILTER_PARAM', payload: type });
      } else {
        dispatch({ type: 'SET_FILTER_PARAM', payload: 'search' });
      }
    }
  };

  const exitSearchMode = () => {
    inputRef.current?.blur();
    dispatch({ type: 'SET_MOBILE_SEARCH_ACTIVE', payload: false });
    if (!searchParam) {
      dispatch({ type: 'SET_FILTER_PARAM', payload: 'inbox' });
    }
  };

  return (
    <div
      className={`${styles.search_bar_container} ${
        isMobileSearchActive ? styles.search_active : ''
      }`}
    >
      <IconBtn
        aria-label='Exit search'
        className={styles.mobile_back_button}
        onMouseDown={(event) => event.preventDefault()}
        onClick={exitSearchMode}
        style={{
          padding: 6,
        }}
      >
        <Back />
      </IconBtn>
      <IconBtn
        aria-label='Search'
        className={styles.search_icon}
        style={{
          padding: 6,
        }}
      >
        <SearchIcon />
      </IconBtn>
      <IconBtn
        aria-label='Search filters'
        className={styles.filter_icon}
        disabled
        style={{
          padding: 6,
        }}
      >
        <Filters />
      </IconBtn>

      <input
        ref={inputRef}
        id={PRODUCT_TOUR.FOURTH_STEP}
        type='text'
        className={styles.search_input}
        placeholder='Search in emails'
        value={searchParam}
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
        onFocus={() =>
          dispatch({ type: 'SET_MOBILE_SEARCH_ACTIVE', payload: true })
        }
      />
    </div>
  );
}
