import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '@gogeepernpm/storybook/lib';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import { Box, Grid } from '@mui/material';
import { AppWrapper } from '../../components/layouts/app-wrapper';
import { JobInformation, JobInformationActions } from '../../components/jobs';
import { useDispatch, useSelector } from 'react-redux';
import { getJobPerId } from '../../redux/slice/jobs/jobs.slice';
import { IRootReducerState } from '../../redux/IRootReducer';

export const ViewJobScreen = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { jobDetails, loading } = useSelector((state: IRootReducerState) => state.jobs);

  useEffect(() => {
    dispatch(getJobPerId(id));
  }, []);

  return (
    <AppWrapper title={`Jobs / ${_.truncate(id, { length: 19 })}`}>
      <Helmet>
        <title>Jobs / {_.truncate(id, { length: 19 })} - Go-Geeper</title>
      </Helmet>
      {loading && <Loader loading={loading} />}
      <Box paddingY={5} paddingX={2}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={8}>
            <JobInformation data={jobDetails} />
          </Grid>
          <Grid item xs={12} md={4}>
            <JobInformationActions id={id} status={jobDetails?.status || 'status'} />
          </Grid>
        </Grid>
      </Box>
    </AppWrapper>
  );
};
