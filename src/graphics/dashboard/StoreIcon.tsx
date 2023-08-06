import React from 'react';

interface IStoreIconProps {
  isActive?: boolean;
}

const StoreIcon: React.FC<IStoreIconProps> = ({ isActive }: IStoreIconProps) => {
  const color = isActive ? '#027A48' : '#667085';
  const fill = isActive ? '#027A48' : 'transparent';

  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3.00977 11.2207V15.7107C3.00977 20.2007 4.80977 22.0007 9.29977 22.0007H14.6898C19.1798 22.0007 20.9798 20.2007 20.9798 15.7107V11.2207'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.0005 12C13.8305 12 15.1805 10.51 15.0005 8.68L14.3405 2H9.67048L9.00048 8.68C8.82048 10.51 10.1705 12 12.0005 12Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18.3108 12C20.3308 12 21.8108 10.36 21.6108 8.35L21.3308 5.6C20.9708 3 19.9708 2 17.3508 2H14.3008L15.0008 9.01C15.1708 10.66 16.6608 12 18.3108 12Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.64037 12C7.29037 12 8.78037 10.66 8.94037 9.01L9.16037 6.8L9.64037 2H6.59037C3.97037 2 2.97037 3 2.61037 5.6L2.34037 8.35C2.14037 10.36 3.62037 12 5.64037 12Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 17C10.33 17 9.5 17.83 9.5 19.5V22H14.5V19.5C14.5 17.83 13.67 17 12 17Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default StoreIcon;
