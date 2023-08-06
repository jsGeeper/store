import React from 'react';
import OtpInput from 'react-otp-input';
import { FormikProvider, Form, useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, styled, Stack } from '@mui/material';
import { OutlinedButton } from '../button/OutlinedButton';
import { SimpleButton } from '../button/SimpleButton';
import { ErrorText } from '../form/ErrorText';
import { IRootReducerState } from '../../redux/IRootReducer';
import formatPrice from '../../utils/formatPrice';
import { useSnackbar } from '../../hooks/useSnackbar';
import { getWalletBalanceAmount } from '../../redux/slice/wallet/wallet.slice';

const validationSchema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^[0-9]{6}$/, 'OTP is invalid')
    .required('Kindly input the correct code.')
});

const StyledTypography = styled(Typography)({
  color: '#667085',
  fontWeight: 400,
  fontSize: 14
});

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

export const WithdrawalOTP = ({ onClose }: any) => {
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();

  const { amount, error } = useSelector((state: IRootReducerState) => state.wallet);
  const { user } = useSelector((state: IRootReducerState) => state.auth);

  const formik = useFormik({
    initialValues: {
      otp: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      onClose();
      dispatch(getWalletBalanceAmount({ user_id: user?.id }));
      showSnackbar('Funds Withdrawn Successfully!', '', 'success', null, null);
    }
  });

  const { handleSubmit, setFieldValue, values, errors } = formik;
  const otpError = !!(errors && errors?.otp && errors?.otp?.length > 0);

  return (
    <Box>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <Stack direction={'column'} spacing={4} marginBottom={5}>
            <StyledTypography>Enter the verification code sent to {user?.email || user?.phone_number}</StyledTypography>
            {error?.message && (
              <Typography color={'#ff0000'} my={1} fontSize={15} textAlign={'center'}>
                {error?.message}
              </Typography>
            )}
            <Box>
              <OtpInput
                value={values.otp}
                placeholder='0000'
                onChange={(otp: string) => setFieldValue('otp', otp)}
                numInputs={6}
                hasErrored={otpError}
                shouldAutoFocus={true}
                containerStyle={containerStyle}
                inputStyle={inputStyle}
                focusStyle={focusStyle}
                errorStyle={errorStyle}
              />
              <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={0.6}>
                <ErrorText error={errors.otp} visible={otpError} />
              </Box>
            </Box>

            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Typography
                variant={'body2'}
                color={'#3B7C0F'}
                fontWeight={500}
                fontSize={14}
                bgcolor={'#F3FEE7'}
                borderRadius={'16px'}
                p={'2px 10px'}
              >
                You are withdrawing {formatPrice(amount)}
              </Typography>
            </Box>
          </Stack>

          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <OutlinedButton label='Back' padding={'.55rem 1.4rem'} onClick={onClose} />
            <SimpleButton label='Withdraw' padding={'.55rem 1.4rem'} type='submit' />
          </Stack>
        </Form>
      </FormikProvider>
    </Box>
  );
};
