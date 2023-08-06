import React from 'react';
import { Box, Grid, Button, Typography, Avatar } from '@mui/material';

interface CustomerDetailProps {
  customerName: string;
  customerImage: string;
  email: string;
}

const btnStyle = {
  padding: '1rem 1.6rem',
  boxShadow: `0px 1px 2px rgba(16, 24, 40, 0.05)`,
  textTransform: 'capitalize',
  fontSize: '1.4rem',
  fontWeight: 500,
  fontFamily: 'Inter',
  borderRadius: '0.8rem',
  color: '#344054',
  backgroundColor: '#FFFFFF',
  border: '1px solid #D0D5DD',
  ':hover': {
    backgroundColor: '#F5F7FA'
  }
};

export const CustomerDetail = (props: CustomerDetailProps) => {
  return (
    <React.Fragment>
      <Typography
        variant='h4'
        gutterBottom
        sx={{ fontWeight: 600, fontSize: '1.8rem', color: '#1D2939', fontFamily: 'Inter' }}
      >
        Customer details
      </Typography>
      <Grid container spacing={2} marginY={1} p={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>
              <Avatar
                alt={props.customerName}
                src={props.customerImage}
                sx={{ width: '6rem', height: '6rem', mr: 2 }}
              />
            </Box>
            <Box>
              <Typography
                variant='h5'
                sx={{ fontWeight: 600, fontSize: '1.6rem', color: '#1D2939', fontFamily: 'Inter' }}
              >
                {props.customerName}
              </Typography>
              <Typography
                variant='h5'
                sx={{ fontWeight: 400, fontSize: '1.4rem', color: '#667085', fontFamily: 'Inter' }}
              >
                {props.email}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button variant='contained' sx={btnStyle}>
            Message customer
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
