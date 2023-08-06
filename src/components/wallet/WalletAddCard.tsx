import { Box, Stack, Typography, styled } from '@mui/material';
import React from 'react';
import * as Yup from 'yup';
import { FormikProvider, Form, useFormik, Field } from 'formik';
import { formatCVC, formatCreditCardNumber, formatExpirationDate, getCardType } from '../../utils/CardUtils';
import FormInput from '../form/FormInput';
import MASTERCARD from '../../assets/svg/ic_mastercard.svg';
import VISA from '../../assets/svg/ic_visa.svg';
import VERVE from '../../assets/svg/verve.svg';
import CARD from '../../assets/svg/card.svg';
import { SimpleButton } from '../button/SimpleButton';
import { useDispatch } from 'react-redux';
import { handleCloseModal, handleOpenModal } from '../../redux/slice/wallet/wallet.slice';

const validationSchema = Yup.object().shape({
  card_number: Yup.string().required('Card number is required'),
  card_expiry: Yup.string().required('Expiry Date is required'),
  card_cvc: Yup.string().required('CVV is required')
});

const StyledTypography = styled(Typography)({
  color: '#667085',
  fontWeight: 400,
  fontSize: 14
});

export const WalletAddCard: React.FC = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      card_number: '',
      card_expiry: '',
      card_cvc: ''
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(handleCloseModal('addCardModal'));
      dispatch(handleOpenModal('cardFundingModal'));
    }
  });

  const { values, setFieldValue, errors, touched } = formik;

  const [cardType, setCardType] = React.useState<string>(getCardType(values['card_number']));

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
    <Box>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <Stack direction={'column'} spacing={4} marginBottom={3}>
            <StyledTypography>Enter your card details to fund.</StyledTypography>
            <Box id='paymentForm'>
              <Box className='cardNumber' mb={2}>
                <Typography variant='h5' fontWeight={'700'} style={{ color: '#344054' }} gutterBottom>
                  Card number
                </Typography>
                <div
                  className={
                    touched['card_number'] && errors['card_number']
                      ? `input-field-error inputWithIcon`
                      : `input-field  inputWithIcon`
                  }
                >
                  {cardType && cardType.length > 0 && <img src={setIcon(cardType)} alt='card' className='img-fluid' />}
                  <Field
                    name={'card_number'}
                    value={values['card_number']}
                    type='text'
                    component='input'
                    pattern='[\d| ]{16,22}'
                    placeholder='0000 0000 0000 0000'
                    className='card-number-input'
                    onChange={(e: any) => {
                      e.target.value = formatCreditCardNumber(e.target.value);
                      setFieldValue('card_number', e.target.value);
                      setCardType(getCardType(e.target.value));
                    }}
                    style={{ flex: '1', marginTop: '0', height: '100%' }}
                  />
                </div>
              </Box>

              <div className='flex-fields'>
                <FormInput
                  label='Expiry date'
                  name={'card_expiry'}
                  hasMessage
                  value={values['card_expiry']}
                  type='text'
                  component='input'
                  pattern='\d\d/\d\d'
                  placeholder='MM/YY'
                  style={{ flex: 1, marginRight: '1rem' }}
                  onChange={(e: any) => {
                    e.target.value = formatExpirationDate(e.target.value);
                    setFieldValue('card_expiry', e.target.value);
                  }}
                />

                <FormInput
                  label='CVV'
                  name={'card_cvc'}
                  hasMessage
                  value={values['card_cvc']}
                  type='text'
                  component='input'
                  pattern='\d{3,4}'
                  placeholder='***'
                  style={{ flex: 1 }}
                  onChange={(e: any) => {
                    e.target.value = formatCVC(e.target.value);
                    setFieldValue('card_cvc', e.target.value);
                  }}
                />
              </div>
            </Box>
          </Stack>

          <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'}>
            <SimpleButton label='Add Card' padding={'.55rem 1.4rem'} type='submit' />
          </Stack>
        </Form>
      </FormikProvider>
    </Box>
  );
};
