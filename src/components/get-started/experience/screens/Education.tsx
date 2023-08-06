import React from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { ExpertExperienceContext } from '../../../../contexts';
import FormInput from '../../../form/FormInput';
import CustomDatePicker from '../../../form/CustomDatePicker';
import { SimpleButton } from '../../../button/SimpleButton';
import { IRootReducerState } from '../../../../redux/IRootReducer';
import { updateEducation } from '../../../../redux/slice/get-started/getStartedAction';

const validationSchema = Yup.object().shape({
  institution: Yup.string().required('Institution is required'),
  location: Yup.string().required('Location is required'),
  degree: Yup.string().required('Degree is required'),
  start_date: Yup.string().required('Start Date is required'),
  end_date: Yup.string().required('End Date is required')
});

const Education: React.FC = () => {
  const { onNextStep, onCancel } = React.useContext(ExpertExperienceContext);

  const { user } = useSelector((state: IRootReducerState) => state.auth);

  const dispatch = useDispatch();
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
        await dispatch(
          updateEducation({
            id: user.id,
            school_name: values.institution,
            school_location: values.location,
            school_degree: values.degree,
            school_start_date: values.start_date,
            school_end_date: values.end_date
          })
        );
        setSubmitting(false);
        enqueueSnackbar('Education updated successfully', { variant: 'success' });
        onNextStep();
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  return (
    <main className='education'>
      <div className='experience__form-title'>
        <h2>Education</h2>
        <p>Fill the information below correctly </p>
      </div>

      <div className='form__container'>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <FormInput
              name='institution'
              label='School or University'
              placeholder='E.g University of Lagos'
              hasMessage={true}
            />
            <br />
            <FormInput name='location' label='Location' placeholder='E.g Lagos,Nigeria' hasMessage={true} />
            <br />
            <FormInput
              name='degree'
              label='Degree'
              placeholder='E.g Bachelor’s in Agricultural science'
              hasMessage={true}
            />
            <br />
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
            <br />

            <span className='text--md medium noLine mb-3 text-success'>+ Add New Experience</span>
            <br />
            <div className='footer-button mt-2'>
              <SimpleButton label='Cancel' className='btn-outline-grey mt-0 mr-2' onClick={onCancel} />
              <SimpleButton label='Save and continue' type='submit' />
            </div>
          </Form>
        </FormikProvider>
      </div>
    </main>
  );
};

export default Education;
