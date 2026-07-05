'use client';
import { memo, useContext, useState } from 'react';
import styles from './sidebar.module.scss';
import Image from 'next/image';
import { AppContext } from '@/app/AppContext';
import { primaryLinks, secondaryLinks } from '@/app/config';
import {
  Alert,
  AlertFilled,
  AllInboxes,
  Clock,
  ClockFilled,
  Draft,
  DraftFilled,
  ExpandLess,
  ExpandMore,
  Fallback,
  Inbox,
  InboxFilled,
  Send,
  SendFilled,
  Star,
  StarFilled,
  Trash,
  TrashFilled,
} from '../Icons/Icons';
import { EmailType, IconMap } from '@/types';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { MAIL_DATA } from '@/app/data/links.data';
import { useEmailActions } from '@/app/hooks/useEmailActions';
import { PRODUCT_TOUR } from '@/app/constants/common.constants';
import { site } from '@/app/config';

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const { createDraftMail } = useEmailActions();
  const isSideBarOpen = state?.isSideBarOpen || false;
  const isMobileDrawerOpen = state?.isMobileDrawerOpen || false;
  const isMobileSearchActive = state?.isMobileSearchActive || false;
  const selectedFilterParam = state?.filterParam || 'inbox';
  const emails = state?.emails || [];

  const getActiveCount = (type: EmailType) => {
    const filteredEmails = emails?.filter(
      (email) => email.type === type && email.isActive
    );
    return filteredEmails?.length || 0;
  };

  const setFilterParam = (mailType: EmailType) => {
    router.push('/');
    dispatch({ type: 'SET_FILTER_PARAM', payload: mailType });
    dispatch({ type: 'CLOSE_MOBILE_DRAWER' });
  };

  const sendNewMail = () => {
    window.location.href = `mailto:${
      MAIL_DATA.EMAIL
    }?subject=${encodeURIComponent(
      MAIL_DATA.SUBJECT
    )}&body=${encodeURIComponent(MAIL_DATA.BODY)}`;
    createDraftMail(true);
  };

  const iconMap: IconMap = {
    inbox: {
      outlined: <Inbox strokeColor='#202124' height={20} width={20} />,
      filled: <InboxFilled strokeColor='#202124' height={20} width={20} />,
    },
    starred: {
      outlined: <Star strokeColor='#202124' height={20} width={20} />,
      filled: <StarFilled strokeColor='#202124' height={20} width={20} />,
    },
    snoozed: {
      outlined: <Clock strokeColor='#202124' height={20} width={20} />,
      filled: <ClockFilled strokeColor='#202124' height={20} width={20} />,
    },
    sent: {
      outlined: <Send strokeColor='#202124' height={20} width={20} />,
      filled: <SendFilled strokeColor='#202124' height={20} width={20} />,
    },
    draft: {
      outlined: <Draft strokeColor='#202124' height={20} width={20} />,
      filled: <DraftFilled strokeColor='#202124' height={20} width={20} />,
    },
    spam: {
      outlined: <Alert strokeColor='#202124' height={20} width={20} />,
      filled: <AlertFilled strokeColor='#202124' height={20} width={20} />,
    },
    bin: {
      outlined: <Trash strokeColor='#202124' height={20} width={20} />,
      filled: <TrashFilled strokeColor='#202124' height={20} width={20} />,
    },
  };

  return (
    <>
      <button
        type='button'
        className={`${styles.scrim} ${
          isMobileDrawerOpen ? styles.scrim_open : ''
        }`}
        aria-label='Close navigation drawer'
        onClick={() => dispatch({ type: 'CLOSE_MOBILE_DRAWER' })}
      />
      <div
        id={PRODUCT_TOUR.THIRD_STEP}
        className={`${styles.container} ${
          isSideBarOpen || isHovered ? styles.active : styles.collapsed
        } ${isMobileDrawerOpen ? styles.mobile_open : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        <div className={styles.mobile_drawer_header}>
          <span>{site.title}</span>
        </div>
        <div
          className={`${styles.compose_btn} ${
            isSideBarOpen || isHovered ? styles.active : styles.collapsed
          }`}
        >
          <button type='button' onClick={sendNewMail}>
            <div>
              <Image
                src='/icons/edit.png'
                alt='edit icon'
                width={24}
                height={24}
              />
            </div>
            <span>Compose</span>
          </button>
        </div>

        <div className={styles.links}>
          <div
            className={`${styles.link} ${styles.mobile_all_inboxes}`}
            aria-hidden='true'
          >
            <div className={styles.icon}>
              <AllInboxes strokeColor='#202124' height={20} width={20} />
            </div>
            <div className={styles.text}>
              <div className={styles.title}>All inboxes</div>
            </div>
          </div>

          {primaryLinks.map((link) => (
            <button
              type='button'
              key={link.id}
              className={`${styles.link} ${
                link.type === selectedFilterParam ? styles.active : ''
              } ${
                link.type !== 'inbox' && link.type !== 'draft'
                  ? styles.others
                  : ''
              } `}
              aria-current={
                link.type === selectedFilterParam ? 'page' : undefined
              }
              onClick={() => setFilterParam(link.type as EmailType)}
            >
              <div className={styles.icon}>
                {iconMap?.[link.type]?.[
                  link.type === selectedFilterParam ? 'filled' : 'outlined'
                ] || <Fallback width={24} height={24} />}
              </div>

              <div className={styles.text}>
                <div className={styles.title}>{link.type}</div>
                <div className={styles.count}>
                  {link?.isCountVisible
                    ? getActiveCount(link.type as EmailType)
                    : null}
                </div>
              </div>
            </button>
          ))}

          <button
            type='button'
            className={styles.expand_btn}
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <div className={styles.expand_icon}>
              {isExpanded ? (
                <ExpandLess height={20} width={20} />
              ) : (
                <ExpandMore width={20} height={20} />
              )}
            </div>
            <div className={styles.expand_text}>
              {isExpanded ? 'Less' : 'More'}
            </div>
          </button>

          <div className={styles.mobile_labels_heading}>All labels</div>
          {secondaryLinks.map((link) => (
            <button
              type='button'
              key={`mobile-${link.id}`}
              className={`${styles.link} ${styles.mobile_label_link} ${
                link.type === selectedFilterParam ? styles.active : ''
              } ${
                link.type !== 'inbox' && link.type !== 'draft'
                  ? styles.others
                  : ''
              } `}
              aria-current={
                link.type === selectedFilterParam ? 'page' : undefined
              }
              onClick={() => setFilterParam(link.type as EmailType)}
            >
              <div className={styles.icon}>
                {iconMap?.[link.type]?.[
                  link.type === selectedFilterParam ? 'filled' : 'outlined'
                ] || <Fallback width={24} height={24} />}
              </div>

              <div className={styles.text}>
                <div className={styles.title}>{link.type}</div>
              </div>
            </button>
          ))}

          {isExpanded
            ? secondaryLinks.map((link) => (
                <button
                  type='button'
                  key={link.id}
                  className={`${styles.link} ${styles.desktop_label_link} ${
                    link.type === selectedFilterParam ? styles.active : ''
                  } ${
                    link.type !== 'inbox' && link.type !== 'draft'
                      ? styles.others
                      : ''
                  } `}
                  aria-current={
                    link.type === selectedFilterParam ? 'page' : undefined
                  }
                  onClick={() => setFilterParam(link.type as EmailType)}
                >
                  <div className={styles.icon}>
                    {iconMap?.[link.type]?.[
                      link.type === selectedFilterParam ? 'filled' : 'outlined'
                    ] || <Fallback width={24} height={24} />}
                  </div>

                  <div className={styles.text}>
                    <div className={styles.title}>{link.type}</div>
                  </div>
                </button>
              ))
            : null}
        </div>
      </div>
      {pathname === '/' && !isMobileSearchActive ? (
        <button
          type='button'
          className={styles.mobile_compose_btn}
          onClick={sendNewMail}
        >
          <Image src='/icons/edit.png' alt='' width={24} height={24} />
          <span>Compose</span>
        </button>
      ) : null}
    </>
  );
}

export default memo(Sidebar);
