import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppWrapper } from '../../components/layouts/app-wrapper';
import { Tabs, Tab, Box, Divider } from '@mui/material';
import { Helmet } from 'react-helmet';
import { TabPanel, a11yProps, tabStyle } from '../../components/tab-panel/TabPlaceholder';
import { SalesInsight } from '../../components/insight/SalesInsight';
import { ProductsInsight } from '../../components/insight/ProductsInsight';
import {
  fetchInsightCount,
  fetchProductInsightCount,
  fetchTopPerformingProducts
} from '../../redux/slice/insight/insight.slice';

type TabSteps = 0 | 1;

export const Insight: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<TabSteps>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: TabSteps) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchProductInsightCount());
    dispatch(fetchTopPerformingProducts());
    dispatch(fetchInsightCount());
  }, []);

  return (
    <AppWrapper title='Insights'>
      <Helmet>
        <title>Insights | Go-Geeper</title>
      </Helmet>

      <Box padding={2}>
        <Tabs value={value} onChange={handleChange} aria-label='jobs-tab'>
          <Tab label={`Sales`} {...a11yProps(0)} sx={tabStyle} />
          <Tab label={`Products`} {...a11yProps(1)} sx={tabStyle} />
        </Tabs>
        <Divider />
        <TabPanel value={value} index={0}>
          <SalesInsight />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProductsInsight />
        </TabPanel>
      </Box>
    </AppWrapper>
  );
};
