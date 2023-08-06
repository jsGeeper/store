import React from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { AppWrapper } from '../../components/layouts/app-wrapper';
import { Box, Grid } from '@mui/material';
import StepperComponent from '../../components/stepper/Stepper';
import { JobBudget, JobDescription, JobPreview, JobScope } from '../../components/jobs/create-job';
import { IRootReducerState } from '../../redux/IRootReducer';
import { onNextStep } from '../../redux/slice/jobs/jobs.slice';

const steps = ['Description', 'Scope', 'Budget', 'Preview'];

export const CreateJobScreen = () => {
  const dispatch = useDispatch();

  const {
    createJob: { activeStep }
  } = useSelector((state: IRootReducerState) => state.jobs);

  const onNext = () => {
    if (activeStep === steps.length - 1) {
      return;
    }
    dispatch(onNextStep());
  };

  return (
    <AppWrapper>
      <Helmet>
        <title>Create Job</title>
      </Helmet>
      <Box paddingY={5} paddingX={3}>
        <Grid container spacing={10}>
          <Grid item xs={2}>
            <StepperComponent steps={steps} activeStep={activeStep} />
          </Grid>
          <Grid item xs={10}>
            <Box width={'100%'} maxWidth={541} height={'100%'}>
              {activeStep === 0 && <JobDescription onNext={onNext} />}
              {activeStep === 1 && <JobScope onNext={onNext} />}
              {activeStep === 2 && <JobBudget onNext={onNext} />}
              {activeStep === 3 && <JobPreview />}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </AppWrapper>
  );
};
