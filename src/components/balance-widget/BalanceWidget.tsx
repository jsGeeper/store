import { Box, Stack, Typography, styled } from '@mui/material';
import React from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { priceFormatterWithDecimal } from '../../utils/formatPrice';

const StyledTitle = styled(Typography)({
  color: '#667085',
  fontWeight: 400,
  fontSize: '1.2rem'
});

const StyledAmount = styled(Typography)({
  color: '#101828',
  fontSize: 30,
  fontWeight: 600
});

export const BalanceWidget: React.FC<any> = ({
  label,
  type = 'currency',
  amount,
  analytics
}: {
  label: string;
  type: 'currency' | 'integer';
  amount: number;
  analytics?: {
    percentage: number;
    type: 'increase' | 'decrease';
    label: string;
  };
}) => {
  return (
    <Box
      padding={'24px'}
      borderRadius={'8px'}
      boxShadow={'0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)'}
      sx={{
        backgroundColor: '#fff',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          backgroundColor: '#3B7C0F',
          color: '#fff !important',

          '& .MuiTypography-root': {
            color: '#fff !important'
          }
        }
      }}
    >
      <StyledTitle>{label}</StyledTitle>
      <StyledAmount marginTop={!analytics ? 3 : 0}>
        {type === 'currency' ? priceFormatterWithDecimal(amount) : amount}
      </StyledAmount>
      {analytics && (
        <Stack flexDirection={'row'} marginTop={2}>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            {analytics.type === 'increase' ? (
              <AiOutlineArrowUp color={'#4CA30D'} size={18} />
            ) : (
              <AiOutlineArrowDown color={'#F04438'} size={18} />
            )}
            <Typography
              variant={'body2'}
              component={'span'}
              color={analytics.type === 'increase' ? '#4CA30D' : '#F04438'}
              fontWeight={500}
              fontSize={12}
            >
              {analytics.percentage}%
            </Typography>
          </Box>

          <Typography ml={1} color={'#667085'} fontWeight={400} fontSize={12}>
            {analytics.label}
          </Typography>
        </Stack>
      )}
    </Box>
  );
};
