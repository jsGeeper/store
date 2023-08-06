import React, { ReactNode } from 'react';
import './error.css';

interface Props {
  children: ReactNode;
}
export default function ErrorNotification({ children }: Props) {
  return <div className='error'>{children}</div>;
}
