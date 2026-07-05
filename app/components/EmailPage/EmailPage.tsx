'use client';
import React, { useContext, useEffect } from 'react';
import { MailContainer } from '../EmailContent/MailContainer';
import { EmailViewHeader } from '../EmailHeader/EmailViewHeader';
import { useEmailActions } from '@/app/hooks/useEmailActions';
import { AppContext } from '@/app/AppContext';
import { emailList } from '@/app/data';

export const EmailPage = ({ id }: { id: string }) => {
  const { updateEmailArgs } = useEmailActions();
  const { state } = useContext(AppContext);

  useEffect(() => {
    if (!emailList.some((email) => email.id === id)) return;

    const emailData = state.emails || [];
    const emailDatum = emailData.find((email) => email?.id === id);

    if (!emailDatum) return;

    if (!emailDatum?.isOpened) {
      updateEmailArgs(id, { isOpened: true });
    }
  }, [updateEmailArgs, id, state.emails]);

  return (
    <div className='h-100 w-100'>
      <EmailViewHeader />
      <MailContainer id={id} />
    </div>
  );
};
