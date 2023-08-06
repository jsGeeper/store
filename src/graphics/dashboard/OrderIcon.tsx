import React from 'react';

interface IOrderIconProps {
  isActive?: boolean;
}

const OrderIcon: React.FC<IOrderIconProps> = ({ isActive }: IOrderIconProps) => {
  const color = isActive ? '#027A48' : '#667085';
  const fill = isActive ? '#027A48' : 'transparent';

  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3.16992 7.43945L11.9999 12.5494L20.7699 7.46942'
        stroke='#667085'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M12 21.6091V12.5391' stroke={color} strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
      <path
        d='M9.9306 2.48L4.59061 5.45003C3.38061 6.12003 2.39062 7.80001 2.39062 9.18001V14.83C2.39062 16.21 3.38061 17.89 4.59061 18.56L9.9306 21.53C11.0706 22.16 12.9406 22.16 14.0806 21.53L19.4206 18.56C20.6306 17.89 21.6206 16.21 21.6206 14.83V9.18001C21.6206 7.80001 20.6306 6.12003 19.4206 5.45003L14.0806 2.48C12.9306 1.84 11.0706 1.84 9.9306 2.48Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.9998 13.2396V9.57965L7.50977 4.09961'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default OrderIcon;
