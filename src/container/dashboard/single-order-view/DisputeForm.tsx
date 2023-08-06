import React from 'react';
import { Popover, Typography, Box, Divider } from '@mui/material';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import Closeable from '../../../assets/Button close X.png';
import FormInput from '../../../components/form/FormInput';
import { ErrorText } from '../../../components/form/ErrorText';
import ActionButton from '../../../components/button/ActionButton';

interface IButtonProps {
  onClose: () => void;
  id: string | undefined;
  open: boolean;
  anchorEl: HTMLButtonElement | null;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required').max(500, 'Description exceeds 500 characters')
});

const DisputeForm: React.FC<IButtonProps> = ({ onClose, anchorEl, open, id }: IButtonProps) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        setSubmitting(false);
        onClose();
      } catch (error: any) {
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const dscCount = formik.values.description.length;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      elevation={3}
    >
      <Box sx={{ p: 2, width: 518 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant='h6'
            align={'center'}
            color={'#344054'}
            fontSize={'1.8rem'}
            fontWeight={500}
            justifySelf={'center'}
            flex={1}
          >
            Raise Dispute
          </Typography>
          <Box component={'img'} src={Closeable} onClick={onClose} sx={{ cursor: 'pointer' }} />
        </Box>
        <Divider sx={{ my: 2 }} light />
        <Box p={2}>
          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
              <FormInput name={'title'} label={'Title'} hasMessage placeholder={'Give your dispute a title'} />
              <div className='mb-2'>
                <FormInput
                  name={'description'}
                  as={'textarea'}
                  label={'Description'}
                  row={2}
                  cols={50}
                  hasMessage
                  placeholder={'What is the dispute about and why are you bringing it up?'}
                />
                <Typography variant='body2' align={'right'} fontSize={'1.4rem'} color='textSecondary' component='p'>
                  {dscCount}/500 characters
                </Typography>
              </div>
              <ActionButton label={'Raise Dispute'} type={'submit'} fullWidth />
            </Form>
          </FormikProvider>
        </Box>
      </Box>
    </Popover>
  );
};

export default DisputeForm;
