import React, { useState, useEffect } from 'react';
import { Typography, Checkbox } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
import { Link, useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
/*
 * ? Local imports
 */
import { AuthScreenWrapper } from '../../components/layouts/authflow-wrapper';
import FormInput from '../../components/form/FormInput';
import ActionButton from '../../components/button/ActionButton';
import { postRegister } from '../../redux/slice/auth/authAction';
import { PAGES } from '../../router/pages';
import { IRootReducerState } from '../../redux/IRootReducer';

const registrationSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  // email: Yup.string().email('Email is invalid').required('Email is required'),
  phone_number: Yup.string()
    .matches(/^[0-9]{11}$/, 'Phone number is invalid')
    .required('Phone number is required'),
  password: Yup.string().required('Password is required.').min(8, 'Must be at least 8 characters.')
});

const RegistrationScreen = () => {
  const [checked, setChecked] = useState<'0' | '1'>('0');
  const [accessType, setAccessType] = useState<string | undefined>('');

  const { access_type } = useParams<{ access_type: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { message, errorMessage, data, error } = useSelector((state: IRootReducerState) => state.auth);

  useEffect(() => {
    if (
      access_type !== 'farmer' &&
      access_type !== 'agricExpert' &&
      access_type !== 'agriBusinessOwner' &&
      access_type !== 'other'
    ) {
      navigate(PAGES.ONBOARDING);
    }
    setAccessType(access_type);
  }, [access_type]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      enqueueSnackbar(message, { variant: 'success', autoHideDuration: 3000 });
      navigate(`/verify-account/pin_id=${data.pinId}/eID=${data.user.phone_number}`);
    }

    // if (error && errorMessage && Object.keys(errorMessage).length > 0) {
    //   errorMessage?.email &&  enqueueSnackbar(errorMessage?.email[0], {variant: 'error', autoHideDuration: 3000})
    //   errorMessage?.phone_number &&  enqueueSnackbar(errorMessage?.phone_number[0], {variant: 'error', autoHideDuration: 3000});
    // }
    if (error && message !== '') {
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 3000 });
    }
  }, [data, error, errorMessage, message]);

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      password: ''
    },
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      const newVal = {
        ...values,
        agree: checked
      };
      try {
        dispatch(postRegister({ data: newVal, accessType }));
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 3000 });
      }
    }
  });

  const { handleSubmit } = formik;

  return (
    <main id='registration'>
      <Helmet>
        <title>Registration | Go-Geeper</title>
      </Helmet>
      <AuthScreenWrapper>
        <div className='registration__title'>
          <Typography variant='h3' align={'center'} fontWeight='600' gutterBottom>
            Let’s get started
          </Typography>
          <Typography variant='h5' align={'center'} color='gray' fontWeight='400' gutterBottom>
            Create your account
          </Typography>
        </div>
        <div className='registration__form'>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <div className='registration__form__flex'>
                <FormInput
                  name={'first_name'}
                  label={'First Name'}
                  hasMessage={true}
                  style={{ flex: 1, marginRight: '1rem' }}
                  placeholder={'John'}
                />
                <FormInput
                  name={'last_name'}
                  label={'Last Name'}
                  hasMessage={true}
                  style={{ flex: 1 }}
                  placeholder={'Doe'}
                />
              </div>
              <FormInput
                name={'email'}
                label={'Email Address'}
                subLabel={'(Optional)'}
                // hasMessage={true}
                type='email'
                placeholder={'you@gogeeper.com'}
              />
              <FormInput
                label={'Phone Number'}
                hasMessage={true}
                type='tel'
                name={'phone_number'}
                pattern='[0-9]*'
                placeholder={'080-1234-5678'}
              />
              <FormInput
                hasMessage={true}
                name='password'
                label='Password'
                type='password'
                isPassword={true}
                placeholder={'Password (min of 8 characters)'}
              />
              <div className='registration__footer--flex'>
                <Checkbox
                  checked={checked === '1'}
                  onChange={() => setChecked(checked === '1' ? '0' : '1')}
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 24 },
                    '&.Mui-checked': {
                      color: '#039855'
                    },
                    marginLeft: '-1rem'
                  }}
                />
                <p className='reg--footerText'>
                  I accept that I have read and understood Go-Geeper’s{' '}
                  <Link className='link-underlined' to={'/privacy'}>
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link className='link-underlined' to={'/terms-of-use'}>
                    Terms of Use
                  </Link>
                </p>
              </div>

              <div className='reg__footer'>
                <ActionButton label={'Create Account'} fullWidth={true} />
                <div className='footerText'>
                  <Typography variant='h5' align={'center'} color='gray' fontWeight='400' gutterBottom>
                    Have an account?{' '}
                    <Link to='/login' className='link-underlined medium noLine'>
                      Sign in
                    </Link>
                  </Typography>
                </div>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </AuthScreenWrapper>
    </main>
  );
};

