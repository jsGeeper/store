import React from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import FormSelectField from '../../form/FormSelectField';
import countries from '../../../utils/Countries';
import statesNG from '../../../utils/states';
import nigerianStateLGA from '../../../utils/nigerian-state-lgs';
import { SimpleButton } from '../../button/SimpleButton';

const validationSchema = Yup.object().shape({
  country: Yup.string().required('Country is required')
});

const FarmLocationTab = () => {
  const formik = useFormik({
    initialValues: {
      country: 'Nigeria',
      state: '',
      lga: ''
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
    <div className='mb-2'>
      <h1 className='form-title'>Farm Location</h1>
      <FormikProvider value={formik}>
        <Form autoComplete='off' noValidate onSubmit={formik.handleSubmit}>
          <FormSelectField name='country' label={'Country'} data={countries} placeholder={' Search for your country'} />
          <FormSelectField name='state' data={statesNG} label='State' placeholder={'Search for your state'} />
          <FormSelectField
            name='lga'
            data={nigerianStateLGA}
            stateValue={formik.values.state}
            label='Local government area'
            isDependent={true}
            placeholder={'Search for your local government area '}
          />

          <div className='row right mt-2'>
            <SimpleButton label={'Save Changes'} />
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default FarmLocationTab;
