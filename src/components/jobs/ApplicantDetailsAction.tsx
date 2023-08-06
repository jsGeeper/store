import React from 'react';
import { Box, Stack, Typography, styled, Avatar } from '@mui/material';
import { BiCopy } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { AboutFarmerComponent } from './AboutFarmerComponent';

interface Props {
  id: string | any;
}

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

export const ApplicantDetailsAction = ({ id }: Props) => {
  const navigate = useNavigate();

  const [isCompleted, setIsCompleted] = React.useState(false);
  const toggleCompletedState = () => {
    setIsCompleted(!isCompleted);
  };
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
          {isCompleted ? (
            <StyledActionButton
              bgcolor={'#2B5314'}
              //   onClick={() => navigate(`/dashboard/jobs/${id}/applicants`)}
              onClick={toggleCompletedState}
            >
              <Typography fontSize='18px' fontWeight={500} color={'#fff'}>
                Completed
              </Typography>
            </StyledActionButton>
          ) : (
            <StyledActionButton
              bgcolor={'#4CA30D'}
              //   onClick={() => navigate(`/dashboard/jobs/${id}/applicants`)}
              onClick={toggleCompletedState}
            >
              <Typography fontSize='18px' fontWeight={500} color={'#fff'}>
                Mark as Complete
              </Typography>
            </StyledActionButton>
          )}

          <StyledActionButton border={'1px solid #D0D5DD'}>
            <Typography fontSize='18px' fontWeight={500} color={'#344054'}>
              Raise a Dispute
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
                __html: `<p>https://store.gogeeper.com/dashboard/jobs/${id}</p>`
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
