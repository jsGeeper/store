import React from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import FormInput from '../form/FormInput';
import { SimpleButton } from '../button/SimpleButton';
import useUpdatePassword from '../../react-query/hooks/useUpdatePassword';

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Password is required.').min(8, 'Must be at least 8 characters.'),
  newPassword: Yup.string().required('New Password is required.').min(8, 'Must be at least 8 characters.'),
  confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});

const SecurityTab = () => {
  const { mutate, isLoading } = useUpdatePassword();
  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      mutate({ oldPassword: values.password, password: values.newPassword, confirmPassword: values.confirmPassword });
    }
  });

  return (
    <div className='form-container'>
      <h1 className='form-title'>Change Password</h1>
      <FormikProvider value={formik}>
        <Form autoComplete='off' noValidate onSubmit={formik.handleSubmit}>
          <FormInput
            hasMessage={true}
            name='password'
            label='Old password'
            type='password'
            isPassword={true}
            placeholder={'Password (min of 8 characters)'}
          />
          <FormInput
            hasMessage={true}
            name='newPassword'
            label='New password'
            type='password'
            isPassword={true}
            placeholder={'Password (min of 8 characters)'}
          />
          <FormInput
            hasMessage={true}
            name='confirmPassword'
            label='Confirm password'
            type='password'
            isPassword={true}
            placeholder={'Password (min of 8 characters)'}
          />
          <div className='row right mt-2'>
            <SimpleButton label={'Save Changes'} loading={isLoading} />
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default SecurityTab;
