import React from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, Tab, Box } from '@mui/material';
import { AppWrapper } from '../../../components/layouts/app-wrapper';
import truncateText from '../../../utils/truncateText';
import { OrderDetails, ProductDetails } from '../../../components/dashboard/single-listing';
import { a11yProps, TabPanel, tabStyle } from '../../../components/tab-panel/TabPlaceholder';

const SingleListing = () => {
  const [value, setValue] = React.useState<0 | 1>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: 0 | 1) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>add the product name - Go-Geeper</title>
      </Helmet>
      <main id={'singleListing'}>
        <AppWrapper title={truncateText('Store  / add the product name', 21)}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: '#F2F3F3' }}>
              <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                <Tab label='Product details' {...a11yProps(0)} sx={tabStyle} />
                <Tab label='Order details' {...a11yProps(1)} sx={tabStyle} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <ProductDetails />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <OrderDetails />
            </TabPanel>
          </Box>
        </AppWrapper>
      </main>
    </React.Fragment>
  );
};

export default SingleListing;
