import React, { useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { SelectorAffixable } from '../../form';
import { HiPlus } from 'react-icons/hi';
import { Button } from '@mui/material';
import AccountAddNewPayment from './AccountAddNewPayment';
import CardInformation from './CardInformation';

interface IPaymentMethodProps {
  methods: any[];
}

const actionButtonStyle = {
  color: '#667085',
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

const validationSchema = Yup.object().shape({
  payment_method: Yup.string().required('Payment method is required')
});

const PaymentMethod = ({ methods }: IPaymentMethodProps) => {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      payment_method: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        console.log(values);
        setSubmitting(false);
      } catch (error: any) {
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { values } = formik;

  const handleOpenAddCard = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className='mb-2'>
      <h1 className='form-title'>Payment Method</h1>
      <FormikProvider value={formik}>
        <Form autoComplete='off' noValidate onSubmit={formik.handleSubmit}>
          <SelectorAffixable
            label={'Payment Option'}
            name={'payment_method'}
            placeholder={'Select Payment Method'}
            items={methods}
            showAddButton={false}
          />
          {values.payment_method === 'Automated Payment Option' && <CardInformation />}
        </Form>
        <Button size='small' startIcon={<HiPlus fill={'#667085'} />} sx={actionButtonStyle} onClick={handleOpenAddCard}>
          Add new payment method
        </Button>
        <AccountAddNewPayment open={open} close={() => setOpen(false)} />
      </FormikProvider>
    </div>
  );
};

export default PaymentMethod;
