import React from 'react';
import { Badge } from '@mui/material';
import { BsDot } from 'react-icons/bs';

interface IProps {
  status: string;
  align?: 'left' | 'right' | 'center';
}

export const BadgeHandler: React.FC<IProps> = ({ status, align }: IProps) => {
  const badgeStyle = {
    padding: `2px 8px 2px 6px`,
    borderRadius: '1.6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    fontSize: '1.4rem',
    textTransform: 'capitalize',
    margin: align === 'center' ? '0 auto' : align === 'right' ? '0 0 0 auto' : '0 auto 0 0'
  };

  return (
    <>
      {status.toLowerCase() === 'delivered' && (
        <Badge sx={{ ...badgeStyle, color: 'green', backgroundColor: '#ECFDF3' }}>
          <BsDot size={22} />
          {status}
        </Badge>
      )}
      {status.toLowerCase() === 'processing' && (
        <Badge sx={{ ...badgeStyle, color: '#B54708', backgroundColor: '#FFFAEB' }}>
          <BsDot size={22} fill={'#B54708'} />
          {status}
        </Badge>
      )}
      {status.toLowerCase() === 'placed' && (
        <Badge sx={{ ...badgeStyle, color: '#B42318', backgroundColor: '#FEF3F2' }}>
          <BsDot size={22} fill={'#B42318'} />
          {status}
        </Badge>
      )}
      {status.toLowerCase() === 'shipped' && (
        <Badge sx={{ ...badgeStyle, color: '#027A48', backgroundColor: '#ECFDF3' }}>
          <BsDot size={22} fill={'#027A48'} />
          {status}
        </Badge>
      )}
    </>
  );
};
