import React from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { PersonalDetailsContext } from '../../../../contexts';
import FormInput from '../../../form/FormInput';
import { SimpleButton } from '../../../button/SimpleButton';
import { Typography } from '@mui/material';
import { updateFarmInfo } from '../../../../redux/slice/get-started/getStartedAction';
import { IRootReducerState } from '../../../../redux/IRootReducer';

const validationSchema = Yup.object().shape({
  farm_name: Yup.string().required('Farm name is required'),
  farm_type: Yup.string().required('Farm Type is required'),
  description: Yup.string().required('Description is required').max(500, 'Description exceeds 500 characters')
});

const FarmInfo = () => {
  const { onNextStep } = React.useContext(PersonalDetailsContext);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useSelector((state: IRootReducerState) => state.auth);

  const formik = useFormik({
    initialValues: {
      farm_name: '',
      farm_type: '',
      description: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await dispatch(
          updateFarmInfo({
            id: user.id,
            farmer_name: values.farm_name,
            farmer_type: values.farm_type,
            description: values.description
          })
        );
        setSubmitting(false);
        enqueueSnackbar('Farm Information Updated', { variant: 'success' });
        onNextStep();
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { handleSubmit } = formik;

  const descriptionCount = formik.values.description.length;

  return (
    <React.Fragment>
      <main className='farmInfo'>
        <div className='personalDetails__form-title'>
          <h2>Farm Information</h2>
          <p>Tell us a brief description of the kind of farm you manage or own.</p>
        </div>

        <div className='farmInfo__form'>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <FormInput
                name={'farm_name'}
                label={'Farm Name'}
                hasMessage={true}
                placeholder={'Enter the name of your farm'}
                style={{ flex: 1, marginRight: '1rem' }}
              />
              <div>
                <FormInput
                  name='farm_type'
                  as='textarea'
                  label={'Farm Type'}
                  hasMessage={true}
                  placeholder={'You can add more than one; separate each with a comma.'}
                  style={{ flex: 1, marginRight: '1rem' }}
                />

                <Typography variant='body2' fontSize={'1.4rem'} color='textSecondary' component='p'>
                  <span>
                    Examples:{' '}
                    <em className='link-underlined notice-txt'>Poultry, Apiary, Aquaculture, Diary farm, .....</em>
                  </span>
                </Typography>
              </div>
              <br />
              <div>
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

                <span className='desc-error'>{descriptionCount} / 500 characters</span>
              </div>
              <div className='footer-button'>
                <SimpleButton label='Cancel' className='btn-outline-grey mt-0 mr-2' />
                <SimpleButton label='Save and continue' />
              </div>
            </Form>
          </FormikProvider>
        </div>
      </main>
    </React.Fragment>
  );
};

export default FarmInfo;
