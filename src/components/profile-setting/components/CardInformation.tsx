import React from 'react';
import { Box, Paper, Typography, Stack, Button } from '@mui/material';
import MASTERCARD from '../../../assets/svg/ic_mastercard.svg';
import VISA from '../../../assets/svg/ic_visa.svg';
import VERVE from '../../../assets/svg/verve.svg';
import CARD from '../../../assets/svg/card.svg';
import { formatCreditCardNumber, formatExpirationDate, getCardType } from '../../../utils/CardUtils';

const CardInformation = () => {
  const [cardType, setCardType] = React.useState<string>(getCardType('4187427415564246'));

  const setIcon = (cardType: string) => {
    switch (cardType) {
      case 'visa':
        return VISA;
      case 'mastercard':
        return MASTERCARD;
      case 'verve':
        return VERVE;
      case 'maestro':
        return VERVE;
      default:
        return CARD;
    }
  };

  return (
    <Box
      sx={{
        marginTop: 4
      }}
    >
      <Paper
        sx={{
          p: 2,
          width: 1,
          borderRadius: '0.8rem',
          border: '1px solid #EAECF0'
        }}
        elevation={0}
      >
        <Stack direction='row' spacing={2}>
          <Box component='img' alignSelf={'flex-start'} src={setIcon(cardType)} sx={{ mb: 1 }} />
          <Box>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 500
              }}
            >
              {cardType.charAt(0).toUpperCase() + cardType.slice(1)} ending in{' '}
              {formatCreditCardNumber('4187427415564246').slice(-4)}
            </Typography>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 400,
                color: '#667085'
              }}
              gutterBottom
            >
              Expiry {formatExpirationDate('12/22')}
            </Typography>

            <Button
              variant='text'
              sx={{
                color: '#B42318',
                fontWeight: 500,
                fontFamily: 'Inter',
                fontSize: '1.4rem',
                textTransform: 'none'
              }}
            >
              Delete
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default CardInformation;
