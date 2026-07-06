'use client';
import { memo, useContext, useState } from 'react';
import styles from './footer.module.scss';
import { OpenInNewTab, ReadMail, VideoCamera } from '../Icons/Icons';
import { getRelativeTime } from '@/app/utils/date';
import { getInitialDate } from '@/app/utils/localStorage';
import { openInNewTab } from '@/app/utils/common';
import { getMeetScheduleUrl } from '@/app/utils/calendar';
import { AppContext } from '@/app/AppContext';
import { getUnopenedMailLabel } from '@/app/utils/mailCounts';

function Footer({ showDesktop = true }: { showDesktop?: boolean }) {
  const { state } = useContext(AppContext);
  const maxValue = 15;
  const currentValue = 3.7;
  const usedPercentage = (currentValue / maxValue) * 100;
  const unopenedMailCount = state.emails.filter(
    (email) => !email.isOpened
  ).length;
  const unopenedMailLabel = getUnopenedMailLabel(unopenedMailCount);

  const [date] = useState<string>(() => getInitialDate());

  const scheduleMeet = () => {
    openInNewTab(getMeetScheduleUrl());
  };

  return (
    <>
      <div
        className={`${styles.container} ${
          showDesktop ? '' : styles.hide_desktop
        }`}
      >
        <div className={styles.content}>
          <div className={styles.derive}>
            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{
                  width: `${usedPercentage}%`,
                }}
              ></div>
            </div>
            <button
              type='button'
              onClick={() =>
                openInNewTab('https://drive.google.com/drive/u/0/')
              }
              className={`flex justify-start align-center pt-1 ${styles.text}`}
            >
              <span className='underline mr-2 cursor'>{`${currentValue} GB of ${maxValue} GB used`}</span>{' '}
              <OpenInNewTab width={16} height={16} />
            </button>
          </div>

          <div className={styles.text}>
            <span className='underline'>Terms</span> ·{' '}
            <span className='underline'>Privacy</span> ·{' '}
            <span className='underline'>Programme Policies</span>
          </div>

          <div className={styles.text}>
            {date
              ? `Last account activity: ${getRelativeTime(date)}`
              : 'Last account activity: '}
          </div>
        </div>
      </div>

      <nav className={styles.mobile_nav} aria-label='Google apps'>
        <button
          type='button'
          className={`${styles.mobile_nav_item} ${styles.active}`}
          aria-current='page'
          aria-label='Mail'
        >
          <span className={styles.mobile_nav_icon}>
            <ReadMail height={24} width={24} strokeColor='#202124' />
            {unopenedMailCount > 0 ? (
              <span className={styles.mobile_badge}>{unopenedMailLabel}</span>
            ) : null}
          </span>
        </button>

        <button
          type='button'
          className={styles.mobile_nav_item}
          aria-label='Schedule Meet'
          onClick={scheduleMeet}
        >
          <VideoCamera height={24} width={24} strokeColor='#3c4043' />
        </button>
      </nav>
    </>
  );
}

export default memo(Footer);
