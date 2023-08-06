import React from 'react';
import { Typography } from '@mui/material';
import { Field, useFormikContext } from 'formik';
import NumberFormat from 'react-number-format';
import { ErrorText } from './ErrorText';

interface IForms {
  hasMessage?: boolean;
  name: string;
  label: string;
  indicator: string;
  [propName: string]: any;
}

const FormInputWithIndicator = ({ name, label, hasMessage, indicator }: IForms) => {
  const { touched, errors, values, setFieldValue } = useFormikContext<IForms>();
  return (
    <>
      <div className='formWithIndicator'>
        <Typography variant='h5' fontWeight={'700'} gutterBottom style={{ color: '#344054' }}>
          {label}
        </Typography>
        <div className='formWithIndicator__wrapper'>
          <NumberFormat
            customInput={Field}
            name={name}
            value={values[name]}
            decimalScale={2}
            variant='outlined'
            isNumericString={true}
            thousandSeparator={true}
            onValueChange={(e) => {
              setFieldValue(name, e.value);
            }}
            prefix={'₦'}
            className='formWithIndicator__input'
          />
          <button className='formWithIndicator__indicator' disabled>
            {indicator.length > 0 ? `per ${indicator}` : 'Per Unit'}
          </button>
        </div>
      </div>
      {hasMessage && <ErrorText error={errors[name]} visible={touched[name]} />}
    </>
  );
};

export default FormInputWithIndicator;
