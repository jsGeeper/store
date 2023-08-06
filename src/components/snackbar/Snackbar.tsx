import React, { useEffect } from 'react';
import { Stack, IconButton, Typography, Box } from '@mui/material';
import { GrClose } from 'react-icons/gr';
import { RiArrowRightLine } from 'react-icons/ri';
import { FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';
import './snackbar.css';
import { useSnackbar } from '../../hooks/useSnackbar';

export const Snackbar: React.FC = () => {
  const { isVisible, message, description, type, linkText, onClick, hideSnackbar } = useSnackbar();

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (isVisible) {
      timer = setTimeout(() => {
        hideSnackbar();
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [isVisible, hideSnackbar]);

  return (
    isVisible && (
      <div className={`snackbar  ${type}`}>
        <Stack direction={'row'} alignItems={'center'} mb={1} justifyContent={'space-between'}>
          {type === 'success' && <FiCheckCircle color='#6ce9a6' size={20} />}
          {type === 'error' && <FiAlertCircle size={20} color='#f26464' />}
          {type === 'info' && <FiInfo size={20} color='#17a2b8' />}

          <IconButton onClick={hideSnackbar}>
            <GrClose className={`close-icon-${type}`} />
          </IconButton>
        </Stack>
        <Box width={'100%'}>
          <Typography fontSize={14} fontWeight={500} className={`message message-${type}`}>
            {message}
          </Typography>

          {description && (
            <Typography fontSize={14} sx={{ opacity: 0.8 }} fontWeight={400} className={`description-${type}`}>
              {description}
            </Typography>
          )}

          {onClick && (
            <Typography
              fontSize={14}
              fontWeight={500}
              className={`action-${type}`}
              mt={1}
              onClick={onClick}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '0.4rem'
              }}
            >
              {linkText} <RiArrowRightLine size={17} />
            </Typography>
          )}
        </Box>
      </div>
    )
  );
};
