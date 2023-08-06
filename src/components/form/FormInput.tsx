import React, { ChangeEvent, useState } from 'react';
import { Typography } from '@mui/material';
import { Field, useFormikContext } from 'formik';
import { RiEyeOffFill, RiEyeFill } from 'react-icons/ri';
import { BiErrorCircle } from 'react-icons/bi';
import { ErrorText } from './ErrorText';

interface IForms {
  name: string;
  hasMessage?: boolean;
  [propName: string]: any;
  label?: string;
  subLabel?: string;
  isPassword?: boolean;
  style?: React.CSSProperties;
  inputClassName?: string;
}

const FormInput: React.FC<IForms> = ({
  name,
  label,
  subLabel,
  hasMessage,
  isPassword,
  inputClassName,
  style,
  ...otherProps
}: IForms) => {
  const { touched, errors, values } = useFormikContext<IForms>();

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setIsShowPassword((show) => !show);
  };

  return (
    <div className='formInput' style={style}>
      <Typography variant='h5' fontWeight={'700'} gutterBottom style={{ color: '#344054' }}>
        {label} {subLabel && <span className='formInput__subLabel'>{subLabel}</span>}
      </Typography>
      <div className='formInput__wrapper'>
        <Field
          name={name}
          {...otherProps}
          value={values[name]}
          {...(isPassword && { type: isShowPassword ? 'text' : 'password' })}
          onBlur={otherProps.onBlur && typeof otherProps.onBlur === 'function' ? otherProps.onBlur : undefined}
          className={
            touched[name] && errors[name] ? `input-field-error ${inputClassName}` : `input-field ${inputClassName}`
          }
        />
        {hasMessage ? (
          isPassword ? (
            <span className='formInput__icon' onClick={handleShowPassword}>
              {!isShowPassword ? (
                <RiEyeFill size={20} className='eye-icon' fill={'#667085'} />
              ) : (
                <RiEyeOffFill size={19} className='formInput__icon' fill={'#667085'} />
              )}
            </span>
          ) : hasMessage && touched[name] && errors[name] ? (
            <BiErrorCircle className='formInput__icon' size={19} fill={'#B42318'} />
          ) : null
        ) : null}
      </div>
      {hasMessage && <ErrorText error={errors[name]} visible={touched[name]} />}
      {otherProps?.mutateData ? <p style={{ color: 'green' }}>{otherProps?.mutateData.message}</p> : null}
      {otherProps?.mutateError ? <p style={{ color: 'red' }}>{otherProps?.mutateError.response.data.message}</p> : null}
    </div>
  );
};

export default FormInput;
