import React from 'react';
import { Button } from '@mui/material';

interface IActionButtonProps {
  variant?: 'contained' | 'outlined' | 'text';
  fullWidth?: boolean;
  width?: number;
  height?: number;
  onClick?: () => void;
  disabled?: boolean;
  bgColor?: string;
  type?: 'submit' | 'reset' | 'button';
  padding?: string;
  label?: string;
  [x: string]: any;
}

const ActionButton = ({
  variant = 'contained',
  onClick,
  height,
  width,
  fullWidth = false,
  bgColor = '#4CA30D',
  type = 'submit',
  label,
  padding = '1rem 14.5rem',
  ...props
}: IActionButtonProps) => {
  const buttonStyles = {
    padding: padding,
    backgroundColor: bgColor,
    height,
    width
  };

  return (
    <Button fullWidth={fullWidth} variant={variant} style={buttonStyles} onClick={onClick} type={type} {...props}>
      <p className='btnText'>{label}</p>
    </Button>
  );
};

export default ActionButton;
