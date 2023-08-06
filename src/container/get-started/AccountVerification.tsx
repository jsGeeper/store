import React from 'react';
import { useSelector } from 'react-redux';
import Helmet from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { AppWrapper } from '../../components/layouts/app-wrapper';
import { UserVerificationContext } from '../../contexts';
import { IRootReducerState } from '../../redux/IRootReducer';
import { ROLES } from '../../utils/roles';
import StepperComponent from '../../components/stepper/Stepper';
import { IDUpload, ConfirmSchedule, ScheduledCall } from '../../components/get-started/verification/screens/index';
import { PATH_DASHBOARD, PATH_MAIN } from '../../router/pages';

const otherRole = ['Account verification'];
const expertRole = ['ID upload', 'Schedule verification call', 'Confirm schedule'];

const AccountVerification: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const { user } = useSelector((state: IRootReducerState) => state.auth);
  const navigate = useNavigate();

  const onNextStep = () => {
    if (user.role === ROLES.AGRIC_EXPERT) {
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
    } else navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.GET_STARTED}`);
  };

  const onCancel = () => {
    navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.GET_STARTED}`);
  };
  return (
    <UserVerificationContext.Provider value={{ activeStep, onNextStep, onCancel }}>
      <Helmet>
        <title>KYC Verification | Go-Geeper</title>
      </Helmet>
      <main id='kyc'>
        <AppWrapper title={'Get Started'}>
          <div className='kyc__wrapper'>
            <div className='kyc__stepper'>
              <StepperComponent
                activeStep={activeStep}
                steps={user.role === ROLES.AGRIC_EXPERT ? expertRole : otherRole}
              />
            </div>
            <div className='kyc__form'>
              {user.role === ROLES.AGRIC_EXPERT ? (
                <>
                  {activeStep === 0 && (
                    <IDUpload title='ID upload' subLabel='Upload required documents to help us verify your profile' />
                  )}
                  {activeStep === 1 && <ScheduledCall userID={user.id} />}
                  {activeStep === 2 && <ConfirmSchedule user={user} />}
                </>
              ) : (
                <>
                  {activeStep === 0 && (
                    <IDUpload
                      title='Account verification'
                      subLabel='Upload the required documents to help us verify your account.'
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </AppWrapper>
      </main>
    </UserVerificationContext.Provider>
  );
};

export default AccountVerification;
