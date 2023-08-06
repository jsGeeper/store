import { Box, Typography, styled, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { FormikProvider, Form, useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import FormInput from '../form/FormInput';
import { OutlinedButton } from '../button/OutlinedButton';
import { SimpleButton } from '../button/SimpleButton';
import { WithdrawalModalContainer } from '../modals/WithdrawalModalContainer';
import { WithdrawalOTP } from './WithdrawalOTP';
import { IRootReducerState } from '../../redux/IRootReducer';
import formatPrice from '../../utils/formatPrice';
import { handleAddAmount, submitWalletAmount } from '../../redux/slice/wallet/wallet.slice';

const validationSchema = yup.object({
  amount: yup.number().required('Amount is required').min(0, 'Amount must be greater than wallet balance')
});

const StyledTypography = styled(Typography)({
  color: '#667085',
  fontWeight: 400,
  fontSize: 14
});

export const WithdrawalFormState: React.FC<any> = ({ onClose }: any) => {
  const [openOtpModal, setOpenOtpModal] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const dispatch = useDispatch();

  const { walletBalance } = useSelector((state: IRootReducerState) => state.wallet);
  const { user } = useSelector((state: IRootReducerState) => state.auth);

  const handleOpenOtpModal = () => {
    setOpenOtpModal(true);
  };

  const formik = useFormik({
    initialValues: {
      amount: ''
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(handleAddAmount(parseInt(values.amount)));
      dispatch(submitWalletAmount(parseInt(values.amount), user.id));
      handleOpenOtpModal();
    }
  });

  // set a threshold for the amount to be withdrawn and throw error if the amount is greater than the wallet balance
  useEffect(() => {
    if (parseInt(formik.values.amount) > walletBalance) {
      setIsError(true);
    } else {
      setIsError(false);
    }

    return () => {
      setIsError(false);
    };
  }, [formik.values.amount, walletBalance]);

  return (
    <Box>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <Stack direction={'column'} spacing={4} marginBottom={5}>
            <StyledTypography>Enter the amount you want to withdraw</StyledTypography>
            <Box>
              <FormInput name='amount' label='Amount' placeholder={'₦0'} hasMessage type='number' />
              <Typography color={'#3B7C0F'} fontWeight={500} fontSize={14}>
                Current balance : {formatPrice(walletBalance)}
              </Typography>
              {isError && (
                <Typography color={'#FF0000'} fontWeight={500} fontSize={14}>
                  Amount must be less than or equal to wallet balance
                </Typography>
              )}
            </Box>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <OutlinedButton label='Cancel' padding={'.55rem 1.4rem'} onClick={onClose} />
            <SimpleButton label='Withdraw' padding={'.55rem 1.4rem'} type='submit' disabled={isError} />
          </Stack>
        </Form>
      </FormikProvider>

      <WithdrawalModalContainer
        open={openOtpModal}
        onClose={() => {
          setOpenOtpModal(false);
        }}
        modalTitle='Verification'
      >
        <WithdrawalOTP
          onClose={() => {
            setOpenOtpModal(false);
            onClose();
          }}
        />
      </WithdrawalModalContainer>
    </Box>
  );
};
