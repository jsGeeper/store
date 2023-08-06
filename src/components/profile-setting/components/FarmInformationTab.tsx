import React from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../../form/FormInput';
import { SimpleButton } from '../../button/SimpleButton';
import { IRootReducerState } from '../../../redux/IRootReducer';

const validationSchema = Yup.object().shape({
  farm_name: Yup.string().required('Farm name is required'),
  farm_type: Yup.string().required('Farm Type is required'),
  description: Yup.string().required('Description is required').max(500, 'Description exceeds 500 characters')
});

const FarmInformationTab = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { farmInfoAndLocation } = useSelector((state: IRootReducerState) => state.profileUpdate);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      farm_name: farmInfoAndLocation?.farmer_name || '',
      farm_type: farmInfoAndLocation?.farmer_type || '',
      description: farmInfoAndLocation?.description || ''
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
      <h1 className='form-title'>Farm Information</h1>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <FormInput
            name={'farm_name'}
            label={'Farm Name'}
            hasMessage={true}
            placeholder={'Enter the name of your farm'}
            style={{ flex: 1, marginRight: '1rem' }}
          />

          <FormInput
            name='farm_type'
            as='textarea'
            label={'Farm Type'}
            hasMessage={true}
            placeholder={'You can add more than one; separate each with a comma.'}
            style={{ flex: 1, marginRight: '1rem' }}
          />

          <FormInput
            as='textarea'
            name='description'
            rows={5}
            cols={50}
            label={'Description'}
            hasMessage={true}
            placeholder={'Describe your farm and the services you offer.'}
            style={{ flex: 1, marginRight: '1rem' }}
          />
          <div className='row right mt-2'>
            <SimpleButton label={'Save Changes'} />
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default FarmInformationTab;
