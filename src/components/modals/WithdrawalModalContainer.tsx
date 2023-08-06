import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { MdClose } from 'react-icons/md';
import { PopupStyle, modalStyle } from './modal.shared';

interface IProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  modalTitle: string;
  children: React.ReactNode;
  showCloseIcon?: boolean;
  id?: string;
}

export const WithdrawalModalContainer: React.FC<IProps> = ({
  open,
  modalTitle,
  onClose,
  children,
  onSubmit,
  id,
  showCloseIcon = false
}: IProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ ...modalStyle }}
      closeAfterTransition
      aria-labelledby={`modal-modal-title ${id}`}
      aria-describedby={`modal-modal-description ${id}`}
    >
      <Box sx={{ ...PopupStyle }}>
        <Box
          padding={'24px 0px 16px'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={showCloseIcon ? 'space-between' : 'center'}
          width={'100%'}
        >
          <Typography color={'#344054'} fontWeight={500} fontSize={18} flex={1} textAlign={'center'}>
            {modalTitle}
          </Typography>
          {showCloseIcon && (
            <Box
              onClick={onClose}
              sx={{
                cursor: 'pointer',
                marginRight: '25px'
              }}
            >
              <MdClose fill={'#667085'} size={19} />
            </Box>
          )}
        </Box>

        <Box padding={'32px'}>{children}</Box>
      </Box>
    </Modal>
  );
};
