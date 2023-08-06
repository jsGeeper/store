import React from 'react';
import { useFormikContext, Field } from 'formik';
import { formatCVC, getCardType, formatCreditCardNumber, formatExpirationDate } from '../../utils/CardUtils';
import FormInput from './FormInput';
import MASTERCARD from '../../assets/svg/ic_mastercard.svg';
import VISA from '../../assets/svg/ic_visa.svg';
import VERVE from '../../assets/svg/verve.svg';
import CARD from '../../assets/svg/card.svg';
import { Typography } from '@mui/material';

interface ICardDetails {
  cardNumberName: string;
  cardUserName: string;
  cardExpiryName: string;
  cardSecurityName: string;
  [propName: string]: any;
}

const CardInputForm: React.FC<ICardDetails> = ({
  cardNumberName,
  cardUserName,
  cardExpiryName,
  cardSecurityName
}: ICardDetails) => {
  const { values, setFieldValue, touched, errors } = useFormikContext<ICardDetails>();

  const [cardType, setCardType] = React.useState<string>(getCardType(values[cardNumberName]));

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
    <div id='paymentForm'>
      <div className='cardNumber'>
        <Typography variant='h5' fontWeight={'700'} style={{ color: '#344054' }} gutterBottom>
          Card number
        </Typography>
        <div
          className={
            touched[cardNumberName] && errors[cardNumberName]
              ? `input-field-error inputWithIcon`
              : `input-field  inputWithIcon`
          }
        >
          {cardType && cardType.length > 0 && <img src={setIcon(cardType)} alt='card' className='img-fluid' />}
          <Field
            name={cardNumberName}
            value={values[cardNumberName]}
            type='text'
            component='input'
            pattern='[\d| ]{16,22}'
            placeholder='0000 0000 0000 0000'
            className='card-number-input'
            onChange={(e: any) => {
              e.target.value = formatCreditCardNumber(e.target.value);
              setFieldValue(cardNumberName, e.target.value);
              setCardType(getCardType(e.target.value));
            }}
            style={{ flex: '1', marginTop: '0', height: '100%' }}
          />
        </div>
      </div>

      <div className='flex-fields'>
        <FormInput
          label='Expiry date'
          name={cardExpiryName}
          hasMessage={true}
          value={values[cardExpiryName]}
          type='text'
          component='input'
          pattern='\d\d/\d\d'
          placeholder='MM/YY'
          style={{ flex: 1, marginRight: '1rem' }}
          onChange={(e: any) => {
            e.target.value = formatExpirationDate(e.target.value);
            setFieldValue(cardExpiryName, e.target.value);
          }}
        />

        <FormInput
          label='CVV'
          name={cardSecurityName}
          hasMessage={true}
          value={values[cardSecurityName]}
          type='text'
          component='input'
          pattern='\d{3,4}'
          placeholder='***'
          style={{ flex: 1 }}
          onChange={(e: any) => {
            e.target.value = formatCVC(e.target.value);
            setFieldValue(cardSecurityName, e.target.value);
          }}
        />
      </div>
      <FormInput
        name={cardUserName}
        label='Name on the card'
        hasMessage={true}
        placeholder='Enter card holder’s full name'
        type='text'
      />
    </div>
  );
};

export default CardInputForm;
