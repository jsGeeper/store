import React from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import CheckboxWithLabelSelector from '../../form/CheckboxWithLabelSelector';
import { SimpleButton } from '../../button/SimpleButton';
import CardInputForm from '../../form/CardInputForm';
import { postUpdatePayment } from '../../../redux/slice/get-started/getStartedAction';
import { IRootReducerState } from '../../../redux/IRootReducer';

interface PAYMENT_OPTION {
  onClose: () => void;
}

const PAYMENT_OPTION = [
  {
    value: 'Manual Payment Option',
    title: 'Manual Payment Option',
    description: 'Every time you need to make a payment, you will have to enter your payment information.'
  },
  {
    value: 'Automated Payment Option',
    title: 'Automated Payment Option',
    description: 'Enter your card information now to automate all payments.'
  }
];

const validationSchema = Yup.object().shape({
  accountType: Yup.string().required('Account type is required'),
  card_number: Yup.string().when('accountType', {
    is: 'Automated Payment Option',
    then: Yup.string().required('Card number is required')
  }),
  card_name: Yup.string().when('accountType', {
    is: 'Automated Payment Option',
    then: Yup.string().required('Name on Card is required')
  }),
  card_expiry: Yup.string().when('accountType', {
    is: 'Automated Payment Option',
    then: Yup.string().required('Expiry Date is required')
  }),
  card_cvc: Yup.string().when('accountType', {
    is: 'Automated Payment Option',
    then: Yup.string().required('CVV is required')
  })
});

const PaymentMethodComponent: React.FC<PAYMENT_OPTION> = ({ onClose }: PAYMENT_OPTION) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector((state: IRootReducerState) => state.auth);

  const formik = useFormik({
    initialValues: {
      accountType: '',
      card_number: '',
      card_name: '',
      card_expiry: '',
      card_cvc: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await dispatch(
          postUpdatePayment({
            id: user.id,
            methodStatus: values.accountType,
            card_cvv: values.card_cvc,
            expiration_month_year: values.card_expiry,
            ...values
          })
        );
        setSubmitting(false);
        enqueueSnackbar('Payment Option Updated', { variant: 'success' });
        onClose();
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { handleSubmit, values } = formik;

  return (
    <React.Fragment>
      <div className='paymeentMethodCard'>
        <div className='paymentMethodCard__form-title'>
          <h2>Personal Information</h2>
          <p>Tell us more about yourself</p>
        </div>
        <div className='form__container'>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <CheckboxWithLabelSelector
                formik={formik}
                name={'accountType'}
                dataToRender={PAYMENT_OPTION}
                widthClassName='checkbox-width'
              />
              {values.accountType === 'Automated Payment Option' && (
                <CardInputForm
                  cardNumberName='card_number'
                  cardUserName='card_name'
                  cardExpiryName='card_expiry'
                  cardSecurityName='card_cvc'
                />
              )}
              <div className='footer-button'>
                <SimpleButton label='Cancel' className='btn-outline-grey mt-0 mr-2' onClick={onClose} />
                <SimpleButton label='Complete' type='submit' />
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PaymentMethodComponent;
