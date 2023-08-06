import React from 'react';

interface IExpertsIconProps {
  isActive?: boolean;
}

const ExpertsIcon: React.FC<IExpertsIconProps> = ({ isActive }: IExpertsIconProps) => {
  const color = isActive ? '#027A48' : '#667085';
  const fill = isActive ? '#027A48' : 'transparent';

  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M10.0495 2.5293L4.02953 6.4593C2.09953 7.7193 2.09953 10.5393 4.02953 11.7993L10.0495 15.7293C11.1295 16.4393 12.9095 16.4393 13.9895 15.7293L19.9795 11.7993C21.8995 10.5393 21.8995 7.7293 19.9795 6.4693L13.9895 2.5393C12.9095 1.8193 11.1295 1.8193 10.0495 2.5293Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.62914 13.0801L5.61914 17.7701C5.61914 19.0401 6.59914 20.4001 7.79914 20.8001L10.9891 21.8601C11.5391 22.0401 12.4491 22.0401 13.0091 21.8601L16.1991 20.8001C17.3991 20.4001 18.3791 19.0401 18.3791 17.7701V13.1301'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M21.4004 15V9' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
};

export default ExpertsIcon;
