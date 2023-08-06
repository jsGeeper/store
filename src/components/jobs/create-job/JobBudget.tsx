import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Box, Typography } from '@mui/material';
import { FormikProvider, Form, useFormik } from 'formik';
import moment from 'moment';
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
import FormInput from '../../form/FormInput';
import { SimpleButton } from '../../button/SimpleButton';
import { useDispatch, useSelector } from 'react-redux';
import { initStageThree, onPreviousStep } from '../../../redux/slice/jobs/jobs.slice';
import { IRootReducerState } from '../../../redux/IRootReducer';

const validationSchema = yup.object().shape({
  job_budget: yup.string().required('Job budget is required'),
  job_budget_amount: yup.number().when('job_budget', {
    is: 'yes',
    then: yup
      .number()
      .required('Job budget amount is required')
      .min(10000, 'Job budget amount can not be less than ₦10,000')
  })
});

const BUDGETS1 = [{ value: 'yes', title: 'Yes I do' }];
const BUDGETS2 = [{ value: 'no', title: "No I don't" }];

export const JobBudget: React.FC<StepperFormProps> = ({ onNext }: StepperFormProps) => {
  const [initiatedBefore, setInitiatedBefore] = useState<boolean>(false);
  const { createJob } = useSelector((state: IRootReducerState) => state.jobs);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      job_budget: '',
      job_budget_amount: ''
    },
    validationSchema,
    onSubmit: (val) => {
      dispatch(
        initStageThree({
          ...val,
          job_budget_amount: val.job_budget === 'yes' ? val.job_budget_amount : '',
          createdAt: moment().format('MMM d, YYYY')
        })
      );
      onNext();
    }
  });

  useEffect(() => {
    if (createJob.jobStageThree) {
      const { job_budget, job_budget_amount } = createJob.jobStageThree;
      formik.setValues({
        job_budget,
        job_budget_amount
      });
      setInitiatedBefore(true);
    }
  }, []);

  return (
    <Box>
      <StepperFormHeader sx={{ marginBottom: '40px' }}>
        <StepperCardTitle>Job budget</StepperCardTitle>
        <StepperCardSubtitle>
          Help agric experts understand your job by giving a detailed description.
        </StepperCardSubtitle>
      </StepperFormHeader>

      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <StepperFormStack spacing={3}>
            <Box>
              <StepperFormLabel>Do you have a budget for this job </StepperFormLabel>
              <Box mb={2}>
                <FormCheckboxSelect formik={formik} data={BUDGETS1} name={'job_budget'} />
              </Box>
              {formik.values['job_budget'] === 'yes' && (
                <Box marginY={3}>
                  <FormInput name='job_budget_amount' label='Your budget' placeholder='₦' hasMessage type='number' />
                </Box>
              )}
              <FormCheckboxSelect formik={formik} data={BUDGETS2} name={'job_budget'} />
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
                <SimpleButton label={'Preview job post'} />
              </Box>
            </FlexEndStack>
          </StepperFormStack>
        </Form>
      </FormikProvider>
    </Box>
  );
};
