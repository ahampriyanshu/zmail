'use client';
import { PopoverProps } from '@/types';
import React, { useEffect, useRef, useState } from 'react';
import styles from './popover.module.scss';
const Popover = ({ trigger, content }: PopoverProps) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handlePopoverToggle = () => {
    setIsPopoverVisible(!isPopoverVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target as Node)
    ) {
      setIsPopoverVisible(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsPopoverVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={styles['popover-container']} ref={popoverRef}>
      <div
        className={styles['popover-trigger']}
        onClick={handlePopoverToggle}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handlePopoverToggle();
          }
        }}
      >
        {trigger}
      </div>
      {isPopoverVisible && (
        <>
          <button
            type='button'
            className={styles['mobile-scrim']}
            aria-label='Close popover'
            onClick={() => setIsPopoverVisible(false)}
          />
          <div className={styles['popover-content']}>{content}</div>
        </>
      )}
    </div>
  );
};

export default Popover;
