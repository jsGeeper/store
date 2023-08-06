import React from 'react';
import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { AuthScreenWrapper } from '../../components/layouts/authflow-wrapper';
import FormInput from '../../components/form/FormInput';
import ActionButton from '../../components/button/ActionButton';
import { PAGES, PATH_DASHBOARD, PATH_MAIN } from '../../router/pages';
import { IRootReducerState } from '../../redux/IRootReducer';
import { postLogin } from '../../redux/slice/auth/authAction';
import { ErrorText } from '../../components/form/ErrorText';

const loginSchema = Yup.object().shape({
  phone_number: Yup.string()
    .matches(/^[0-9]{11}$/, 'Phone number is invalid')
    .required('Phone number is required'),
  password: Yup.string().required('Password is required.').min(8, 'Must be at least 8 characters.')
});

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { message, errorMessage, isAuthenticated, error } = useSelector((state: IRootReducerState) => state.auth);

  const formik = useFormik({
    initialValues: {
      phone_number: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      dispatch(postLogin(values));
    }
  });

  React.useEffect(() => {
    if (error) {
      if (Object.keys(errorMessage).length > 0 && errorMessage.otp_verified === false) {
        window.location.href = `/verify-account/pin_id=${errorMessage.data.pinId}/eID=${errorMessage.data.phone_number}`;
      }
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 3000 });
    }
    if (isAuthenticated) {
      enqueueSnackbar(message, { variant: 'success', autoHideDuration: 3000 });
      navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.GET_STARTED}`);
    }
  }, [error, enqueueSnackbar, message, errorMessage]);

  const { handleSubmit } = formik;

  return (
    <main id='login'>
      <Helmet>
        <title>Sign In | Go-Geeper</title>
      </Helmet>
      <AuthScreenWrapper>
        <div className='authContainer' style={{ width: '50rem' }}>
          <div className='login__title'>
            <Typography variant='h3' align={'center'} fontWeight='600' gutterBottom>
              Welcome back{' '}
            </Typography>
            <Typography variant='h5' align={'center'} color='gray' fontWeight='400' gutterBottom letterSpacing={2}>
              Please sign in to your account
            </Typography>
          </div>

          <div className='login__form'>
            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                <div>
                  <FormInput
                    label={'Phone Number'}
                    hasMessage={true}
                    type='tel'
                    name={'phone_number'}
                    pattern='[0-9]*'
                    placeholder={'080-1234-5678'}
                  />
                  {errorMessage &&
                    errorMessage?.phone_number &&
                    errorMessage?.phone_number.length > 0 &&
                    errorMessage?.phone_number.map((error: string, index: number) => (
                      <ErrorText error={error} visible={error} key={index} />
                    ))}
                </div>

                <div>
                  <FormInput
                    hasMessage={true}
                    name='password'
                    label='Password'
                    type='password'
                    isPassword={true}
                    placeholder={'Password (min of 8 characters)'}
                  />
                  {errorMessage &&
                    errorMessage?.password &&
                    errorMessage?.password.length > 0 &&
                    errorMessage?.password.map((error: string, index: number) => (
                      <ErrorText error={error} visible={error} key={index} />
                    ))}
                </div>
                <Link to='/forgot-password' className='text--md'>
                  Forgot your password?
                </Link>
                <div className='login__footer'>
                  <ActionButton label={'Sign in'} fullWidth={true} />
                  <div className='footerText'>
                    <Typography variant='h5' align={'center'} color='gray' fontWeight='400' gutterBottom>
                      New here?{' '}
                      <Link to={PAGES.ONBOARDING} className='link-underlined medium'>
                        Create an account
                      </Link>
                    </Typography>
                  </div>
                </div>
              </Form>
            </FormikProvider>
          </div>
        </div>
      </AuthScreenWrapper>
    </main>
  );
};

export default LoginScreen;
