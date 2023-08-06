import React from 'react';
import { useNavigate } from 'react-router-dom';
import Helmet from 'react-helmet';
import { AppWrapper } from '../../components/layouts/app-wrapper';
import { PATH_DASHBOARD, PATH_MAIN } from '../../router/pages';
import StepperComponent from '../../components/stepper/Stepper';
import { PaymentMethodComponent } from '../../components/get-started/payment-method';

const step = ['Payment option'];
const PaymentMethod: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const navigate = useNavigate();

  const onCancel = () => {
    navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.GET_STARTED}`);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Payment Option | Go-Geeper</title>
      </Helmet>
      <main id='paymentMethod'>
        <AppWrapper title={'Get Started'}>
          <div className='paymentMethod__wrapper'>
            <div className='paymentMethod__stepper'>
              <StepperComponent steps={step} activeStep={activeStep} />
            </div>
            <div className='paymentMethod__form'>
              <PaymentMethodComponent onClose={onCancel} />
            </div>
          </div>
        </AppWrapper>
      </main>
    </React.Fragment>
  );
};

export default PaymentMethod;
