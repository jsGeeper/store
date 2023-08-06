import React from 'react';
import { Step, Stepper, StepLabel, Box } from '@mui/material';

interface IProps {
  activeStep: number;
  steps: string[];
}

const StepperComponent: React.FC<IProps> = ({ activeStep, steps }: IProps) => {
  return (
    <Box sx={{ maxWidth: 326 }}>
      <Stepper activeStep={activeStep} orientation='vertical' className='stepper'>
        {steps.map((label) => (
          <Step key={label} className='steps'>
            <StepLabel
              sx={{
                '& .MuiStepLabel-label': {
                  fontSize: '1.5rem',
                  fontWeight: 500
                }
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepperComponent;
