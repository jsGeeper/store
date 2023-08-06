import React from 'react';
import { Button } from '@mui/material';

interface OutlinedButtonProps {
  label: string;
  onClick?: any;
  disabled?: boolean;
  [x: string]: any;
  padding?: string | number;
  fullWidth?: boolean;
}

const Trigger = {
  padding: '0.8rem 1.4rem',
  textTransform: 'none',
  color: '#344054',
  fontSize: '1.4rem',
  fontWeight: 500,
  border: '1px solid #D0D5DD',
  borderRadius: '0.8rem',
  boxShadow: `0 1px 2px rgba(16, 24, 40, 0.05)`,
  '&:hover': {
    backgroundColor: 'transparent',
    borderColor: '#f3fee7'
  }
};

export const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  label,
  disabled,
  onClick,
  padding,
  fullWidth = false,
  ...props
}: OutlinedButtonProps) => {
  return (
    <Button
      sx={{
        ...Trigger,
        padding: padding ? padding : Trigger.padding,
        width: fullWidth ? '100%' : 'auto'
      }}
      variant='outlined'
      color={'primary'}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {label}
    </Button>
  );
};
