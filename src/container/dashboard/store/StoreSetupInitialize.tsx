import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
/*
 * ? Local imports
 */
import { AppWrapper } from '../../../components/layouts/app-wrapper';
import StepperComponent from '../../../components/stepper/Stepper';
import {
  getStallCategories,
  getStallList,
  getStallProcessingTime,
  getStallSubCategories,
  getStallUnits
} from '../../../redux/slice/stall/stallActions';
import { StallListingProducts, StallSetupComponent } from '../../../components/dashboard/stall';
import { IRootReducerState } from '../../../redux/IRootReducer';
import { getFromStorage, saveToStorage } from '../../../utils/storageHandler';

type Steps = 0 | 1;

const steps = ['Store setup', 'List products'];

const StoreSetupInitialize = () => {
  const initialStep = 0;

  const [activeStep, setActiveStep] = React.useState<Steps>(initialStep);
  const [categories, setCategories] = React.useState<any>([]);
  const [subCategories, setSubCategories] = React.useState<any>([]);
  const [processingTime, setProcessingTime] = React.useState<any>([]);
  const [units, setUnits] = React.useState<any>([]);

  const { getCategories, getUnits, getSubCategories, getProcessingTime } = useSelector(
    (state: IRootReducerState) => state.stall
  );
  const { user } = useSelector((state: IRootReducerState) => state.auth);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getStallCategories());
    dispatch(getStallUnits());
    dispatch(getStallSubCategories());
    dispatch(getStallProcessingTime());
    dispatch(getStallList());
  }, []);

  React.useEffect(() => {
    if (getCategories.length > 0) {
      setCategories(getCategories);
    }
    if (getUnits.length > 0) {
      setUnits(getUnits);
    }

    if (getProcessingTime.length > 0) {
      setProcessingTime(getProcessingTime);
    }
  }, [getCategories, getUnits, getProcessingTime]);

  const onNextStep = () => {
    switch (activeStep) {
      case 0:
        // saveToStorage('stallSetupStep', 1);
        setActiveStep(1);
        break;
      default:
        setActiveStep(0);
        break;
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Store Setup | Go-Geeper</title>
      </Helmet>
      <main id={'storeInit'}>
        <AppWrapper title={'Store  / Store setup'}>
          <div className='storeInit__wrapper'>
            <div className='storeInit__stepper'>
              <StepperComponent activeStep={activeStep} steps={steps} />
            </div>
            <div className='storeInit__form'>
              {activeStep === 0 && <StallSetupComponent categories={categories} onNextStep={onNextStep} user={user} />}
              {activeStep === 1 && (
                <StallListingProducts
                  user={user}
                  categories={categories}
                  itemUnits={units}
                  processingTime={processingTime}
                />
              )}
            </div>
          </div>
        </AppWrapper>
      </main>
    </React.Fragment>
  );
};

export default StoreSetupInitialize;
