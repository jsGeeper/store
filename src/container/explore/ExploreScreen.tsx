import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '@gogeepernpm/storybook/lib';
import { AppWrapper } from '../../components/layouts/app-wrapper';
import { Helmet } from 'react-helmet';
import { Box } from '@mui/material';
import { JobFilter } from '../../components/jobs';
import { EmptyJobCard } from '../../components/jobs/EmptyJobCard';
import { JobGrid } from '../../components/jobs/JobGrid';
import { getExploreList } from '../../redux/slice/jobs/jobs.slice';
import { IRootReducerState } from '../../redux/IRootReducer';

export const ExploreScreen = () => {
  const dispatch = useDispatch();
  const { exploreList, loading } = useSelector((state: IRootReducerState) => state.jobs);

  React.useEffect(() => {
    dispatch(getExploreList());
  }, []);

  return (
    <AppWrapper title='Explore'>
      {loading && <Loader loading={loading} />}
      <Helmet>
        <title>Explore</title>
      </Helmet>

      <Box paddingY={5} paddingX={3}>
        {exploreList && exploreList.length < 1 ? (
          <EmptyJobCard type='job' />
        ) : (
          <>
            <JobFilter showPostJob={false} placeholder='Search for a job' />
            <JobGrid data={exploreList} type='explore' />
          </>
        )}
      </Box>
    </AppWrapper>
  );
};
