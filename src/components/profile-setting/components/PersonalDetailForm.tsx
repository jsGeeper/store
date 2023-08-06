import React from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormInput from '../../form/FormInput';
import { SimpleButton } from '../../button/SimpleButton';
import { updatePersonalProfile } from '../../../redux/slice/update-profile/profileUpdateAction';
import { IRootReducerState } from '../../../redux/IRootReducer';
import { initialize } from '../../../redux/slice/auth/authAction';
import useUpdateUser from '../../../react-query/hooks/useUpdateUser';

interface PersonalDetailFormProps {
  user: any;
}

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  phone_number: Yup.string()
    .matches(/^[0-9]{11}$/, 'Phone number is invalid')
    .required('Phone number is required')
});

const PersonalDetailForm = ({ user }: PersonalDetailFormProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate, isLoading } = useUpdateUser();

  const { updatePersonalInfo } = useSelector((state: IRootReducerState) => state.profileUpdate);

  React.useEffect(() => {
    if (Object.keys(updatePersonalInfo).length > 0) {
      enqueueSnackbar('Personal details updated', { variant: 'success' });
      dispatch(initialize());
    }
  }, [updatePersonalInfo]);

  const formik = useFormik({
    initialValues: {
      first_name: user.firstName || '',
      last_name: user.lastName || '',
      phone_number: user.phone || '',
      email: user.email || ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      mutate({
        firstName: values.first_name,
        lastName: values.last_name,
        email: values.email,
        phone: values.phone_number
      });
      // try {
      //   dispatch(
      //     updatePersonalProfile({
      //       id: user?.id,
      //       role: user?.role,
      //       ...values
      //     })
      //   );
      // } catch (error: any) {
      //   enqueueSnackbar('Something went wrong.', { variant: 'error' });
      //   setSubmitting(false);
      //   setErrors(error);
      // }
    }
  });
  return (
    <div className='mb-2'>
      <FormikProvider value={formik}>
        <Form autoComplete='off' noValidate onSubmit={formik.handleSubmit}>
          <div className='row'>
            <FormInput
              name={'first_name'}
              label={'First Name'}
              hasMessage={true}
              placeholder={'John'}
              style={{ flex: 1, marginRight: '1rem' }}
            />
            <FormInput
              name={'last_name'}
              label={'Last Name'}
              hasMessage={true}
              placeholder={'doe'}
              style={{ flex: 1 }}
            />
          </div>
          <FormInput
            name={'email'}
            label={'Email Address'}
            subLabel={'(Optional)'}
            type='email'
            placeholder={'you@gogeeper.com'}
          />
          <FormInput
            label={'Phone Number'}
            hasMessage={true}
            type='tel'
            name={'phone_number'}
            disabled
            readOnly
            pattern='[0-9]*'
            placeholder={'080-1234-5678'}
          />

          <div className='row right mt-2'>
            <SimpleButton label={'Save Changes'} type={'submit'} loading={isLoading} />
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default PersonalDetailForm;
