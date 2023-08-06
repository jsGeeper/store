import { Box, Typography, styled, Stack } from '@mui/material';
import React from 'react';
import { usePaystackPayment } from 'react-paystack';
import * as yup from 'yup';
import { FormikProvider, Form, useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { IRootReducerState } from '../../redux/IRootReducer';
import FormInput from '../form/FormInput';
import { OutlinedButton } from '../button/OutlinedButton';
import { SimpleButton } from '../button/SimpleButton';
import { handleCloseModal } from '../../redux/slice/wallet/wallet.slice';

interface IProps {
  onSuccessFunc: (res: any) => void;
}

const validationSchema = yup.object().shape({
  amount: yup.number().required('Amount is required')
});

const StyledTypography = styled(Typography)({
  color: '#667085',
  fontWeight: 400,
  fontSize: 14
});

export const WalletFundingAmount: React.FC<IProps> = ({ onSuccessFunc }: IProps) => {
  const { amount, selectedMethod } = useSelector((state: IRootReducerState) => state.wallet);
  const { user } = useSelector((state: IRootReducerState) => state.auth);
  const dispatch = useDispatch();

  const ref = Date.now() + '-' + user?.id;

  const formik = useFormik({
    initialValues: {
      amount: ''
    },
    validationSchema,
    onSubmit: (values) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      initializePayment(onSuccess, onClose);
    }
  });

  const config = {
    amount: parseInt(formik.values.amount) * 100,
    email: user?.email === null ? 'bizdev@gilgaldabihn.com' : user?.email,
    publicKey: 'pk_test_cb020a1f12dd7d2db6555401e5596d24a57b360b',
    reference: ref
  };

  const onSuccess = (res: any) => {
    onSuccessFunc(res);
    dispatch(handleCloseModal('amountModal'));
    dispatch(handleCloseModal('fundingModal'));
  };

  const onClose = () => {
    console.log('closed');
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const initializePayment = usePaystackPayment(config);

  return (
    <Box>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <Stack direction={'column'} spacing={4} marginBottom={5}>
            <StyledTypography>Enter the amount you want to Fund</StyledTypography>
            <FormInput name={'amount'} label={'Amount'} hasMessage placeholder={'₦0'} type='number' pattern='[0-9]*' />
          </Stack>

          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <OutlinedButton
              label='Cancel'
              padding={'.55rem 1.4rem'}
              onClick={() => dispatch(handleCloseModal('amountModal'))}
            />
            <SimpleButton label='Fund' padding={'.55rem 1.4rem'} type='submit' />
          </Stack>
        </Form>
      </FormikProvider>
    </Box>
  );
};
