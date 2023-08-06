import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import OrderOverview from './OrderOverview';
import formatPrice from '../../utils/formatPrice';
import truncateText from '../../utils/truncateText';

interface IProps {
  orderInfo: any;
}

export const SingleOrderDetails = ({ orderInfo }: IProps) => {
  return (
    <Box sx={{ width: '100%' }}>
      <OrderOverview
        image={orderInfo.product.image}
        productName={truncateText(orderInfo.product.name, 20)}
        pricePerUnit={formatPrice(orderInfo.product.pricePerUnit)}
        quantity={orderInfo.product.quantity}
        price={formatPrice(orderInfo.product.price)}
      />
      <hr className='hr mt-2' />
      <Box marginBottom={10}>
        {/* ====== sub total ========= */}
        <Grid container spacing={1} marginY={3} justifyContent={'space-between'}>
          <Typography
            variant='body1'
            sx={{ fontSize: '1.8rem', fontWeight: 400, color: '#1D2939', fontFamily: 'Inter' }}
          >
            Subtotal
          </Typography>
          <Typography
            variant='body1'
            sx={{ fontSize: '1.8rem', fontWeight: 400, color: '#1D2939', fontFamily: 'Inter' }}
          >
            {formatPrice(orderInfo.product.price)}
          </Typography>
        </Grid>

        {/* ====== discount ========= */}
        <Grid container spacing={1} marginY={3} justifyContent={'space-between'}>
          <Typography
            variant='body1'
            sx={{ fontSize: '1.8rem', fontWeight: 400, color: '#1D2939', fontFamily: 'Inter' }}
          >
            Discount
          </Typography>
          <Typography
            variant='body1'
            sx={{ fontSize: '1.8rem', fontWeight: 400, color: '#1D2939', fontFamily: 'Inter' }}
          >
            {formatPrice(orderInfo.product.discount)}
          </Typography>
        </Grid>

        {/* ====== delivery ========= */}
        <Grid container spacing={1} marginY={3} justifyContent={'space-between'}>
          <Typography
            variant='body1'
            sx={{ fontSize: '1.8rem', fontWeight: 400, color: '#1D2939', fontFamily: 'Inter' }}
          >
            Delivery fee
          </Typography>
          <Typography
            variant='body1'
            sx={{ fontSize: '1.8rem', fontWeight: 400, color: '#1D2939', fontFamily: 'Inter' }}
          >
            {formatPrice(orderInfo.product.deliveryCharge)}
          </Typography>
        </Grid>

        {/* ====== total ========= */}
        <Grid container spacing={1} marginY={3} justifyContent={'space-between'}>
          <Typography
            variant='body1'
            sx={{ fontSize: '1.8rem', fontWeight: 700, color: '#101828', fontFamily: 'Inter' }}
          >
            Total
          </Typography>
          <Typography
            variant='body1'
            sx={{ fontSize: '1.8rem', fontWeight: 400, color: '#1D2939', fontFamily: 'Inter' }}
          >
            {formatPrice(orderInfo.product.total)}
          </Typography>
        </Grid>
      </Box>
    </Box>
  );
};
