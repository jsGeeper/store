import React from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, Tab, Box } from '@mui/material';
import { Loader } from '@gogeepernpm/storybook/lib';
import { useSelector, useDispatch } from 'react-redux';
import { AppWrapper } from '../../components/layouts/app-wrapper';
import { a11yProps, TabPanel, tabStyle } from '../../components/tab-panel/TabPlaceholder';
import { IRootReducerState } from '../../redux/IRootReducer';
import { ROLES } from '../../utils/roles';
import useGetStore from '../../react-query/hooks/useGetStore';
// import useMe from '../../react-query/hooks/useMe';
import {
  FarmDetail,
  PersonalDetails,
  ExperienceTab,
  EducationTab,
  CertificationTab,
  SecurityTab,
  FundsAndSettlement,
  Preferences,
  StoreDetails
} from '../../components/profile-setting';
import ProfessionalBio from '../../components/profile-setting/ProfessionalBio';
import { fetchFarmInfoAndLocation, fetchSettlement } from '../../redux/slice/update-profile/profileUpdateAction';

type TabSteps = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const ProfileSetting = () => {
  const { data } = useGetStore();
  console.log(data, 'store=====>');
  const [value, setValue] = React.useState<TabSteps>(0);
  // const { data } = useMe();

  const dispatch = useDispatch();

  const { user } = useSelector((state: IRootReducerState) => state.auth);
  const { loading } = useSelector((state: IRootReducerState) => state.profileUpdate);

  const handleChange = (event: React.SyntheticEvent, newValue: TabSteps) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    dispatch(fetchFarmInfoAndLocation(user?.id));
    dispatch(fetchSettlement(user?.id));
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Account Settings | Go-Geeper</title>
      </Helmet>
      <main id='profileSetting'>
        {loading && <Loader loading={loading} />}
        <AppWrapper title='Account Settings'>
          <div className='container'>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: '#F2F3F3' }}>
                <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                  <Tab label='Personal Details' {...a11yProps(0)} sx={tabStyle} />
                  {user?.role === ROLES.AGRIC_EXPERT ? (
                    <Tab label='Professional Bio' {...a11yProps(1)} sx={tabStyle} />
                  ) : (
                    <Tab label='Farm Details' {...a11yProps(1)} sx={tabStyle} />
                  )}
                  {user?.role === ROLES.AGRIC_EXPERT && <Tab label='Experience' {...a11yProps(2)} sx={tabStyle} />}
                  {user?.role === ROLES.AGRIC_EXPERT && <Tab label='Education' {...a11yProps(3)} sx={tabStyle} />}
                  {user?.role === ROLES.AGRIC_EXPERT && <Tab label='Certification' {...a11yProps(4)} sx={tabStyle} />}
                  <Tab label='Security' {...a11yProps(5)} sx={tabStyle} />
                  <Tab label='Funding & Settlement' {...a11yProps(6)} sx={tabStyle} />
                  <Tab label='Preferences' {...a11yProps(7)} sx={tabStyle} />
                  <Tab label='Store Details ' {...a11yProps(8)} sx={tabStyle} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <PersonalDetails user={user} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                {user?.role === ROLES.AGRIC_EXPERT ? <ProfessionalBio user={user} /> : <FarmDetail />}
              </TabPanel>

              <TabPanel value={value} index={2}>
                {user?.role === ROLES.AGRIC_EXPERT ? <ExperienceTab /> : <SecurityTab />}
              </TabPanel>
              <TabPanel value={value} index={3}>
                {user?.role === ROLES.AGRIC_EXPERT ? <EducationTab /> : <FundsAndSettlement />}
              </TabPanel>
              <TabPanel value={value} index={4}>
                {user?.role === ROLES.AGRIC_EXPERT ? <CertificationTab /> : <Preferences />}
              </TabPanel>
              <TabPanel value={value} index={5}>
                {user?.role === ROLES.AGRIC_EXPERT ? <SecurityTab /> : <StoreDetails />}
              </TabPanel>
              <TabPanel value={value} index={6}>
                <FundsAndSettlement />
              </TabPanel>
              <TabPanel value={value} index={7}>
                <Preferences />
              </TabPanel>
              <TabPanel value={value} index={8}>
                <StoreDetails />
              </TabPanel>
            </Box>
          </div>
        </AppWrapper>
      </main>
    </React.Fragment>
  );
};

export default ProfileSetting;
