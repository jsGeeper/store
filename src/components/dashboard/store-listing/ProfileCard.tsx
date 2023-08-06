import React from 'react';
import { Box, Grid, Typography, Avatar, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SimpleButton } from '../../button/SimpleButton';
import { PATH_DASHBOARD, PATH_MAIN } from '../../../router/pages';
import { StarRating } from '../../rating';

interface IProfileCard {
  storeInfo: any;
}

const BoxStyle = {
  padding: '10px',
  paddingTop: '3rem',
  marginTop: '-3rem',
  position: 'relative'
};

const ProfileCard: React.FC<IProfileCard> = ({ storeInfo }: IProfileCard) => {
  const navigate = useNavigate();

  // console.log('store info: ', storeInfo);

  const goTo = (page: string) => {
    navigate(page);
  };

  return (
    <Box sx={BoxStyle}>
      <Grid container spacing={3} m={0} width={'100%'}>
        <Grid container xs={1} sx={{ padding: '0' }}>
          <Box
            sx={{
              position: 'absolute',
              top: '0'
            }}
          >
            <Avatar
              alt={storeInfo.data.store.store_name}
              src={
                storeInfo.data.store.user.avatar ||
                `https://ui-avatars.com/api/?name=${storeInfo.data.store.store_name}`
              }
              sx={{ width: 100, height: 100, borderRadius: '50%', border: '0.3rem solid #fff' }}
            />
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Grid
            container
            flexDirection={'column'}
            gap={'10px 0'}
            alignItems={'flex-start'}
            justifyContent={'flex-start'}
          >
            <Typography variant={'h3'} color={'#101828'} fontWeight={'600'} mr={2} fontSize={24}>
              {storeInfo?.data.store.store_name}
            </Typography>
            <Stack direction={'row'} spacing={0.5} alignItems={'center'} justifyContent={'center'}>
              <StarRating value={0} name={'read-only'} readOnly />
              <Typography variant={'h5'} fontWeight={'400'} color={'#344054'} fontSize={'1.6rem'} fontFamily={'Inter'}>
                (0 ratings)
              </Typography>
            </Stack>
          </Grid>

          <Typography variant={'h5'}>{storeInfo?.storeDescription}</Typography>
        </Grid>
        <Grid
          container
          xs={4}
          alignContent={'flex-end'}
          justifyContent={'flex-end'}
          flexDirection={'row'}
          m={0}
          width={'100%'}
          flex={1}
        >
          <SimpleButton
            label={'List Products'}
            className={'mr-1'}
            onClick={() => goTo(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.LIST_PRODUCTS}`)}
          />
          <SimpleButton
            label={'Visit Marketplace'}
            style={{ background: '#fff', border: '1px solid #D0D5DD', color: '#344054' }}
            onClick={() => (window.location.href = 'https://marketplace.gogeeper.com')}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileCard;
