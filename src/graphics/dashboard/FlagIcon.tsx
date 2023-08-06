import React from 'react';

interface IFlagIconProps {
  isActive?: boolean;
}

const FlagIcon: React.FC<IFlagIconProps> = ({ isActive }: IFlagIconProps) => {
  const color = isActive ? '#027A48' : '#667085';
  const fill = isActive ? '#027A48' : 'transparent';

  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M5.15039 2V22'
        stroke={color}
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.15039 4H16.3504C19.0504 4 19.6504 5.5 17.7504 7.4L16.5504 8.6C15.7504 9.4 15.7504 10.7 16.5504 11.4L17.7504 12.6C19.6504 14.5 18.9504 16 16.3504 16H5.15039'
        stroke={color}
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
        fill={fill}
      />
    </svg>
  );
};

export default FlagIcon;
