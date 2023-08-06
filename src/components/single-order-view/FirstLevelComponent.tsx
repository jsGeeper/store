import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

interface IProps {
  children?: React.ReactNode;
  orderID: string | undefined;
  status: React.ReactNode;
  createdAt: any;
}

export const FirstLevelComponent: React.FC<IProps> = ({ children, createdAt, orderID, status }: IProps) => {
  return (
    <Box sx={{ width: '100%', mb: '7.2rem' }}>
      <Grid container spacing={2} alignItems={'center'}>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              width: '100%',
              lineHeight: '3rem'
            }}
          >
            <Typography variant={'h1'} fontSize={24} fontWeight={600} lineHeight={'32px'} color={'#1D2939'}>
              Order #{orderID}
            </Typography>
            {status}
            <Typography variant={'body1'} fontSize={16} color={'#475467'} fontWeight={400}>
              {createdAt}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} alignSelf={'flex-start'}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>{children}</Box>
        </Grid>
      </Grid>
    </Box>
  );
};
