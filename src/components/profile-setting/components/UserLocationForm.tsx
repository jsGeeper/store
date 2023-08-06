import React from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormSelectField from '../../form/FormSelectField';
import countries from '../../../utils/Countries';
import statesNG from '../../../utils/states';
import nigerianStateLGA from '../../../utils/nigerian-state-lgs';
import { SimpleButton } from '../../button/SimpleButton';
import { IRootReducerState } from '../../../redux/IRootReducer';
import { updateProfileFarmLocation } from '../../../redux/slice/update-profile/profileUpdateAction';
import { initialize } from '../../../redux/slice/auth/authAction';

const validationSchema = Yup.object().shape({
  country: Yup.string().required('Country is required')
});

const UserLocationForm = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { farmInfoAndLocation, updateFarmLocation } = useSelector((state: IRootReducerState) => state.profileUpdate);
  const { user } = useSelector((state: IRootReducerState) => state.auth);

  const [state, setState] = React.useState(farmInfoAndLocation);

  /**
   * TODO: Uncomment this code because the response from the server is not consistent
   */
  // React.useEffect(() => {
  //   if (Object.keys(farmInfoAndLocation).length > 0) {
  //     setState(farmInfoAndLocation);
  //   }
  // }, [farmInfoAndLocation]);

  React.useEffect(() => {
    if (Object.keys(updateFarmLocation).length > 0) {
      enqueueSnackbar('Location updated', { variant: 'success' });
      dispatch(initialize());
    }
  }, [updateFarmLocation]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      country: state?.country || '',
      state: state?.state || '',
      lga: state?.lga || ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        dispatch(
          updateProfileFarmLocation({
            id: user?.id,
            ...values
          })
        );
        setSubmitting(false);
      } catch (error: any) {
        enqueueSnackbar('Something went wrong.', { variant: 'error' });
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  return (
    <div className='mb-2'>
      <h1 className='form-title'>Location</h1>
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

export default UserLocationForm;
