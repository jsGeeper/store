import { Box, Stack, Typography, styled } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HiUser } from 'react-icons/hi';
import { BiCopy } from 'react-icons/bi';
import _ from 'lodash';
import { markJobAsComplete } from '../../redux/slice/jobs/jobs.slice';
import { MarkAsCompleteModal } from '../modals/MarkAsCompleteModal';

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

export const JobInformationActions: React.FC<any> = ({ id, status }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [completeActionModal, setCompleteActionModal] = React.useState(false);

  const toggleCompleteActionModal = () => {
    setCompleteActionModal(!completeActionModal);
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
          <StyledActionButton bgcolor={'#4CA30D'} onClick={() => navigate(`/dashboard/jobs/${id}/applicants`)}>
            <Typography fontSize='18px' fontWeight={500} color={'#fff'}>
              View Applicants
            </Typography>
          </StyledActionButton>

          {status && status.toLowerCase() !== 'completed' && (
            <StyledActionButton border={'1px solid #D0D5DD'} onClick={toggleCompleteActionModal}>
              <Typography fontSize='18px' fontWeight={500} color={'#344054'}>
                Mark as Complete
              </Typography>
            </StyledActionButton>
          )}
          <MarkAsCompleteModal open={completeActionModal} onClose={toggleCompleteActionModal} jobId={id} />
        </Stack>

        <Box>
          <Typography color={'#101828'} fontWeight={600} fontSize={18} mb={2}>
            Assigned to
          </Typography>
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <HiUser size={20} fill='#66C61C' />

            <Typography color={'#101828'} fontWeight={400} fontSize={16} textTransform={'capitalize'}>
              no assignee
            </Typography>
          </Stack>
        </Box>

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
                __html: `<p>${_.truncate('https://store.gogeeper.com/dashboard/jobs/${id}', {
                  length: 30
                })}</p>`
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
