import { ReactNode } from 'react';
import './error.css';

interface Props {
  children: ReactNode;
}
export default function SuccessNotification({ children }: Props) {
  return <div className='success'>{children}</div>;
}
