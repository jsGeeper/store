import React from 'react';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FarmInfo, FarmLocation, PersonalInfo } from '../../components/get-started/personal-details/screens';

import { AppWrapper } from '../../components/layouts/app-wrapper';
import StepperComponent from '../../components/stepper/Stepper';
import { PersonalDetailsContext } from '../../contexts';
import { IRootReducerState } from '../../redux/IRootReducer';
import { PATH_DASHBOARD, PATH_MAIN } from '../../router/pages';
import { ROLES } from '../../utils/roles';

const steps = ['Personal information', 'Farm information', 'Farm location'];
const expertSteps = ['Personal information', 'Location details'];

type Steps = 0 | 1 | 2 | 3;
const PersonalDetails: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const navigate = useNavigate();

  const { user } = useSelector((state: IRootReducerState) => state.auth);

  const onNextStep = () => {
    if (user.role === ROLES.AGRIC_EXPERT) {
      switch (activeStep) {
        case 0:
          setActiveStep(3);
          break;
        default:
          setActiveStep(0);
          break;
      }
    } else {
      switch (activeStep) {
        case 0:
          setActiveStep(1);
          break;
        case 1:
          setActiveStep(2);
          break;
        default:
          setActiveStep(0);
          break;
      }
    }
  };

  const onCancel = () => {
    navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.GET_STARTED}`);
  };

  return (
    <PersonalDetailsContext.Provider value={{ activeStep, onNextStep, onCancel }}>
      <Helmet>
        <title>Personal Information | Go-Geeper</title>
      </Helmet>
      <main id='PersonalDetails'>
        <AppWrapper title={'Get Started'}>
          <div className='personalDetails__wrapper'>
            <div className='personalDetails__stepper'>
              <StepperComponent
                activeStep={activeStep}
                steps={user.role === ROLES.AGRIC_EXPERT ? expertSteps : steps}
              />
            </div>
            <div className='personalDetails__form'>
              {activeStep === 0 && <PersonalInfo />}
              {user.role === ROLES.AGRIC_EXPERT ? (
                activeStep === 3 && <FarmLocation title='Location details' subLabel='Tell us your location' />
              ) : (
                <>
                  {activeStep === 1 && <FarmInfo />}
                  {activeStep === 2 && (
                    <FarmLocation title='Farm location' subLabel='Tell us the location of your farm.' />
                  )}
                </>
              )}
            </div>
          </div>
        </AppWrapper>
      </main>
    </PersonalDetailsContext.Provider>
  );
};

export default PersonalDetails;
