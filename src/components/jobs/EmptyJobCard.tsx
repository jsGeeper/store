import React from 'react';
import { Box, Stack, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { JobIcon } from '../../svgs/JobIcon';
import { SimpleButton } from '../button/SimpleButton';
import { PATH_DASHBOARD } from '../../router/pages';

interface EmptyJobCardProps {
  type: string;
}

const StyledBoldText = styled(Typography)({
  color: '#101828',
  fontWeight: 600,
  fontSize: 24,
  textAlign: 'center'
});

export const EmptyJobCard: React.FC<EmptyJobCardProps> = ({ type }: EmptyJobCardProps) => {
  const navigate = useNavigate();
  return (
    <Box
      height={'75vh'}
      margin={' 0 auto'}
      maxWidth={495}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Stack
        width={'100%'}
        height='auto'
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={2}
      >
        <JobIcon />
        <Box>
          <StyledBoldText gutterBottom>
            No {type} {type === 'drafts' ? 'available' : 'posts'}
          </StyledBoldText>
          <Typography color='#475467' fontWeight={400} fontSize={16} textAlign={'center'}>
            Post jobs for agricultural experts, and Go-Geeper can help you find the right fit. Your active job posts
            would show up here.
          </Typography>
        </Box>
        <Box>
          <SimpleButton label='Post Job' onClick={() => navigate(PATH_DASHBOARD.JOBS + '/create')} />
        </Box>
      </Stack>
    </Box>
  );
};
