import { Box, Typography, styled, Stack, Paper, Button } from '@mui/material';
import React from 'react';
import { CardIcon } from '../../svgs/CardIcon';
import { HiPlus } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { handleCloseModal, handleOpenModal } from '../../redux/slice/wallet/wallet.slice';
import Mastercard from '../../assets/svg/ic_mastercard.svg';

const StyledTypography = styled(Typography)({
  color: '#667085',
  fontWeight: 400,
  fontSize: 14
});

const actionButtonStyle = {
  color: '#4CA30D',
  fontFamily: 'Inter',
  fontWeight: '400',
  fontSize: '14px',
  ':hover': { backgroundColor: 'transparent' },
  mb: '10px',
  mt: '10px',
  position: 'sticky',
  justifyContent: 'flex-start',
  top: '0',
  borderRadius: '.8rem',
  zIndex: '1',
  backgroundColor: '#fff',
  textTransform: 'none'
};

const NoCardComponent = () => {
  const dispatch = useDispatch();
  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          border: '1px solid #EAECF0',
          p: 2,
          borderRadius: '8px'
        }}
      >
        <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} spacing={3}>
          <CardIcon />
          <Typography color='#344054B2' fontSize={14} fontWeight={500}>
            You have no card added
          </Typography>
        </Stack>
      </Paper>
      <Button
        size='small'
        startIcon={<HiPlus fill={'#4CA30D'} />}
        sx={actionButtonStyle}
        onClick={() => {
          dispatch(handleCloseModal('cardFundingModal'));
          dispatch(handleOpenModal('addCardModal'));
        }}
      >
        Add New Card
      </Button>
    </Box>
  );
};

const SelectedCard = () => {
  const dispatch = useDispatch();
  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          border: '1px solid #EAECF0',
          p: 2.5,
          borderRadius: '8px'
        }}
      >
        <Stack direction={'row'} alignItems={'flex-start'} justifyContent={'flex-start'} spacing={3}>
          <Box component={'img'} src={Mastercard} alt={'mastercard'} />
          <Box>
            <Box mb={1.5}>
              <Typography color='#344054' fontSize={14} fontWeight={500}>
                Mastercard ending in 1234
              </Typography>
              <Typography color='#667085' fontSize={14} fontWeight={400}>
                Expires 12/22
              </Typography>
            </Box>

            <Typography
              color='#B42318'
              fontSize={14}
              fontWeight={500}
              sx={{
                cursor: 'pointer'
              }}
            >
              Delete
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Button
        size='small'
        startIcon={<HiPlus fill={'#4CA30D'} />}
        sx={actionButtonStyle}
        onClick={() => {
          dispatch(handleCloseModal('cardFundingModal'));
          dispatch(handleOpenModal('addCardModal'));
        }}
      >
        Add New Card
      </Button>
    </Box>
  );
};

export const WalletCardFunding: React.FC = () => {
  const [hasCard, setHasCard] = React.useState(true);
  return (
    <Box>
      <Stack direction={'column'} spacing={4}>
        <StyledTypography>
          You would be charged <strong style={{ color: '#000' }}>₦3.75</strong> for this transaction
        </StyledTypography>

        {hasCard ? <SelectedCard /> : <NoCardComponent />}
      </Stack>
    </Box>
  );
};
