import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { AppWrapper } from '../../components/layouts/app-wrapper';
import { Box, Grid } from '@mui/material';
import { JobInformation } from '../../components/jobs';
import { ApplicantDetailsAction } from '../../components/jobs/ApplicantDetailsAction';

export const MyJobDetailsScreen = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <AppWrapper title='My Jobs / 1'>
      <Helmet>
        <title>Explore / {_.truncate(id, { length: 19 })} - Go-Geeper</title>
      </Helmet>

      <Box paddingY={5} paddingX={2}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={8}>
            <JobInformation />
          </Grid>
          <Grid item xs={12} md={4}>
            <ApplicantDetailsAction id={id} />
          </Grid>
        </Grid>
      </Box>
    </AppWrapper>
  );
};
