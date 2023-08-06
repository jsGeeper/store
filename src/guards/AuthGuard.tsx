import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootReducerState } from '../redux/IRootReducer';
import { GatewayProcessor } from '../container/gateway-processor';

interface Props {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const { isAuthenticated } = useSelector((state: IRootReducerState) => state.auth);
  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState<null | string>(null);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <GatewayProcessor />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};

export default AuthGuard;
