import React from 'react';
import { AppWrapper } from '../../components/layouts/app-wrapper';
import { Helmet } from 'react-helmet';
import { ProfileOverview } from '../../components/jobs/applicant/ProfileOverview';

export const ViewApplicantInformation = () => {
  return (
    <AppWrapper title={'Profile'}>
      <Helmet>
        <title>Applicant Information</title>
      </Helmet>

      <ProfileOverview />
    </AppWrapper>
  );
};
