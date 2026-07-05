'use client';
import React, { useContext, useState } from 'react';
import styles from './inbox-mails.module.scss';
import { AppContext } from '@/app/AppContext';
import {
  Inbox,
  InboxFilled,
  Sell,
  SellFilled,
  Social,
  SocialFilled,
} from '../Icons/Icons';
import { INBOX_FILTER_ACTIVE_COLOR } from '@/app/constants/ui.constants';
import { EmailList } from '../EmailList/EmailList';
import { EmailTag } from '@/types';

export const InboxMails = () => {
  const [selectedTag, setSelectedTag] = useState<EmailTag>('primary');
  const { state } = useContext(AppContext);
  const typeFilter = state?.filterParam || 'inbox';
  const sectionLabel = typeFilter === 'inbox' ? selectedTag : typeFilter;

  return (
    <div className='h-100'>
      <div className={styles.mobile_section_label}>{sectionLabel}</div>
      {typeFilter === 'inbox' ? (
        <div className={styles.filters}>
          <button
            type='button'
            className={`${styles.filter} ${
              'primary' === selectedTag ? styles.active : ''
            } `}
            aria-pressed={'primary' === selectedTag}
            onClick={() => setSelectedTag('primary')}
          >
            {'primary' === selectedTag ? (
              <InboxFilled
                height={18}
                width={18}
                strokeColor={INBOX_FILTER_ACTIVE_COLOR}
              />
            ) : (
              <Inbox height={18} width={18} />
            )}

            <div className={styles.title}>primary</div>

            <div
              className={'primary' === selectedTag ? styles.underline : 'none'}
            ></div>
          </button>
          <button
            type='button'
            className={`${styles.filter} ${
              'promotions' === selectedTag ? styles.active : ''
            } `}
            aria-pressed={'promotions' === selectedTag}
            onClick={() => setSelectedTag('promotions')}
          >
            {'promotions' === selectedTag ? (
              <SellFilled
                height={18}
                width={18}
                strokeColor={INBOX_FILTER_ACTIVE_COLOR}
              />
            ) : (
              <Sell height={18} width={18} />
            )}

            <div className={styles.title}>promotions</div>
            <div
              className={
                'promotions' === selectedTag ? styles.underline : 'none'
              }
            ></div>
          </button>{' '}
          <button
            type='button'
            className={`${styles.filter} ${
              'social' === selectedTag ? styles.active : ''
            } `}
            aria-pressed={'social' === selectedTag}
            onClick={() => setSelectedTag('social')}
          >
            {'social' === selectedTag ? (
              <SocialFilled
                height={18}
                width={18}
                strokeColor={INBOX_FILTER_ACTIVE_COLOR}
              />
            ) : (
              <Social height={18} width={18} />
            )}

            <div className={styles.title}>social</div>
            <div
              className={'social' === selectedTag ? styles.underline : 'none'}
            ></div>
          </button>
        </div>
      ) : null}

      <EmailList
        typeFilter={typeFilter}
        selectedTag={typeFilter === 'inbox' ? selectedTag : null}
      />
    </div>
  );
};
