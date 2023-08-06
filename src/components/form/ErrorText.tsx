import React from 'react';
import { Typography } from '@mui/material';

interface IProps {
  error: any;
  visible: any;
}

interface IMsg {
  children: React.ReactNode;
}

const ErrorMessage = ({ children }: IMsg) => {
  return (
    <Typography variant='h6' align={'left'} color='error' fontWeight='400' gutterBottom>
      {children}
    </Typography>
  );
};

export const ErrorText: React.FC<IProps> = (props: IProps) => {
  if (!props.visible || !props.error) return null;
  return <ErrorMessage>{props.error}</ErrorMessage>;
};
