'use client';
import { TooltipProps } from '@/types';
import React, { useRef, useState } from 'react';

const Tooltip: React.FC<TooltipProps> = ({
  content,
  id = '',
  disabled = false,
  direction = 'bottom',
  delay = 400,
  children,
}: TooltipProps) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout.current = setTimeout(() => {
      setActive(true);
    }, delay);
  };

  const hideTip = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setActive(false);
  };

  if (!content) return <>{children}</>;

  return (
    <div
      id={id}
      className={`tooltip-wrapper ${disabled ? 'tooltip-disabled' : ''}`}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
      onFocus={showTip}
      onBlur={hideTip}
    >
      {children}
      {active && <div className={`tooltip-body ${direction}`}>{content}</div>}
    </div>
  );
};

export default Tooltip;
