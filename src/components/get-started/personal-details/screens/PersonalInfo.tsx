import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { IRootReducerState } from '../../../../redux/IRootReducer';

import DisplayImageUpload from '../components/DisplayImageUpload';
import FormInput from '../../../form/FormInput';
import { SimpleButton } from '../../../button/SimpleButton';
import { PersonalDetailsContext } from '../../../../contexts';
import { ROLES } from '../../../../utils/roles';
import { updatePersonalInfo } from '../../../../redux/slice/get-started/getStartedAction';

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  phone_number: Yup.string()
    .matches(/^[0-9]{11}$/, 'Phone number is invalid')
    .required('Phone number is required')
});

const PersonalInfo = () => {
  const { user } = useSelector((state: IRootReducerState) => state.auth);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { onNextStep, onCancel } = React.useContext(PersonalDetailsContext);

  const roleMgr = user.role === ROLES.AGRIC_EXPERT ? 'agricExpert' : 'farmer';

  const formik = useFormik({
    initialValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      phone_number: user?.phone_number || '',
      email: user?.email || ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await dispatch(
          updatePersonalInfo({
            id: user.id,
            role: roleMgr,
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email
          })
        );
        setSubmitting(false);
        enqueueSnackbar('Personal Information Updated', { variant: 'success' });
        onNextStep();
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { handleSubmit } = formik;

  return (
    <React.Fragment>
      <main className='personalInfo-wrapper'>
        <div className='personalDetails__form-title'>
          <h2>Personal Information</h2>
          <p>Tell us more about yourself</p>
        </div>
        <DisplayImageUpload user={user} />
        <br />
        <div className='form__container'>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <div className='formName-field'>
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
              <div className='footer-button'>
                <SimpleButton label='Cancel' className='btn-outline-grey mt-0 mr-2' onClick={onCancel} />
                <SimpleButton label='Save and continue' />
              </div>
            </Form>
          </FormikProvider>
        </div>
      </main>
    </React.Fragment>
  );
};

export default PersonalInfo;