export default RegistrationScreen;

// data: {
//     pinId: '7cfa9fb2-eaa9-4dfd-b780-9fdbbeb81475',
//         to: '2348101404609',
//         smsStatus: 'Message Sent',
//         status: 200,
//         token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYjc3NWNlMDRhMGEzYmI5NWZiMmIxZDdmZDdmZTI4YTFiMTdkOTNhNjc3ODEzYjAxY2VmYWY4MDA4ZTgzYmM1ZDU1NjU4YTgzMDA2MjBlMmIiLCJpYXQiOjE2NTk2Mjk5MjEuMTI4OTM4LCJuYmYiOjE2NTk2Mjk5MjEuMTI4OTQsImV4cCI6MTY5MTE2NTkyMS4xMjYzNjMsInN1YiI6ImJkMzU1YTIwLTVkMTAtNGYzZS04NTk4LWRiNzkyNjVlYzcwMiIsInNjb3BlcyI6W119.m891TuNExgt-tXyGO4akAxqz1_kMqeytoVFUrklxPO4zA5AYhRFPYvbq07EIDKJ9hqnK33dRbklBEdQVuitf4G4ewRmorAkjNNE4J725fR8GkcQqSzRDEdx3_3KsuIw9g5zEWOWrj2jaKC1IgY4lYpRZmf3-mlTDVnciBBtSt-RVVJTdv-0e5aPU8Z-paN-WtoPXnKKjg5T5xgI9UtbjgkFT4JkC-l2ol1QUe4XZwoWuAfk5DDPZnBQhcT5KuuydIolpaTbwTBxqVDDGaRI39rc6Y13OadPhxHExnQWz_313yFEJyxE_letZdT8KCEN42ADX0KXphwvAi69YFjlEPO4SNH8RA_z8WhWu14LtuwznHx9m23d3MvTbrV2ohGSDawWlsx4vY8z8v9nADShZ8lRV6-b_9PAOOHlH7Hz0wTvzvV5z7MQ82IzCqkP6KCkxeaII7fwFCN9IoXhL17QGeT74v128TsZT7DWO0reUDCl5VyIP2uX6zDOmlpF8X5AD62tBH4RJemhOyLndYkOxJwGDvsRJOvASyVNQtXtC9r7FN05ddXrCsnNt0sUL072HqkxzitE4A_R3pAgUZnnEgATbIBkGMHOa179Jmc3Fymd7_kWfUL0h6LgpRtGFH2D-hlngDtL3rSPGyB2lLGdwEbX-gxGcYXlRAMge22-l6Ps',
//         user: {
//         email: 'peterimoh20@gmail.com',
//             phone_number: '08101404609',
//             first_name: 'Peter',
//             last_name: 'victor',
//             role: 'Farmer',
//             agree: false,
//             code: 819305,
//             expiry: '2022-08-05T16:18:40.422131Z',
//             id: 'bd355a20-5d10-4f3e-8598-db79265ec702',
//             updated_at: '2022-08-04T16:18:40.000000Z',
//             created_at: '2022-08-04T16:18:40.000000Z'
//     }
// }
// }
