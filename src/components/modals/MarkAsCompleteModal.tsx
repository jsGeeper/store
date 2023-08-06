import React from 'react';
import { Box, Modal, Stack, Typography, Button } from '@mui/material';
import { PopupStyle, modalStyle } from './modal.shared';
import { OutlinedButton } from '../button/OutlinedButton';
import { WarningIcon } from '../../svgs/WarningIcon';
import { useDispatch } from 'react-redux';
import { useSnackbar } from '../../hooks/useSnackbar';
import { markJobAsComplete } from '../../redux/slice/jobs/jobs.slice';

interface IProps {
  open: boolean;
  onClose: () => void;
  jobId: string;
}

export const MarkAsCompleteModal: React.FC<IProps> = ({ jobId, open, onClose }: IProps) => {
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();

  const showSnackbarAlert = () => {
    showSnackbar('Job Completed!', '', 'success', null, null);
  };

  const handleCompletion = () => {
    dispatch(markJobAsComplete(jobId));
    showSnackbarAlert();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ ...modalStyle }}
      closeAfterTransition
      aria-labelledby={`delete-modal ${jobId}`}
      aria-describedby={`modal-modal-description ${jobId}`}
    >
      <Box sx={{ ...PopupStyle, width: 393 }}>
        <Stack flexDirection={'column'} padding={'28px'}>
          <WarningIcon />
          <Box marginTop={2}>
            <Typography variant={'h5'} gutterBottom component={'h5'} fontWeight={500} fontSize={18} color={'#101828'}>
              You are about to mark this job post as complete.
            </Typography>
            <Typography color='#667085' fontWeight={400} fontSize={14}>
              Are you sure you want to mark this post as complete? This action cannot be undone.
            </Typography>
          </Box>

          <Stack marginTop={2} alignItems={'center'} flexDirection={'row'} justifyContent={'space-between'}>
            <Box flex={1}>
              <OutlinedButton label='Cancel' padding='10px 18px' onClick={onClose} fullWidth />
            </Box>
            <Button
              variant='contained'
              sx={{
                backgroundColor: '#4CA30D',
                marginLeft: '10px',
                color: '#fff',
                textTransform: 'none',
                padding: '9px 18px',
                boxShadow: 'none',
                fontSize: '1.6rem',
                borderRadius: '0.8rem',
                border: '1px solid #D0D5DD',
                '&:hover': {
                  backgroundColor: '#4CA30D'
                }
              }}
              onClick={handleCompletion}
            >
              Mark as complete
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};
