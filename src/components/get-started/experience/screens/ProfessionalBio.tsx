import React from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../../../form/FormInput';
import { SimpleButton } from '../../../button/SimpleButton';
import { ExpertExperienceContext } from '../../../../contexts';
import { postUpdateBio } from '../../../../redux/slice/get-started/getStartedAction';
import { IRootReducerState } from '../../../../redux/IRootReducer';

const validationSchema = Yup.object().shape({
  bio_title: Yup.string().required('Title is required'),
  bio_description: Yup.string().required('Description is required')
});

const ProfessionalBio = () => {
  const { onNextStep, onCancel } = React.useContext(ExpertExperienceContext);

  const { user } = useSelector((state: IRootReducerState) => state.auth);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      bio_title: '',
      bio_description: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await dispatch(postUpdateBio({ id: user.id, ...values }));
        setSubmitting(false);
        enqueueSnackbar('Bio Updated', { variant: 'success' });
        onNextStep();
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  return (
    <main className='bio__wrapper'>
      <div className='experience__form-title'>
        <h2>Personal Information</h2>
        <p>Tell us more about yourself</p>
      </div>
      <div className='form__container'>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <FormInput
              name='bio_title'
              label='Title'
              placeholder='E.g Veterinarian, Irrigation Specialist'
              hasMessage={true}
            />
            <br />

            <FormInput
              as='textarea'
              rows={6}
              cols={60}
              name='bio_description'
              label={'Description'}
              hasMessage={true}
              placeholder={'Describe what you do.'}
            />

            <div className='footer-button'>
              <SimpleButton label='Cancel' className='btn-outline-grey mt-0 mr-2' onClick={onCancel} />
              <SimpleButton label='Save and continue' type='submit' />
            </div>
          </Form>
        </FormikProvider>
      </div>
    </main>
  );
};

export default ProfessionalBio;
