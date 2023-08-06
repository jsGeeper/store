import React, { useState } from 'react';
import { AppWrapper } from '../../components/layouts/app-wrapper';
import { Helmet } from 'react-helmet';
import { Box, Tabs, Tab, Divider } from '@mui/material';
import { TabPanel, a11yProps, tabStyle } from '../../components/tab-panel/TabPlaceholder';
import { TeamMembers } from '../../components/teams';

type TabSteps = 0 | 1;

const data: any[] = [
  {
    id: 1,
    storeOwnerName: 'John Doe',
    jobTitle: 'we need a plumber, we need a plumber',
    jobDescription: 'we need a plumber to fix our bathroom',
    jobType: 'Onsite',
    jobStatus: 'Active',
    jobDate: '2021-09-01',
    duration: '1 day',
    jobBudget: '1000',
    rangePeriod: 'per day',
    tags: ['plumber', 'bathroom', 'fix']
  },
  {
    id: 2,
    storeOwnerName: 'John Doe',
    jobTitle: 'we need a plumber',
    jobDescription: 'we need a plumber to fix our bathroom',
    jobType: 'Onsite',
    jobStatus: 'Active',
    jobDate: '2021-09-01',
    duration: '1 day',
    jobBudget: '1000',
    rangePeriod: 'per day',
    tags: ['plumber', 'bathroom', 'fix']
  },
  {
    id: 3,
    storeOwnerName: 'John Doe',
    jobTitle: 'we need a plumber',
    jobDescription: 'we need a plumber to fix our bathroom',
    jobType: 'Onsite',
    jobStatus: 'Active',
    jobDate: '2021-09-01',
    duration: '1 day',
    jobBudget: '1000',
    rangePeriod: 'per day',
    tags: ['plumber', 'bathroom', 'fix']
  },
  {
    id: 4,
    storeOwnerName: 'John Doe',
    jobTitle: 'we need a plumber',
    jobDescription: 'we need a plumber to fix our bathroom',
    jobType: 'Onsite',
    jobStatus: 'Active',
    jobDate: '2021-09-01',
    duration: '1 day',
    jobBudget: '1000',
    rangePeriod: 'per day',
    tags: ['plumber', 'bathroom', 'fix']
  },
  {
    id: 5,
    storeOwnerName: 'John Doe',
    jobTitle: 'we need a plumber',
    jobDescription: 'we need a plumber to fix our bathroom',
    jobType: 'Onsite',
    jobStatus: 'Active',
    jobDate: '2021-09-01',
    duration: '1 day',
    jobBudget: '1000',
    rangePeriod: 'per day',
    tags: ['plumber', 'bathroom', 'fix']
  }
];

export const TeamsScreen = () => {
  const [value, setValue] = useState<TabSteps>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: TabSteps) => {
    setValue(newValue);
  };

  return (
    <AppWrapper title='Teams'>
      <Helmet>
        <title>Teams | Go-Geeper</title>
      </Helmet>
      <Box paddingY={2} height={'100%'}>
        <Box height={'100%'} width={'100%'}>
          <Tabs value={value} onChange={handleChange} aria-label='jobs-tab'>
            <Tab label={`Members(1)`} {...a11yProps(0)} sx={tabStyle} />
            <Tab label={`Role(2)`} {...a11yProps(1)} sx={tabStyle} />
          </Tabs>
          <Divider />

          <TabPanel index={0} value={value}>
            <TeamMembers data={data} />
          </TabPanel>

          <TabPanel index={1} value={value}>
            <TeamMembers data={data} />
          </TabPanel>
        </Box>
      </Box>
    </AppWrapper>
  );
};
