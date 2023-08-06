import React from 'react';
import { Collapse, Box } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import CheckboxWithLabelSelector from '../../form/CheckboxWithLabelSelector';
import CardInputForm from '../../form/CardInputForm';
import { SimpleButton } from '../../button/SimpleButton';
import { useSnackbar } from '../../../hooks/useSnackbar';
import { postAddPaymentMethod } from '../../../redux/slice/update-profile/profileUpdateAction';
import { IRootReducerState } from '../../../redux/IRootReducer';

interface AccountAddNewPaymentProps {
  open: boolean;
  close: () => void;
}

const PAYMENT_OPTION = [
  {
    value: 'manual',
    title: 'Manual Payment Option',
    description: 'Every time you need to make a payment, you will have to enter your payment information.'
  },
  {
    value: 'automatic',
    title: 'Automated Payment Option',
    description: 'Enter your card information now to automate all payments.'
  }
];

const validationSchema = Yup.object().shape({
  methodStatus: Yup.string().required('Account type is required'),
  card_number: Yup.string().when('accountType', {
    is: 'automatic',
    then: Yup.string().required('Card number is required')
  }),
  card_name: Yup.string().when('accountType', {
    is: 'automatic',
    then: Yup.string().required('Name on Card is required')
  }),
  expiration_month_year: Yup.string().when('accountType', {
    is: 'automatic',
    then: Yup.string().required('Expiry Date is required')
  }),
  card_cvv: Yup.string().when('accountType', {
    is: 'automatic',
    then: Yup.string().required('CVV is required')
  })
});

const AccountAddNewPayment = ({ open, close }: AccountAddNewPaymentProps) => {
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { user } = useSelector((state: IRootReducerState) => state.auth);

  const triggerSnackbar = () => {
    showSnackbar('Payment method added successfully', '', 'success', null, null);
    close();
  };

  const formik = useFormik({
    initialValues: {
      methodStatus: '',
      card_number: '',
      card_name: '',
      expiration_month_year: '',
      card_cvv: ''
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      try {
        dispatch(
          postAddPaymentMethod({
            id: user?.id,
            ...values,
            triggerSnackbar
          })
        );
        setSubmitting(false);
      } catch (error: any) {
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { handleSubmit, values } = formik;

  return (
    <Collapse in={open}>
      <Box
        sx={{
          padding: 1,
          borderRadius: 3
        }}
      >
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <CheckboxWithLabelSelector
              formik={formik}
              name={'methodStatus'}
              dataToRender={PAYMENT_OPTION}
              widthClassName='checkbox-width'
            />
            {values.methodStatus === 'automatic' && (
              <CardInputForm
                cardNumberName='card_number'
                cardUserName='card_name'
                cardExpiryName='expiration_month_year'
                cardSecurityName='card_cvv'
              />
            )}
            <div className='row right mt-2'>
              <SimpleButton label={'Save Changes'} />
            </div>
          </Form>
        </FormikProvider>
      </Box>
    </Collapse>
  );
};

export default AccountAddNewPayment;
