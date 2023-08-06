import React from 'react';

interface IButtonProps {
  label: string;
  style?: React.CSSProperties;
  onClick?: (key?: any) => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  [x: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const SimpleButton: React.FC<IButtonProps> = ({
  label,
  style,
  onClick,
  disabled,
  className,
  type = 'submit',
  loading = false,
  ...otherProps
}: IButtonProps) => (
  <button
    className={`simpleButton ${className} ${disabled ? 'btn-outline-grey' : ''}`}
    style={style}
    onClick={onClick}
    disabled={disabled}
    type={type}
    {...otherProps}
  >
    {loading ? 'loading....' : label}
  </button>
);
