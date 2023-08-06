import React from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import FormInput from '../form/FormInput';
import CustomDatePicker from '../form/CustomDatePicker';
import { SimpleButton } from '../button/SimpleButton';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  company_name: Yup.string().required('Company Name is required'),
  description: Yup.string().required('Description is required'),
  start_date: Yup.string().required('Start Date is required'),
  end_date: Yup.string().required('End Date is required')
});

const ExperienceTab = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      company_name: '',
      description: '',
      start_date: '',
      end_date: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        // ...
      } catch (error: any) {
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  return (
    <div className={'form-container mb-1'}>
      <h1 className='form-title'>Experience</h1>

      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <div className='mb-2'>
            <FormInput
              name='title'
              label='Title'
              placeholder='E.g Veterinarian, Irrigation Specialist'
              hasMessage={true}
            />
          </div>
          <div className='mb-2'>
            <FormInput name='company_name' label='Company' placeholder='Company name' hasMessage={true} />
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
          <div className='mb-2'>
            <FormInput
              as='textarea'
              rows={6}
              cols={60}
              name='description'
              label={'Description'}
              hasMessage={true}
              placeholder={'Describe what you did.'}
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

export default ExperienceTab;
