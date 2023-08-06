import React from 'react';
import { Typography } from '@mui/material';

import DisplayImageUpload from '../get-started/personal-details/components/DisplayImageUpload';
import { PersonalInfo } from '../get-started/personal-details/screens';
import { PersonalDetailForm, UserLocationForm } from './components';
import { ROLES } from '../../utils/roles';

interface PersonalDetailsProps {
  user: any;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ user }: PersonalDetailsProps) => {
  // const { data } = useGetStore();
  return (
    <div className='form-container '>
      <h1 className='form-title'>Personal Details</h1>
      <div className='mb-2'>
        <DisplayImageUpload user={user} showText={false} />
      </div>
      <PersonalDetailForm user={user} />
      {user.role === ROLES.AGRIC_EXPERT && <UserLocationForm />}
    </div>
  );
};

export default PersonalDetails;
