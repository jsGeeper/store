import React from 'react';
import Helmet from 'react-helmet';
import { AppWrapper } from '../../../components/layouts/app-wrapper';

const JobsContainer = () => {
  return (
    <main id='jobs'>
      <Helmet>
        <title>Jobs | Go-Geeper</title>
      </Helmet>
      <AppWrapper title={'Jobs'}>
        <h1>Jobs</h1>
      </AppWrapper>
    </main>
  );
};

export default JobsContainer;
