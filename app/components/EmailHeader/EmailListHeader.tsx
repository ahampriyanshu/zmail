'use client';
import React, { useContext } from 'react';
import styles from './email-header.module.scss';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  IconBtn,
  Refresh,
  ViewMore,
} from '../Icons/Icons';
import { AppContext } from '@/app/AppContext';
import { resetApp } from '@/app/utils/common';
import { PRODUCT_TOUR } from '@/app/constants/common.constants';

export const EmailListHeader = () => {
  const { state, dispatch } = useContext(AppContext);
  const toggleSplitView = () => {
    dispatch({ type: 'TOGGLE_SPLIT_VIEW' });
  };
  const isSplitViewActive = state?.isSplitViewActive || false;
  return (
    <div className={`${styles.container} ${styles.list_header}`}>
      <div className={styles.select_container}>
        <IconBtn
          id={PRODUCT_TOUR.FIFTH_STEP}
          aria-label='Reset app'
          onClick={resetApp}
          padding='6px'
        >
          <Refresh height={20} width={20} />
        </IconBtn>
        <IconBtn aria-label='More options' padding='6px'>
          <ViewMore height={20} width={20} />
        </IconBtn>
      </div>
      <div className={styles.details_container}>
        <div className={styles.pagination}>1-10 of 10</div>

        <IconBtn aria-label='Previous page' disabled padding='6px'>
          <ChevronLeft height={20} width={20} />
        </IconBtn>

        <IconBtn aria-label='Next page' disabled padding='6px'>
          <ChevronRight height={20} width={20} />
        </IconBtn>

        <div className='flex'>
          <IconBtn
            onClick={toggleSplitView}
            aria-label={
              isSplitViewActive ? 'Switch to list view' : 'Switch to grid view'
            }
            style={{
              width: 'auto',
              borderRadius: '4px',
              padding: '6px 1px',
            }}
          >
            {isSplitViewActive ? (
              <Image
                alt='list icon'
                src='/icons/list.png'
                height={20}
                width={20}
              />
            ) : (
              <Image
                alt='grid icon'
                src='/icons/grid.png'
                height={20}
                width={20}
              />
            )}
          </IconBtn>
        </div>
      </div>
    </div>
  );
};
