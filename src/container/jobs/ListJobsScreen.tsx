import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { a11yProps, TabPanel, tabStyle } from '../../components/tab-panel/TabPlaceholder';
import { AppWrapper } from '../../components/layouts/app-wrapper';
import { ActiveJobTab, ArchivedJobTabs, CompletedJobTab, DraftTab } from '../../components/jobs';
import {
  fetchFarmerActiveJobs,
  fetchFarmerArchivedJobs,
  fetchFarmerCompletedJobs,
  fetchFarmerDraftJobs
} from '../../redux/slice/jobs/jobs.slice';
import { IRootReducerState } from '../../redux/IRootReducer';

type TabSteps = 0 | 1 | 2 | 3;

export const ListJobsScreen = () => {
  const dispatch = useDispatch();

  const { isInitiated } = useSelector((state: IRootReducerState) => state.auth);
  const { farmerActiveJobs, farmerCompletedJobs, farmerArchivedJobs, farmerDraftJobs } = useSelector(
    (state: IRootReducerState) => state.jobs
  );

  const [value, setValue] = useState<TabSteps>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: TabSteps) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchFarmerActiveJobs());
    dispatch(fetchFarmerCompletedJobs());
    dispatch(fetchFarmerArchivedJobs());
    dispatch(fetchFarmerDraftJobs());
  }, [isInitiated]);

  return (
    <AppWrapper title={'Jobs'}>
      <Helmet>
        <title>List Jobs | Go-Geeper</title>
      </Helmet>

      <Box sx={{ width: '100%' }} p={2}>
        <Box width={'100%'}>
          <Tabs value={value} onChange={handleChange} aria-label='jobs-tab'>
            <Tab label={`Active Jobs(${farmerActiveJobs.length})`} {...a11yProps(0)} sx={tabStyle} />
            <Tab label={`Completed Jobs(${farmerCompletedJobs.length})`} {...a11yProps(1)} sx={tabStyle} />
            <Tab label={`Archived Jobs(${farmerArchivedJobs.length})`} {...a11yProps(2)} sx={tabStyle} />
            <Tab label={`Draft(${farmerDraftJobs.length})`} {...a11yProps(3)} sx={tabStyle} />
          </Tabs>
          <Divider color={'#F2F3F3'} />
          <TabPanel index={0} value={value}>
            <ActiveJobTab data={farmerActiveJobs} />
          </TabPanel>
          <TabPanel index={1} value={value}>
            <CompletedJobTab data={farmerCompletedJobs} />
          </TabPanel>
          <TabPanel index={2} value={value}>
            <ArchivedJobTabs data={farmerArchivedJobs} />
          </TabPanel>
          <TabPanel index={3} value={value}>
            <DraftTab data={farmerDraftJobs} />
          </TabPanel>
        </Box>
      </Box>
    </AppWrapper>
  );
};
