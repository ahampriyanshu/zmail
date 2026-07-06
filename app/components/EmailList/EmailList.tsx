'use client';
import React, { useContext } from 'react';
import styles from './email-list.module.scss';
import { EmailTag, EmailType } from '@/types';
import { EmailItem } from './EmailItem';
import { AppContext } from '@/app/AppContext';
import { PRODUCT_TOUR } from '@/app/constants/common.constants';
import { filterMail } from '@/app/utils/emailFilters';

type EmailListProps = {
  typeFilter: EmailType;
  selectedTag: EmailTag | null;
};

export const EmailList = ({ selectedTag, typeFilter }: EmailListProps) => {
  const { state } = useContext(AppContext);
  const { emails = [], searchParam = '' } = state || {};
  const filteredEmails = Array.isArray(emails)
    ? emails?.filter((email) =>
        filterMail(email, typeFilter, selectedTag, searchParam)
      )
    : [];

  return (
    <div className={styles.emails_container}>
      {filteredEmails?.length > 0 ? (
        filteredEmails.map((email, index) => (
          <EmailItem
            id={index === 0 ? PRODUCT_TOUR.SECOND_STEP : ''}
            key={email.id}
            email={email}
          />
        ))
      ) : (
        <div className={styles.no_emails}>
          {typeFilter === 'search'
            ? 'No messages matched your search. Try using search options such as sender, date, size and more.'
            : `No ${typeFilter === 'bin' ? 'trashed' : typeFilter} messages.`}
        </div>
      )}
    </div>
  );
};
