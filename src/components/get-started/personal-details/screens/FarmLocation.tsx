import React from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import FormSelectField from '../../../form/FormSelectField';
import { SimpleButton } from '../../../button/SimpleButton';
import countries from '../../../../utils/Countries';
import nigerianStateLGA from '../../../../utils/nigerian-state-lgs';
import statesNG from '../../../../utils/states';
import FormInput from '../../../form/FormInput';
import { PATH_MAIN, PATH_DASHBOARD } from '../../../../router/pages';
import { PersonalDetailsContext } from '../../../../contexts';
import { IRootReducerState } from '../../../../redux/IRootReducer';
import { ROLES } from '../../../../utils/roles';
import { updateLocation } from '../../../../redux/slice/get-started/getStartedAction';

interface IFarmerLocation {
  title: string;
  subLabel: string;
  handleAction?: (values: any) => void;
  handleCancel?: () => void;
}

const validationSchema = Yup.object().shape({
  country: Yup.string().required('Country is required')
});

const FarmLocation: React.FC<IFarmerLocation> = ({ subLabel, title }: IFarmerLocation) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { onCancel } = React.useContext(PersonalDetailsContext);
  const { user } = useSelector((state: IRootReducerState) => state.auth);

  const roleMgr = user.role === ROLES.AGRIC_EXPERT ? 'agricExpert' : 'farmer';

  const formik = useFormik({
    initialValues: {
      country: '',
      state: '',
      lga: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await dispatch(
          updateLocation({
            id: user.id,
            role: user.role,
            ...values
          })
        );
        setSubmitting(false);
        enqueueSnackbar('Location Updated', { variant: 'success' });
        onCancel();
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
      <main className='farmLocation'>
        <div className='personalDetails__form-title'>
          <h2>{title}</h2>
          <p>{subLabel}</p>
        </div>

        <div className='farmLocation__form'>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <FormSelectField
                name='country'
                data={countries}
                label='Country'
                placeholder={' Search for your country'}
              />
              {formik.values.country.toLowerCase() === 'nigeria' ? (
                <>
                  <FormSelectField name='state' data={statesNG} label='State' placeholder={'Search for your state'} />
                  <FormSelectField
                    name='lga'
                    data={nigerianStateLGA}
                    stateValue={formik.values.state}
                    label='Local government area'
                    isDependent={true}
                    placeholder={'Search for your local government area '}
                  />
                </>
              ) : (
                <>
                  <FormInput name='state' label='State' placeholder={'Enter your state'} />
                  <br />
                  <FormInput
                    name='lga'
                    label='Local government area'
                    placeholder={'Enter your local government area '}
                  />
                </>
              )}
              <div className='footer-button'>
                <SimpleButton label='Cancel' className='btn-outline-grey mt-0 mr-2' onClick={onCancel} />
                <SimpleButton label='Complete' />
              </div>
            </Form>
          </FormikProvider>
        </div>
      </main>
    </React.Fragment>
  );
};

export default FarmLocation;
