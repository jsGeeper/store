import React, { useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Loader } from '@gogeepernpm/storybook/lib';
import { useSelector } from 'react-redux';
import { IRootReducerState } from '../../redux/IRootReducer';
import { PATH_MAIN, PATH_DASHBOARD } from '../../router/pages';
import { useGlobalAuth } from '../../hooks/useGlobalAuth';
import Logo from '../../assets/logo.png';
import mask from '../../assets/page_mask.png';
import Icon from '../../assets/store-icon.png';
import ActionButton from '../../components/button/ActionButton';

export const GatewayProcessor: React.FC = () => {
  const { triggerlogin, triggerSignUp } = useGlobalAuth();
  const { isAuthenticated } = useSelector((state: IRootReducerState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        window.location.href = PATH_MAIN.DASHBOARD + PATH_DASHBOARD.GET_STARTED;
      }, 1000);
    }
  }, [isAuthenticated]);

  return (
    <Box height={'100vh'} padding={10} position={'relative'}>
      {isAuthenticated ? (
        <Loader loading={true} />
      ) : (
        <>
          <Box component={'img'} src={Logo} />
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            height={'50%'}
            width={'100%'}
            maxWidth={'576px'}
            marginX={'auto'}
            position={'absolute'}
            bgcolor={'#fff'}
            zIndex={100}
            top={'50%'}
            left={'50%'}
            sx={{
              transform: 'translate(-50%,  -50%)'
            }}
          >
            <Stack direction={'column'} spacing={2} alignItems={'center'} justifyContent={'center'}>
              <Box component={'img'} src={Icon} />
              <Typography variant={'h5'} color={'#1D2939'} fontWeight={600} fontSize={'24px'}>
                Open a Go-Geeper Store in 3 Easy Steps
              </Typography>
              <Typography variant={'body1'} color={'#475467'} textAlign={'center'} fontWeight={400} fontSize={'16px'}>
                Reach millions of consumers every day by selling your products on the Go-Geeper’s marketplace.
              </Typography>
              <Stack direction={'column'} spacing={2} width={'129px'} alignItems={'center'} justifyContent={'center'}>
                <ActionButton label={'Get Started'} padding={'1rem 1.5rem'} onClick={triggerSignUp} />
                <ActionButton
                  label={'Login'}
                  variant={'text'}
                  padding={'1rem 1.5rem'}
                  bgColor={'transparent'}
                  sx={{ color: '#4CA30D' }}
                  onClick={triggerlogin}
                />
              </Stack>
            </Stack>
          </Box>
          <Box position={'fixed'} bottom={-80} left={-50} zIndex={-1}>
            <Box component={'img'} sx={{ opacity: 0.3 }} height={368.87} width={320.59} src={mask} />
          </Box>
        </>
      )}
    </Box>
  );
};
