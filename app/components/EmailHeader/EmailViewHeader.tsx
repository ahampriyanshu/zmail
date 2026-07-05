'use client';
import React from 'react';
import styles from './email-header.module.scss';
import {
  Archive,
  Back,
  Bin,
  ChevronLeft,
  ChevronRight,
  IconBtn,
  UnReadMail,
  ViewMore,
} from '../Icons/Icons';
import { useRouter } from 'next/navigation';

export const EmailViewHeader = () => {
  const router = useRouter();

  return (
    <div className={`${styles.container} ${styles.view_header}`}>
      <div className={styles.select_container}>
        <div className={styles.back_btn}>
          <IconBtn
            aria-label='Back to inbox'
            padding='6px'
            onClick={() => router.push('/')}
          >
            <Back height={20} width={20} />
          </IconBtn>
        </div>
        <div className='flex'>
          <IconBtn aria-label='Archive message' padding='6px'>
            <Archive height={20} width={20} />
          </IconBtn>
          <IconBtn aria-label='Delete message' padding='6px'>
            <Bin height={20} width={20} />
          </IconBtn>
          <IconBtn aria-label='Mark as unread' padding='6px'>
            <UnReadMail height={20} width={20} />
          </IconBtn>
          <IconBtn aria-label='More options' padding='6px'>
            <ViewMore height={20} width={20} />
          </IconBtn>
        </div>
      </div>
      <div className={styles.details_container}>
        <IconBtn aria-label='Previous message' disabled padding='6px'>
          <ChevronLeft height={20} width={20} strokeColor='#b8b8b8' />
        </IconBtn>

        <IconBtn aria-label='Next message' disabled padding='6px'>
          <ChevronRight height={20} width={20} strokeColor='#b8b8b8' />
        </IconBtn>
      </div>
    </div>
  );
};
