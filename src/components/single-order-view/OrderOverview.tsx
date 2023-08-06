import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

interface IProps {
  image: string;
  productName: string;
  pricePerUnit: number | string;
  quantity: string;
  price: number | string;
}

const OrderOverview: React.FC<IProps> = ({ image, price, pricePerUnit, productName, quantity }: IProps) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2} alignItems={'center'}>
        <Grid item xs>
          <Grid container spacing={2}>
            <Grid item>
              <Box
                component={'img'}
                src={image}
                alt={productName}
                sx={{
                  height: 100,
                  width: 100,
                  maxHeight: { xs: 100, sm: 100, md: 100, lg: 100, xl: 100 },
                  maxWidth: { xs: 100, sm: 100, md: 100, lg: 100, xl: 100 }
                }}
              />
            </Grid>
            <Grid item>
              <Box mt={1}>
                <Typography
                  variant='h4'
                  sx={{ fontSize: '2rem', fontWeight: 600, color: '#101828', fontFamily: 'Inter' }}
                  gutterBottom
                >
                  {productName}
                </Typography>
                <Typography
                  variant='body1'
                  sx={{ fontSize: '1.8rem', fontWeight: 400, color: '#1D2939', fontFamily: 'Inter' }}
                >
                  {pricePerUnit}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Typography
            variant='body1'
            align={'center'}
            sx={{ fontSize: '1.8rem', fontWeight: 400, color: '#1D2939', fontFamily: 'Inter' }}
          >
            {quantity}
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography
            align={'right'}
            variant='body1'
            sx={{ fontSize: '2rem', fontWeight: 600, color: '#101828', fontFamily: 'Inter' }}
          >
            {price}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderOverview;
