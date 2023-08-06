import React from 'react';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import truncateText from '../../../utils/truncateText';
import { AppWrapper } from '../../../components/layouts/app-wrapper';
import { CustomerDetail, FirstLevelComponent, SingleOrderDetails } from '../../../components/single-order-view';
import { BadgeHandler } from '../../../components/badge-handler';
import { SimpleButton } from '../../../components/button/SimpleButton';
import DisputeForm from './DisputeForm';

const disputeBtn = {
  backgroundColor: '#fff',
  border: `1px solid #D0D5DD`,
  boxShadow: `0px 1px 2px rgba(16, 24, 40, 0.05)`,
  borderRadius: `8px`,
  color: '#344054'
};

const TriggerButton = ({ status }: { status: string }) => {
  return (
    <>
      {status.toLowerCase() === 'placed' && <SimpleButton label='Change to Processing' style={{ marginRight: 10 }} />}
      {status.toLowerCase() === 'shipped' && <SimpleButton label='Change to Delivered' style={{ marginRight: 10 }} />}
      {status.toLowerCase() === 'processing' && <SimpleButton label='Change to Shipped' style={{ marginRight: 10 }} />}
      {status.toLowerCase() === 'delivered' && null}
    </>
  );
};

const SingleOrderView = () => {
  const { orderID, productID } = useParams<{ orderID: string; productID: string }>();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const orderDetails = {
    orderId: orderID,
    status: 'Processing',
    customerName: 'ekene dili chukwu',
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
        <title>Order {orderID} | Go-Geeper</title>
      </Helmet>
      <main id='orderView'>
        <AppWrapper title={`Order / ${truncateText(productID, 20)} / #${orderID}`}>
          <div className='container'>
            <FirstLevelComponent
              orderID={orderDetails.orderId}
              status={<BadgeHandler status={orderDetails.status} />}
              createdAt={moment(orderDetails.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            >
              <TriggerButton status={orderDetails.status} />
              <SimpleButton label={'Raise Dispute'} style={disputeBtn} onClick={handleClick} />
              <DisputeForm onClose={handleClose} id={id} open={open} anchorEl={anchorEl} />
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

export default SingleOrderView;
