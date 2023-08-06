import React from 'react';
import { Helmet } from 'react-helmet';
import { Typography } from '@mui/material';
import { FormikProvider, useFormik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import FormInput from '../../components/form/FormInput';
import { AuthScreenWrapper } from '../../components/layouts/authflow-wrapper';
import ActionButton from '../../components/button/ActionButton';
import { postChangePassword } from '../../redux/slice/auth/authAction';
import { PAGES } from '../../router/pages';

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Password is required.').min(8, 'Must be at least 8 characters.'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const PasswordReset: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { eID } = useParams();

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await dispatch(
          postChangePassword({
            password: values.password,
            password_confirmation: values.confirmPassword,
            phone_number: eID
          })
        );
        setSubmitting(false);
        enqueueSnackbar('Your Password has changed successully', { variant: 'success' });
        window.location.href = PAGES.LOGIN;
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { handleSubmit } = formik;

  return (
    <main id='resetPassword'>
      <Helmet>
        <title>Password Reset | Go-Geeper</title>
      </Helmet>
      <AuthScreenWrapper>
        <div className='authContainer'>
          <div>
            <Typography variant='h3' align={'center'} fontWeight='600' gutterBottom>
              Set a new password{' '}
            </Typography>
            <Typography variant='h5' align={'center'} color='gray' fontWeight='400' gutterBottom letterSpacing={1}>
              Enter a new password for your account
            </Typography>
          </div>

          <div className='formContainer'>
            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                <FormInput
                  hasMessage={true}
                  name='password'
                  label='Password'
                  type='password'
                  isPassword={true}
                  placeholder={'Password (min of 8 characters)'}
                />
                <FormInput
                  hasMessage={true}
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  isPassword={true}
                  placeholder={'Password'}
                />
                <div className='passwordReset__footer'>
                  <ActionButton label={'Reset'} fullWidth />
                  <div className='footerText'>
                    <Typography variant='h5' align={'center'} color='gray' fontWeight='400' gutterBottom>
                      Remember your Password?{' '}
                      <Link to='/login' className='link-underlined medium noLine'>
                        Login
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

export default PasswordReset;
