import { Box, Typography, styled, Stack } from '@mui/material';
import { FormikProvider, Form, useFormik } from 'formik';
import * as yup from 'yup';
import React, { useState, useEffect } from 'react';
import FormSelectField from '../form/FormSelectField';
import axios from 'axios';
import FormInput from '../form/FormInput';
import { OutlinedButton } from '../button/OutlinedButton';
import { SimpleButton } from '../button/SimpleButton';

interface SettlementFormProps {
  onSubmit: () => void;
  onClose: () => void;
}

const validationSchema = yup.object({
  bank: yup.string().required('Bank is required'),
  account_number: yup.string().required('Account Number is required'),
  account_name: yup.string().required('Account Name is required')
});

const StyledTypography = styled(Typography)({
  color: '#667085',
  fontWeight: 400,
  fontSize: 14
});

const StyledLoading = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'white',
  zIndex: 100
});

export const SettlementForm: React.FC<SettlementFormProps> = ({ onSubmit, onClose }: SettlementFormProps) => {
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState([]);

  const fetchBanks = async () => {
    setLoading(true);
    const response = await axios.get('https://api.paystack.co/bank');
    const data = await response.data;
    setBanks(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const bankOptions = banks.map((bank: any) => {
    return { label: bank.name, value: bank.name };
  });

  const formik = useFormik({
    initialValues: {
      bank: '',
      account_number: '',
      account_name: ''
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit();
    }
  });

  return (
    <Box>
      {loading && (
        <StyledLoading>
          <Typography variant='h6'>Loading...</Typography>
        </StyledLoading>
      )}
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <Stack direction={'column'} spacing={4} marginBottom={5}>
            <StyledTypography>
              This account does not have a settlement account. Before you can make any withdrawals, you must first add
              one.
            </StyledTypography>
            <FormSelectField name='bank' data={bankOptions} label='Bank' placeholder={'Search for your bank'} />
            <FormInput
              name='account_number'
              label='Account number'
              placeholder={'Account Number'}
              hasMessage
              type='number'
            />
            <FormInput name='account_name' label='Account name' placeholder={'Account Name'} hasMessage />
          </Stack>

          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <OutlinedButton label='Cancel' padding={'.55rem 1.4rem'} onClick={onClose} />
            <SimpleButton label='Add Account' padding={'.55rem 1.4rem'} type='submit' />
          </Stack>
        </Form>
      </FormikProvider>
    </Box>
  );
};
