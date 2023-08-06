import React from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import FormInput from '../form/FormInput';
import CustomDatePicker from '../form/CustomDatePicker';
import { SimpleButton } from '../button/SimpleButton';

const validationSchema = Yup.object().shape({
  certification_name: Yup.string().required('Certification Name is required'),
  issuer: Yup.string().required('Issuing organization is required'),
  certification_date: Yup.string().required('Certification Date is required')
});

const CertificationTab = () => {
  const formik = useFormik({
    initialValues: {
      certification_name: '',
      issuer: '',
      certification_date: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        setSubmitting(false);
      } catch (error: any) {
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  return (
    <div className={'form-container mb-1'}>
      <h1 className='form-title'>Certifications</h1>

      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <div className='mb-2'>
            <FormInput
              name={'certification_name'}
              label={'Certification Name'}
              hasMessage={true}
              placeholder={'Enter Certification name'}
            />
          </div>
          <div className='mb-2'>
            <FormInput
              name={'issuer'}
              label={'Issuing organization'}
              hasMessage={true}
              placeholder={'Enter Issuing organization'}
            />
          </div>
          <div className='mb-2'>
            <CustomDatePicker
              name={'certification_date'}
              placeholder={'Issue Date'}
              label={'Certification Date'}
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

export default CertificationTab;
