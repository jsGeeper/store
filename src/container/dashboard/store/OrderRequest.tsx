import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Button } from '@mui/material';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { AppWrapper } from '../../../components/layouts/app-wrapper';
import { CustomerDetail, FirstLevelComponent, SingleOrderDetails } from '../../../components/single-order-view';
import { BadgeHandler } from '../../../components/badge-handler';

const btnStyle = {
  padding: '1rem 1.6rem',
  boxShadow: `0px 1px 2px rgba(16, 24, 40, 0.05)`,
  textTransform: 'capitalize',
  fontSize: '1.4rem',
  fontWeight: 500,
  fontFamily: 'Inter',
  borderRadius: '0.8rem'
};

const errorStyle = {
  ':hover': {
    borderColor: '#FDA29B',
    outline: 'none'
  },
  borderColor: '#FDA29B',
  color: '#B42318'
};

const OrderRequest: React.FC = () => {
  const { orderId } = useParams();

  const orderDetails = {
    orderId: orderId,
    status: 'Placed',
    customerName: 'John Doe',
    customerImage:
      'https://images.unsplash.com/photo-1662952208192-228dc2ffd410?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    customerAddress: '123, Main Street, New York, NY 10001',
    customerEmail: 'user@outlook.com',
    createdAt: new Date('2022-09-01'),
    product: {
      name: 'Product Name Product Name',
      quantity: '3 kilograms',
      image:
        'https://images.unsplash.com/photo-1661961112835-ca6f5811d2af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      price: 30012445,
      pricePerUnit: 100,
      total: 900,
      subTotal: 900,
      discount: 0,
      deliveryCharge: 0
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Order Request #{orderId} | Go-Geeper</title>
      </Helmet>
      <main id='orderRequest'>
        <AppWrapper title={'Store / Order request'}>
          <div className='container'>
            <FirstLevelComponent
              orderID={orderDetails.orderId}
              status={<BadgeHandler status={orderDetails.status} />}
              createdAt={moment(orderDetails.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Button
                  variant='contained'
                  color='success'
                  size='large'
                  sx={{ ...btnStyle, mr: 2, backgroundColor: '#4CA30D', color: '#FFFFFF' }}
                >
                  Accept
                </Button>
                <Button variant='outlined' color='info' size='large' sx={{ ...btnStyle, ...errorStyle }}>
                  Reject
                </Button>
              </Box>
            </FirstLevelComponent>
            <br />
            <SingleOrderDetails orderInfo={orderDetails} />
            <CustomerDetail
              customerImage={orderDetails.customerImage}
              customerName={orderDetails.customerName}
              email={orderDetails.customerEmail}
            />
          </div>
        </AppWrapper>
      </main>
    </React.Fragment>
  );
};

export default OrderRequest;
