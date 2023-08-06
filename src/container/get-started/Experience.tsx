import React from 'react';
import Helmet from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {
  Education,
  LicenceAndCert,
  ProfessionalBio,
  WorkExperience
} from '../../components/get-started/experience/screens';
import { AppWrapper } from '../../components/layouts/app-wrapper';
import StepperComponent from '../../components/stepper/Stepper';
import { ExpertExperienceContext } from '../../contexts';
import { PATH_DASHBOARD, PATH_MAIN } from '../../router/pages';

type Steps = 0 | 1 | 2 | 3;

const steps = ['Professional Bio', 'Work Experience', 'Education', 'Licences and Certifications'];
const Experience: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const navigate = useNavigate();

  const onCancel = () => {
    navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.GET_STARTED}`);
  };

  const onNextStep = () => {
    switch (activeStep) {
      case 0:
        setActiveStep(1);
        break;
      case 1:
        setActiveStep(2);
        break;
      case 2:
        setActiveStep(3);
        break;
      default:
        setActiveStep(0);
        break;
    }
  };

  return (
    <ExpertExperienceContext.Provider value={{ activeStep, onNextStep, onCancel }}>
      <Helmet>
        <title>Experience | Go-Geeper</title>
      </Helmet>
      <main id='experience'>
        <AppWrapper title={'Get Started'}>
          <div className='experience__wrapper'>
            <div className='experience__stepper'>
              <StepperComponent activeStep={activeStep} steps={steps} />
            </div>
            <div className='experience__form'>
              {activeStep === 0 && <ProfessionalBio />}
              {activeStep === 1 && <WorkExperience />}
              {activeStep === 2 && <Education />}
              {activeStep === 3 && <LicenceAndCert />}
            </div>
          </div>
        </AppWrapper>
      </main>
    </ExpertExperienceContext.Provider>
  );
};

export default Experience;
