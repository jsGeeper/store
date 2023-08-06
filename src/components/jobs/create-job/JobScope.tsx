import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { FormikProvider, Form, useFormik } from 'formik';
import {
  FlexEndStack,
  StepperCardSubtitle,
  StepperCardTitle,
  StepperFormHeader,
  StepperFormLabel,
  StepperFormProps,
  StepperFormStack
} from '../../../container/jobs/jobs.reusables';
import { FormCheckboxSelect } from '../../form';
import { SimpleButton } from '../../button/SimpleButton';
import FormSelectField from '../../form/FormSelectField';
import statesNG from '../../../utils/states';
import nigerianStateLGA from '../../../utils/nigerian-state-lgs';
import { useDispatch, useSelector } from 'react-redux';
import { initStageTwo, onPreviousStep } from '../../../redux/slice/jobs/jobs.slice';
import { IRootReducerState } from '../../../redux/IRootReducer';

const JobLocation = [
  { value: 'remote', title: 'Remote' },
  { value: 'on-site', title: 'On-site' }
];

const JobDuration = [
  { value: 'short term', title: 'Short term', description: 'Less than 3 months' },
  { value: 'long term', title: 'Long term', description: 'More than 3 months' }
];

const validationSchema = yup.object().shape({
  duration: yup.string().required('Duration is required'),
  location: yup.string().required('Location is required'),
  state: yup.string().when('location', {
    is: 'on-site',
    then: yup.string().required('State is required')
  }),
  lga: yup.string().when('location', {
    is: 'on-site',
    then: yup.string().required('Local Government is required')
  })
});

export const JobScope: React.FC<StepperFormProps> = ({ onNext }: StepperFormProps) => {
  const dispatch = useDispatch();
  const [initiatedBefore, setInitiatedBefore] = useState<boolean>(false);
  const { createJob } = useSelector((state: IRootReducerState) => state.jobs);

  const formik = useFormik({
    initialValues: {
      location: '',
      duration: '',
      state: '',
      lga: ''
    },
    validationSchema,
    onSubmit: (val) => {
      dispatch(initStageTwo({ ...val }));
      onNext();
    }
  });

  useEffect(() => {
    if (createJob.jobStageOne) {
      const { location, duration, state, lga } = createJob.jobStageTwo;
      formik.setValues({
        location,
        duration,
        state,
        lga
      });
      setInitiatedBefore(true);
    }
  }, []);

  return (
    <Box>
      <StepperFormHeader sx={{ marginBottom: '40px' }}>
        <StepperCardTitle>Job scope</StepperCardTitle>
        <StepperCardSubtitle>
          Help agric experts understand your job by giving a detailed description.
        </StepperCardSubtitle>
      </StepperFormHeader>

      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <StepperFormStack spacing={3}>
            <Box>
              <StepperFormLabel>job location</StepperFormLabel>
              <FormCheckboxSelect formik={formik} data={JobLocation} name={'location'} />

              {formik.values['location'] === 'on-site' && (
                <Box marginTop={2}>
                  <FormSelectField name='state' data={statesNG} label='State' placeholder={'Search for your state'} />
                  <FormSelectField
                    name='lga'
                    data={nigerianStateLGA}
                    stateValue={formik.values.state}
                    label='Local government area'
                    isDependent={true}
                    placeholder={'Search for your local government area '}
                  />
                </Box>
              )}
            </Box>
            <Box>
              <StepperFormLabel>job duration</StepperFormLabel>
              <FormCheckboxSelect formik={formik} data={JobDuration} name={'duration'} />
            </Box>
            <FlexEndStack marginTop={2}>
              <Box mr={2}>
                <SimpleButton
                  label={'Cancel'}
                  type='button'
                  className='btn-outline-grey'
                  onClick={() => dispatch(onPreviousStep())}
                />
              </Box>
              <Box>
                <SimpleButton label={'Save and continue'} />
              </Box>
            </FlexEndStack>
          </StepperFormStack>
        </Form>
      </FormikProvider>
    </Box>
  );
};
