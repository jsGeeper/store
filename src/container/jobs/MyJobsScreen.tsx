import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '@gogeepernpm/storybook/lib';
import { AppWrapper } from '../../components/layouts/app-wrapper';
import { Tabs, Tab, Box, Divider } from '@mui/material';
import { Helmet } from 'react-helmet';
import { a11yProps, TabPanel, tabStyle } from '../../components/tab-panel/TabPlaceholder';
import { SeeMyJobComponent } from '../../components/jobs/SeeMyJobComponent';
import { getExpertActiveJobs, getExpertCompletedJobs } from '../../redux/slice/jobs/jobs.slice';
import { IRootReducerState } from '../../redux/IRootReducer';

type TabSteps = 0 | 1;

export const MyJobsScreen = () => {
  const dispatch = useDispatch();
  const { loading, expertActiveJobs, expertCompletedJobs } = useSelector((state: IRootReducerState) => state.jobs);

  const [value, setValue] = useState<TabSteps>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: TabSteps) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getExpertActiveJobs());
    dispatch(getExpertCompletedJobs());
  }, []);

  return (
    <AppWrapper title='My Jobs'>
      <Helmet>
        <title>My Jobs | Go-Geeper</title>
      </Helmet>
      {loading && <Loader loading={loading} />}

      <Box padding={2}>
        <Tabs value={value} onChange={handleChange} aria-label='jobs-tab'>
          <Tab label={`Active Jobs(${expertActiveJobs?.length})`} {...a11yProps(0)} sx={tabStyle} />
          <Tab label={`Completed Jobs(${expertCompletedJobs?.length})`} {...a11yProps(1)} sx={tabStyle} />
        </Tabs>
        <Divider color={'#F2F3F3'} />
        <TabPanel value={value} index={0}>
          <SeeMyJobComponent data={expertActiveJobs} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SeeMyJobComponent data={expertCompletedJobs} />
        </TabPanel>
      </Box>
    </AppWrapper>
  );
};
