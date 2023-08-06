import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from 'react-otp-input';
import { useFormik, FormikProvider, Form } from 'formik';
import { useSnackbar } from 'notistack';
/*
    * ? Local imports

 */
import { AuthScreenWrapper } from '../../components/layouts/authflow-wrapper';
import { ErrorText } from '../../components/form/ErrorText';
import ActionButton from '../../components/button/ActionButton';
import Countdown from '../../utils/countdown';
import { IRootReducerState } from '../../redux/IRootReducer';
import { postResendOtp, postVerifyOTP } from '../../redux/slice/auth/authAction';
import { PATH_DASHBOARD, PATH_MAIN } from '../../router/pages';

const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^[0-9]{6}$/, 'OTP is invalid')
    .required('Kindly input the correct code.')
});

const VerifyAccount = () => {
  const [timer, setTimer] = React.useState<string>('');
  const [isCountdownRunning, setIsCountdownRunning] = React.useState<boolean>(false);

  const { pin_id, eID } = useParams<{ pin_id: string; eID: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { message, errorMessage, verified, isAuthenticated, data, error } = useSelector(
    (state: IRootReducerState) => state.auth
  );

  const formik = useFormik({
    initialValues: {
      otp: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      dispatch(postVerifyOTP({ pin_id, otp: values.otp, phone_number: eID }));
    }
  });

  useEffect(() => {
    message && enqueueSnackbar(message, { variant: 'success', autoHideDuration: 3000 });
  }, [data, error, message]);

  useEffect(() => {
    if (verified && isAuthenticated) {
      window.location.href = `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.GET_STARTED}`;
    }
  }, [verified, isAuthenticated, navigate]);

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
      Countdown(3, 22, setTimer);
      setIsCountdownRunning(true);
    }, 5000);
  }, []);

  const handleResend = async () => {
    if (timer === '') {
      dispatch(postResendOtp({ phone_number: eID }));
      setIsCountdownRunning(false);
      setTimeout(() => {
        Countdown(3, 22, setTimer);
        setIsCountdownRunning(true);
      }, 5000);
    }
  };

  return (
    <main id='verifyAccount'>
      <Helmet>
        <title>Checkpoint | Go-Geeper</title>
      </Helmet>
      <AuthScreenWrapper>
        <div className='authContainer'>
          <div>
            <Typography variant='h3' align={'center'} fontWeight='600' gutterBottom>
              Phone number verification
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
                  <ErrorText error={errorMessage.message} visible={errorMessage.status} />
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
                </div>
              </Form>
            </FormikProvider>
          </div>
        </div>
      </AuthScreenWrapper>
    </main>
  );
};

export default VerifyAccount;
