import React from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { SelectorAffixable } from '../../form';
import FormInput from '../../form/FormInput';
import { SimpleButton } from '../../button/SimpleButton';
import MCard from '../../../assets/svg/card.svg';
import { useSnackbar } from '../../../hooks/useSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { postSettlement } from '../../../redux/slice/update-profile/profileUpdateAction';
import { IRootReducerState } from '../../../redux/IRootReducer';

interface ISettlementFormProps {
  details: any;
  banks: any;
}

const validationSchema = Yup.object().shape({
  bank: Yup.string().required('Bank is required'),
  account_number: Yup.string().required('Account number is required'),
  account_name: Yup.string().required('Account name is required')
});

const SettlementForm = ({ banks, details }: ISettlementFormProps) => {
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { user } = useSelector((state: IRootReducerState) => state.auth);

  const formik = useFormik({
    initialValues: {
      bank: '',
      account_number: '',
      account_name: ''
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        dispatch(
          postSettlement({
            user_id: user?.id,
            accountName: values.account_name,
            accountNumber: values.account_number,
            bankName: values.bank,
            triggerSnackbar: showSnackbar('Settlement account added successfully', '', 'success', null, null)
          })
        );
        setSubmitting(false);
        resetForm();
      } catch (error: any) {
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  return (
    <div className={'mb-1'}>
      <h1 className='form-title'>Add a settlement account</h1>

      {details.length > 0 ? (
        <>
          {details.map((detail: any, index: number) => (
            <Paper
              sx={{
                p: 2,
                width: 1,
                borderRadius: '0.8rem',
                border: '1px solid #EAECF0',
                mb: 2,
                '&:last-child': {
                  mb: 0
                }
              }}
              key={index}
              elevation={0}
            >
              <Stack direction='row' spacing={2}>
                <Box
                  component='img'
                  alignSelf={'flex-start'}
                  src={MCard}
                  sx={{ mb: 1, height: '32px', width: '32px' }}
                />
                <Box>
                  <Typography
                    variant='h6'
                    textTransform={'capitalize'}
                    sx={{
                      fontWeight: 500
                    }}
                  >
                    {detail?.accountName}
                  </Typography>
                  <Typography
                    variant='h6'
                    sx={{
                      fontWeight: 400,
                      color: '#667085'
                    }}
                    gutterBottom
                  >
                    {detail?.accountNumber}
                  </Typography>

                  <Button
                    variant='text'
                    sx={{
                      color: '#B42318',
                      fontWeight: 500,
                      fontFamily: 'Inter',
                      fontSize: '1.4rem',
                      textTransform: 'none'
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Stack>
            </Paper>
          ))}
        </>
      ) : (
        <React.Fragment>
          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
              <SelectorAffixable
                label={'Bank'}
                name={'bank'}
                placeholder={'Select a bank'}
                items={banks}
                showAddButton={false}
              />
              <FormInput
                name={'account_number'}
                type={'number'}
                pattern='[0-9]*'
                label={'Account number'}
                placeholder={'11-digit account number'}
                hasMessage={true}
              />
              <FormInput name={'account_name'} label={'Account name'} placeholder={'John Doe'} hasMessage={true} />
              <div className='row right mt-2'>
                <SimpleButton label={'Save Changes'} />
              </div>
            </Form>
          </FormikProvider>
        </React.Fragment>
      )}
    </div>
  );
};

export default SettlementForm;
