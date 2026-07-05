'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './email-list.module.scss';
import {
  Archive,
  Bin,
  Favourite,
  ReadMail,
  Time,
  UnFavourite,
  UnReadMail,
} from '../Icons/Icons';
import { getAbsoluteDate, getMobileListDate } from '@/app/utils/date';
import { useRouter } from 'next/navigation';
import { EmailAttributes } from '@/types';
import { getInitialDate } from '@/app/utils/localStorage';
import { useEmailActions } from '@/app/hooks/useEmailActions';
import { MAIL_DATA } from '@/app/data/links.data';

export const EmailItem = ({
  id,
  email,
}: {
  id: string;
  email: EmailAttributes;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { updateEmailArgs } = useEmailActions();

  const toggleCheckbox = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setIsChecked(!isChecked);
  };

  const toggleFavourite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    updateEmailArgs(email.id, { isFav: !email.isFav });
  };

  const toggleOpened = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    updateEmailArgs(email.id, { isOpened: !email.isOpened });
  };

  const deleteMail = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    updateEmailArgs(email.id, { isActive: false });
  };

  const doNothing = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  const handleOnClick = () => {
    if (email.type === 'draft') {
      window.location.href = `mailto:${
        MAIL_DATA.EMAIL
      }?subject=${encodeURIComponent(
        MAIL_DATA.SUBJECT
      )}&body=${encodeURIComponent(MAIL_DATA.BODY)}`;
    } else {
      router.push(email.id || '/linkedin', { scroll: false });
    }
  };

  const senderImg = email?.sender?.logo || 'avatar.png';

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOnClick();
    }
  };

  return (
    <div
      id={id}
      role='button'
      aria-label={`Open ${email.subject}`}
      draggable={false}
      className={`${styles.email_content} ${
        email.isOpened ? styles.is_opened : ''
      } ${isChecked ? styles.selected : ''}`}
      onClick={handleOnClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
    >
      <div className={styles.icon_cell}>
        <button
          type='button'
          className='icon-btn'
          aria-pressed={isChecked}
          aria-label={`${isChecked ? 'Deselect' : 'Select'} ${email.subject}`}
          onClick={toggleCheckbox}
        >
          <Image
            src={`/icons/${isChecked ? 'checkbox-active' : 'checkbox'}.png`}
            alt={`${isChecked ? 'checkbox-active' : 'checkbox'} icon`}
            width={20}
            height={20}
          />
        </button>

        <button
          type='button'
          aria-pressed={Boolean(email.isFav)}
          aria-label={`${email.isFav ? 'Remove star from' : 'Star'} ${
            email.subject
          }`}
          onClick={toggleFavourite}
        >
          {email.isFav ? (
            <UnFavourite
              key={email.id}
              width={20}
              height={20}
              strokeColor='rgb(247,202,105)'
            />
          ) : (
            <Favourite
              key={email.id}
              width={20}
              height={20}
              strokeColor='rgba(100, 121, 143, 0.5)'
            />
          )}
        </button>
        <div className={styles.mobile_avatar} aria-hidden='true'>
          <Image src={`/icons/${senderImg}`} alt='' width={40} height={40} />
        </div>
      </div>
      <div
        className={`${styles.name_cell} ${email.isOpened ? '' : 'font-bold'}`}
      >
        {email.sender.name}
        {email.type === 'draft' ? <span> Draft</span> : null}
      </div>
      <div className={styles.msg_cell}>
        <div className={styles.msg_content}>
          <div className={email.isOpened ? '' : 'font-bold'}>
            {email.subject}
            <span
              style={{
                letterSpacing: '0.1px',
              }}
              className={styles.summary}
            >
              - {email.summary}
            </span>
          </div>
          {email.file ? (
            <div className={styles.file}>
              <Image
                src={`/icons/${email.file.type}.png`}
                alt={`${email.file.type} icon`}
                width={16}
                height={16}
              />
              {email.file.name}
            </div>
          ) : null}
        </div>

        <div className={styles.options_container}>
          {isHovered ? (
            <div className={styles.options}>
              <button
                type='button'
                aria-label={`Archive ${email.subject}`}
                onClick={doNothing}
              >
                <Archive
                  height={18}
                  width={18}
                  strokeColor='rgba(0,0,0, 0.7)'
                />
              </button>

              <button
                type='button'
                aria-label={`Delete ${email.subject}`}
                onClick={deleteMail}
              >
                <Bin height={18} width={18} strokeColor='rgba(0,0,0, 0.7)' />
              </button>

              <button
                type='button'
                aria-label={`Mark ${email.subject} as ${
                  email.isOpened ? 'unread' : 'read'
                }`}
                onClick={toggleOpened}
              >
                {email.isOpened ? (
                  <UnReadMail
                    height={18}
                    width={18}
                    strokeColor='rgba(0,0,0, 0.7)'
                  />
                ) : (
                  <ReadMail
                    height={18}
                    width={18}
                    strokeColor='rgba(0,0,0, 0.7)'
                  />
                )}
              </button>

              <button
                type='button'
                aria-label={`Snooze ${email.subject}`}
                onClick={doNothing}
              >
                <Time height={18} width={18} strokeColor='rgba(0,0,0, 0.7)' />
              </button>
            </div>
          ) : (
            <span
              className={`${styles.date} ${email.isOpened ? '' : 'font-bold'}`}
            >
              {getAbsoluteDate(getInitialDate())}
            </span>
          )}
        </div>
      </div>
      <div className={styles.mobile_edge}>
        <span className={`${styles.date} ${email.isOpened ? '' : 'font-bold'}`}>
          {getMobileListDate(getInitialDate())}
        </span>
        <button
          type='button'
          aria-pressed={Boolean(email.isFav)}
          aria-label={`${email.isFav ? 'Remove star from' : 'Star'} ${
            email.subject
          }`}
          onClick={toggleFavourite}
        >
          {email.isFav ? (
            <UnFavourite
              key={email.id}
              width={22}
              height={22}
              strokeColor='rgb(247,202,105)'
            />
          ) : (
            <Favourite
              key={email.id}
              width={22}
              height={22}
              strokeColor='rgba(100, 121, 143, 0.8)'
            />
          )}
        </button>
      </div>
    </div>
  );
};
