import React from 'react';
import { Box, Modal, Stack, Typography, Button } from '@mui/material';
import { PopupStyle, modalStyle } from './modal.shared';
import { DeleteIcon } from '../../svgs/DeleteIcon';
import { OutlinedButton } from '../button/OutlinedButton';
import { useSnackbar } from '../../hooks/useSnackbar';
import { useDispatch } from 'react-redux';
import { deleteJobPost } from '../../redux/slice/jobs/jobs.slice';

interface IProps {
  open: boolean;
  onClose: () => void;
  jobId: string;
}

export const DeleteModal: React.FC<IProps> = ({ open, onClose, jobId }: IProps) => {
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const showSnackbarAlert = () => {
    showSnackbar('Job post has been deleted.', '', 'success', null, null);
  };

  const handleDelete = () => {
    dispatch(deleteJobPost(jobId));
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
        <Stack flexDirection={'column'} padding={'32px'}>
          <DeleteIcon />
          <Box marginTop={2}>
            <Typography variant={'h5'} gutterBottom component={'h5'} fontWeight={500} fontSize={18} color={'#101828'}>
              Delete job post
            </Typography>
            <Typography color='#667085' fontWeight={400} fontSize={14}>
              Are you sure you want to delete this post? This action cannot be undone.
            </Typography>
          </Box>

          <Stack marginTop={2} alignItems={'center'} flexDirection={'row'} justifyContent={'space-between'}>
            <Box width={'45%'}>
              <OutlinedButton label='Cancel' padding='10px 18px' onClick={onClose} fullWidth />
            </Box>
            <Button
              variant='contained'
              sx={{
                backgroundColor: '#D92D20',
                width: '45%',
                color: '#fff',
                textTransform: 'none',
                padding: '10px 18px',
                boxShadow: 'none',
                fontSize: '1.6rem',
                borderRadius: '0.8rem',
                '&:hover': {
                  backgroundColor: '#D92D20'
                }
              }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};
