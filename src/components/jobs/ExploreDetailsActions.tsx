import { Box, Stack, Typography, styled } from '@mui/material';
import React from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HiUser } from 'react-icons/hi';
import { BiCopy } from 'react-icons/bi';
import StarIcon from '../../graphics/dashboard/StarIcon';
import BadgeIcon from '../../graphics/dashboard/BadgeIcon';
import { AboutFarmerComponent } from './AboutFarmerComponent';
import { applyForJob } from '../../redux/slice/jobs/jobs.slice';
import { useSnackbar } from '../../hooks/useSnackbar';

const StyledActionButton = styled(Box)({
  width: '100%',
  height: '60px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
  cursor: 'pointer'
});

export const ExploreDetailsActions = ({ id }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [startApplication, setStartApplication] = React.useState(false);

  const handleApplication = () => {
    dispatch(applyForJob(id));
    setStartApplication(true);
  };

  React.useEffect(() => {
    if (startApplication) {
      showSnackbar('Application sent successfully', '', 'success', null, null);
      setStartApplication(false);
    }
  }, [startApplication]);

  return (
    <Box paddingY={10} paddingX={2}>
      <Stack
        spacing={8}
        flexDirection={'column'}
        alignItems={'flex-start'}
        width={'100%'}
        justifyContent={'flex-start'}
      >
        <Stack spacing={2} direction={'column'} alignItems={'center'} width={'100%'} justifyContent={'flex-start'}>
          <StyledActionButton bgcolor={'#4CA30D'} onClick={handleApplication}>
            <Typography fontSize='18px' fontWeight={500} color={'#fff'}>
              Apply
            </Typography>
          </StyledActionButton>

          <StyledActionButton border={'1px solid #D0D5DD'}>
            <Typography fontSize='18px' fontWeight={500} color={'#344054'}>
              Report this job
            </Typography>
          </StyledActionButton>
        </Stack>
        <AboutFarmerComponent />
        <Box>
          <Typography color={'#101828'} fontWeight={600} fontSize={18} mb={2}>
            Share this job
          </Typography>
          <Box display={'flex'} alignItems={'center'} position={'relative'} overflow={'hidden'}>
            <Box
              component={'div'}
              display={'inline-block'}
              mr={2}
              dangerouslySetInnerHTML={{
                __html: `<p>${_.truncate(`https://store.gogeeper.com/dashboard/jobs/${id}`)}</p>`
              }}
              sx={{
                padding: '10px 14px',
                border: '1px solid #EAECF0',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#475467'
              }}
            />
            <Box
              bgcolor={'#4CA30D'}
              padding={'10px'}
              position={'absolute'}
              right={18}
              borderRadius={'0px 8px 8px 0px'}
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                navigator.clipboard.writeText(`https://store.gogeeper.com/dashboard/jobs/${id}`);
              }}
            >
              <BiCopy size={13} fill='#fff' />
              <Typography component={'span'} marginLeft={0.5} fontWeight={500} fontSize={14} color={'#fff'}>
                Copy
              </Typography>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};
