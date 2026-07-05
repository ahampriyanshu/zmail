import * as React from 'react';
import styles from './icons.module.scss';

type IconBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  height?: number;
  width?: number;
  padding?: string;
};

const IconBtn = ({
  id = '',
  padding = '12px',
  children,
  style,
  type = 'button',
  ...buttonProps
}: IconBtnProps) => (
  <button
    id={id}
    type={type}
    className={styles.button}
    style={{ padding, ...style }}
    {...buttonProps}
  >
    {children}
  </button>
);
export { IconBtn };
