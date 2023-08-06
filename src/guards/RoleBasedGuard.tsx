import React from 'react';
import { Container, Alert, AlertTitle } from '@mui/material';

interface Props {
  children: React.ReactNode;
  accessibleRoles: ['Others', 'Farmer', 'Agric Owner', 'Agric Expert'];
}

const useCurrentRole: () => string = () => {
  const role = 'admin';
  return role;
};

const RoleBasedGuard = ({ children, accessibleRoles }: Props) => {
  const currentRole: string = useCurrentRole();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!accessibleRoles.includes(currentRole)) {
    return (
      <Container>
        <Alert severity='error'>
          <AlertTitle>Access Denied</AlertTitle>
          You are not authorized to access this page.
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
};

export default RoleBasedGuard;
