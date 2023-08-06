import React from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik, useFormikContext } from 'formik';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { ExpertExperienceContext } from '../../../../contexts';
import FormInput from '../../../form/FormInput';
import { SimpleButton } from '../../../button/SimpleButton';
import CustomDatePicker from '../../../form/CustomDatePicker';
import { updateWorkExperience } from '../../../../redux/slice/get-started/getStartedAction';
import { IRootReducerState } from '../../../../redux/IRootReducer';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  company_name: Yup.string().required('Company Name is required'),
  description: Yup.string().required('Description is required'),
  start_date: Yup.string().required('Start Date is required'),
  end_date: Yup.string().required('End Date is required')
});

const WorkExperience = () => {
  const { onNextStep, onCancel } = React.useContext(ExpertExperienceContext);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useSelector((state: IRootReducerState) => state.auth);

  const [formCount, setFormCount] = React.useState<number>(1);
  const [formData, setFormData] = React.useState<any>([
    {
      title: '',
      company_name: '',
      description: '',
      start_date: '',
      end_date: '',
      id: 1
    }
  ]);

  function addToGroup() {
    setFormCount(formCount + 1);
    setFormData((prevState: any) => [
      ...prevState,
      { title: '', company_name: '', description: '', start_date: '', end_date: '', id: formCount + 1 }
    ]);
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      company_name: '',
      description: '',
      start_date: '',
      end_date: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await dispatch(
          updateWorkExperience({
            id: user.id,
            work_title: values.title,
            work_company: values.company_name,
            work_description: values.description,
            work_start_date: values.start_date,
            work_end_date: values.end_date
          })
        );
        setSubmitting(false);
        enqueueSnackbar('Work Experience Updated', { variant: 'success' });
        onNextStep();
      } catch (error: any) {
        enqueueSnackbar(error.message, { variant: 'error' });
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  // const { handleChange: FormikHandleChange, setFieldValue } = formik;

  // const handleChange = (e: any, index: number) => {
  //   const { name, value } = e.target;
  //   const existingData = formData.find((item: any) => item.id === index);
  //   if (existingData) {
  //     existingData[name] = value;
  //     setFieldValue(`${index}`, existingData);
  //   }
  // };

  return (
    <main className='workExperience'>
      <div className='experience__form-title'>
        <h2>Work Experience</h2>
        <p>Fill the information below correctly </p>
      </div>
      <div className='form__container'>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            {/* {formData.map((item: any, index: number) => (*/}
            {/*  <React.Fragment key={index}>*/}
            <FormInput
              name='title'
              label='Title'
              placeholder='E.g Veterinarian, Irrigation Specialist'
              hasMessage={true}
              // onChange={(e: any) => handleChange(e, index)}
            />
            <br />
            <FormInput
              name='company_name'
              label='Company'
              placeholder='Company name'
              hasMessage={true}
              // onChange={(e: any) => handleChange(e, index)}
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
              // onChange={(e: any) => handleChange(e, index)}
            />
            <br />
            <FormInput
              as='textarea'
              rows={6}
              cols={60}
              name='description'
              label={'Description'}
              hasMessage={true}
              placeholder={'Describe what you did.'}
              // onChange={(e: any) => handleChange(e, index)}
            />
            <br />
            {/* </React.Fragment>*/}
            {/* ))}*/}

            <span
              className='text--md medium noLine mb-3 text-success'
              // onClick={addToGroup}
              style={{ cursor: 'pointer' }}
            >
              + Add New Experience
            </span>
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

export default WorkExperience;
