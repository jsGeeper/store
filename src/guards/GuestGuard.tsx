import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { IRootReducerState } from '../redux/IRootReducer';
import { PATH_DASHBOARD, PATH_MAIN } from '../router/pages';

interface Props {
  children: React.ReactNode;
}

const GuestGuard = ({ children }: Props) => {
  const { isAuthenticated } = useSelector((state: IRootReducerState) => state.auth);

  if (isAuthenticated) {
    return <Navigate to={`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.GET_STARTED}`} />;
  }

  return <>{children}</>;
};

export default GuestGuard;
