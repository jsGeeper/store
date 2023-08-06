import React from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import FormInput from '../form/FormInput';
import CustomDatePicker from '../form/CustomDatePicker';
import { SimpleButton } from '../button/SimpleButton';

const validationSchema = Yup.object().shape({
  institution: Yup.string().required('Institution is required'),
  location: Yup.string().required('Location is required'),
  degree: Yup.string().required('Degree is required'),
  start_date: Yup.string().required('Start Date is required'),
  end_date: Yup.string().required('End Date is required')
});

const EducationTab = () => {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      institution: '',
      location: '',
      degree: '',
      start_date: '',
      end_date: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        setSubmitting(false);
        enqueueSnackbar('Education updated successfully', { variant: 'success' });
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  return (
    <div className={'form-container mb-1'}>
      <h1 className='form-title'>Education</h1>

      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <div className='mb-2'>
            <FormInput
              name='institution'
              label='School or University'
              placeholder='E.g University of Lagos'
              hasMessage={true}
            />
          </div>
          <div className='mb-2'>
            <FormInput name='location' label='Location' placeholder='E.g Lagos,Nigeria' hasMessage={true} />
          </div>
          <div className='mb-2'>
            <FormInput
              name='degree'
              label='Degree'
              placeholder='E.g Bachelor’s in Agricultural science'
              hasMessage={true}
            />
          </div>
          <div className='mb-2'>
            <CustomDatePicker
              placeholder='MM/YY'
              name='_'
              isDateRange={{
                enable: true,
                endDateName: 'end_date',
                startDateName: 'start_date'
              }}
              hasMessage={true}
            />
          </div>
          <div className='row right mt-2'>
            <SimpleButton label={'Save Changes'} />
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default EducationTab;
