import { Avatar, Box, Stack, Typography } from '@mui/material';
import React from 'react';
import StarIcon from '../../graphics/dashboard/StarIcon';
import BadgeIcon from '../../graphics/dashboard/BadgeIcon';

export const AboutFarmerComponent: React.FC = () => {
  return (
    <Box>
      <Typography color={'#101828'} fontWeight={600} fontSize={18} mb={2}>
        About this farmer
      </Typography>
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <Avatar />

        <Stack direction='column' alignItems={'flex-start'}>
          <Typography color={'#101828'} fontWeight={500} fontSize={14} textTransform={'capitalize'} gutterBottom>
            Tiwanijesu Sulaiman
          </Typography>
          <Typography color={'#344054'} fontWeight={400} fontSize={12} textTransform={'capitalize'}>
            Farmer
          </Typography>
        </Stack>
      </Stack>

      <Stack direction={'row'} my={1} p={1} alignItems={'center'} spacing={2}>
        <StarIcon />
        <Typography color={'#475467'} fontWeight={400} fontSize={16} gutterBottom>
          4.6 (13 ratings)
        </Typography>
      </Stack>

      <Stack direction={'row'} my={1} p={1} alignItems={'center'} spacing={2}>
        <BadgeIcon />
        <Typography color={'#475467'} fontWeight={400} fontSize={16} textTransform={'capitalize'} gutterBottom>
          Verified
        </Typography>
      </Stack>
    </Box>
  );
};
