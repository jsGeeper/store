import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Loader } from '@gogeepernpm/storybook/lib';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { JobInformation } from '../../components/jobs';
import _ from 'lodash';
import { AppWrapper } from '../../components/layouts/app-wrapper';
import { ExploreDetailsActions } from '../../components/jobs/ExploreDetailsActions';
import { getJobPerId } from '../../redux/slice/jobs/jobs.slice';
import { IRootReducerState } from '../../redux/IRootReducer';

export const ExploreSingleJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const { jobDetails, loading } = useSelector((state: IRootReducerState) => state.jobs);

  useEffect(() => {
    dispatch(getJobPerId(id));
  }, []);

  return (
    <AppWrapper title={`Explore / job / ${_.truncate(id, { length: 19 })}`}>
      <Helmet>
        <title>Explore / {_.truncate(id, { length: 19 })} - Go-Geeper</title>
      </Helmet>
      {loading && <Loader loading={loading} />}
      <Box paddingY={5} paddingX={2}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={8}>
            <JobInformation data={jobDetails} />
          </Grid>
          <Grid item xs={12} md={4}>
            <ExploreDetailsActions id={id} />
          </Grid>
        </Grid>
      </Box>
    </AppWrapper>
  );
};
