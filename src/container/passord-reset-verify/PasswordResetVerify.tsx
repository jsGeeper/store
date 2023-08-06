import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Typography } from '@mui/material';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useFormik, FormikProvider, Form } from 'formik';
/*
 * ? Local Imports
 */
import { AuthScreenWrapper } from '../../components/layouts/authflow-wrapper';
import ActionButton from '../../components/button/ActionButton';
import { ErrorText } from '../../components/form/ErrorText';
import Countdown from '../../utils/countdown';
import { postForgotPasswordVerifyOTP, postResendOtp } from '../../redux/slice/auth/authAction';
import { IRootReducerState } from '../../redux/IRootReducer';
import { PAGES } from '../../router/pages';

const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^[0-9]{6}$/, 'OTP is invalid')
    .required('Kindly input the correct code.')
});

const PasswordResetVerify: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { pin_id, eID } = useParams<{ pin_id: string; eID: string }>();
  const { message, errorMessage, verified, data, error } = useSelector((state: IRootReducerState) => state.auth);

  const [timer, setTimer] = React.useState<string>('');
  const [isCountdownRunning, setIsCountdownRunning] = React.useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      otp: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(postForgotPasswordVerifyOTP({ pin_id, otp: values.otp, phone_number: eID }));
    }
  });

  useEffect(() => {
    message && enqueueSnackbar(message, { variant: 'success', autoHideDuration: 3000 });
  }, [data, error, message]);

  useEffect(() => {
    if (verified) {
      navigate(`/password-reset/eID=${eID}`);
    }
  }, [verified]);

  const { handleSubmit, setFieldValue, values, errors } = formik;
  const otpError = !!(errors && errors?.otp && errors?.otp?.length > 0);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const inputStyle = {
    width: '6.4rem',
    height: '6.4rem',
    border: '2px solid #DFF3CEFF',
    borderRadius: '.8rem',
    fontSize: '3.5rem',
    color: '#039855',
    fontWeight: '600',
    margin: '0 .5rem',
    flex: '1 1 auto'
  };

  const focusStyle = {
    border: '.2rem solid #039855'
  };

  const errorStyle = {
    border: '.2rem solid #FF0000'
  };

  React.useEffect(() => {
    setTimeout(() => {
      // Countdown(3, 22, setTimer);
      setIsCountdownRunning(true);
    }, 5000);
  }, []);

  const handleResend = () => {
    if (timer === '') {
      dispatch(postResendOtp({ phone_number: eID }));
      setIsCountdownRunning(false);
      setTimeout(() => {
        // Countdown(3, 22, setTimer);
        setIsCountdownRunning(true);
      }, 5000);
    }
  };

  return (
    <main id='passwordVerify'>
      <Helmet>
        <title>Checkpoint | Go-Geeper</title>
      </Helmet>
      <AuthScreenWrapper>
        <div className='authContainer'>
          <div>
            <Typography variant='h3' align={'center'} fontWeight='600' gutterBottom>
              Password reset code
            </Typography>
            <Typography variant='h5' align={'center'} color='gray' fontWeight='400' gutterBottom letterSpacing={1}>
              Enter the 6-digit code sent to your phone number
            </Typography>
          </div>
          <div className='formContainer'>
            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                <div>
                  <OtpInput
                    value={values.otp}
                    // placeholder='000000'
                    onChange={(otp: string) => setFieldValue('otp', otp)}
                    numInputs={6}
                    hasErrored={otpError}
                    shouldAutoFocus={true}
                    containerStyle={containerStyle}
                    inputStyle={inputStyle}
                    focusStyle={focusStyle}
                    errorStyle={errorStyle}
                    separator={<span>-</span>}
                  />
                  <ErrorText error={errors.otp} visible={otpError} />
                </div>

                {isCountdownRunning && (
                  <div className='resendCode'>
                    <button className='resendCodeButton' onClick={() => handleResend()} type={'button'}>
                      Resend code <em className='timer'>{timer}</em>
                    </button>
                  </div>
                )}

                <div className='passwordVerify__footer'>
                  <ActionButton label={'verify phone number'} fullWidth={false} />
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

export default PasswordResetVerify;
