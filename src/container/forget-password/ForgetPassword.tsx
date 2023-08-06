import React from 'react';
import { AuthScreenWrapper } from '../../components/layouts/authflow-wrapper';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FormikProvider, useFormik, Form } from 'formik';
import FormInput from '../../components/form/FormInput';
import ActionButton from '../../components/button/ActionButton';
import { IRootReducerState } from '../../redux/IRootReducer';
import { postForgotPassword } from '../../redux/slice/auth/authAction';
import { PAGES } from '../../router/pages';

const validationSchema = Yup.object().shape({
  phone_number: Yup.string()
    .matches(/^[0-9]{11}$/, 'Phone number is invalid')
    .required('Phone number is required')
});

const ForgetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { message, data, errorMessage, error } = useSelector((state: IRootReducerState) => state.auth);

  React.useEffect(() => {
    if (Object.keys(data).length > 0) {
      enqueueSnackbar(message, { variant: 'success', autoHideDuration: 3000 });
      navigate(`/password-reset-verification/pin_id=${data.pinId}/eID=${data['Phone Number']}`);
    }
    if (error && Object.keys(errorMessage).length > 0) {
      errorMessage?.email && enqueueSnackbar(errorMessage?.email[0], { variant: 'error', autoHideDuration: 3000 });
      errorMessage?.phone_number &&
        enqueueSnackbar(errorMessage?.phone_number[0], { variant: 'error', autoHideDuration: 3000 });
    }
    if (error) {
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 3000 });
    }
  }, [message, data, navigate, error]);

  const formik = useFormik({
    initialValues: {
      phone_number: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(postForgotPassword(values));
    }
  });

  const { handleSubmit } = formik;

  return (
    <main id='forgetPassword'>
      <Helmet>
        <title>Forget Password | Go-Geeper</title>
      </Helmet>
      <AuthScreenWrapper>
        <div className='authContainer'>
          <div>
            <Typography variant='h3' align={'center'} fontWeight='600' gutterBottom>
              Forgot password?{' '}
            </Typography>
            <Typography variant='h5' align={'center'} color='gray' fontWeight='400' gutterBottom letterSpacing={1}>
              A reset code would be sent to your phone number.
            </Typography>
          </div>
          <div className='formContainer'>
            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                <FormInput
                  label={'Phone Number'}
                  hasMessage={true}
                  type='tel'
                  name={'phone_number'}
                  pattern='[0-9]*'
                  placeholder={'080-1234-5678'}
                />
                <div className='forgetPassword__footer'>
                  <ActionButton label={'Send Code'} fullWidth={true} />
                  <div className='footerText'>
                    <Typography variant='h5' align={'center'} color='gray' fontWeight='400' gutterBottom>
                      Remember your Password?{' '}
                      <Link to='/login' className='link-underlined medium noLine'>
                        Sign in
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

export default ForgetPassword;
