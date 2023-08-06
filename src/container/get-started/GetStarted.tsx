import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppWrapper } from '../../components/layouts/app-wrapper';
import User from '../../assets/user.png';
import Badge from '../../assets/badge.png';
import Card from '../../assets/card.png';
import Experience from '../../assets/experience.png';
import { SimpleButton } from '../../components/button/SimpleButton';
import { IRootReducerState } from '../../redux/IRootReducer';
import { ROLES } from '../../utils/roles';
import { PATH_MAIN, PATH_DASHBOARD } from '../../router/pages';
import {
  getAccountDetailsStatus,
  getAccountPaymentStatus,
  getAccountVerificationStatus,
  getExperiencesStatus
} from '../../redux/slice/get-started/getStartedAction';

const options = [
  {
    id: 0,
    title: 'Enter personal details',
    subLabel: 'We would like to know more about you and your farm.',
    icon: User
  },
  {
    id: 1,
    title: 'Add level of experience',
    subLabel: 'Add all the experience you have in the agricultural industry.',
    icon: Experience
  },
  {
    id: 2,
    title: 'Account verification',
    subLabel: 'Upload valid documents for us to verify your account.',
    icon: Badge
  },
  {
    id: 3,
    title: 'Add payment method',
    subLabel: 'Add your preferred payment method to complete your transactions.',
    icon: Card
  }
];

const GetStarted: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: IRootReducerState) => state.auth);
  const { accountDetailsStatus, accountVerificationStatus, accountPaymentStatus, accountExperiencesStatus } =
    useSelector((state: IRootReducerState) => state.getStarted);

  const [paymentStatus, setPaymentStatus] = React.useState<any[]>([]);
  const [verificationStatus, setVerificationStatus] = React.useState<any[]>([]);
  const [detailsStatus, setDetailsStatus] = React.useState<any[]>([]);
  const [experiencesStatus, setExperiencesStatus] = React.useState<any[]>([]);

  const roleMgr = user.role === ROLES.AGRIC_EXPERT ? 'agricExpert' : 'farmer';

  useEffect(() => {
    if (user.role !== ROLES.AGRIC_EXPERT) {
      dispatch(getAccountPaymentStatus({ id: user.id, role: roleMgr }));
    }
    dispatch(getAccountDetailsStatus({ id: user.id, role: roleMgr }));
    dispatch(getAccountVerificationStatus({ id: user.id, role: roleMgr }));
    dispatch(getExperiencesStatus({ id: user.id }));
  }, [user]);

  useEffect(() => {
    if (accountPaymentStatus) {
      setPaymentStatus(accountPaymentStatus);
    }

    if (accountVerificationStatus) {
      setVerificationStatus(accountVerificationStatus);
    }

    if (accountDetailsStatus) {
      setDetailsStatus(accountDetailsStatus);
    }
    if (accountExperiencesStatus) {
      setExperiencesStatus(accountExperiencesStatus);
    }
  }, [accountPaymentStatus, accountVerificationStatus, accountDetailsStatus, accountExperiencesStatus]);

  return (
    <main id='getStarted' style={{ margin: 0 }}>
      <Helmet>
        <title>Get Started | Go-Geeper</title>
      </Helmet>
      <AppWrapper title={'Get Started'}>
        <section className='getStarted__content'>
          <div className='getStarted__content-header'>
            <h1 className='getStarted__title'>Welcome to Go-Geeper</h1>
            <p className='getStarted__subtitle text--md noLine'>
              Complete your {user.role === ROLES.AGRIC_EXPERT ? "Expert's" : "Farmer's"} profile to enjoy all available
              features.
            </p>
          </div>
          <div className='getStarted__row'>
            {user.role === ROLES.AGRIC_EXPERT
              ? options
                  .filter((item) => item.id !== 3)
                  .map((ele) => {
                    const { id, icon, title, subLabel } = ele;
                    return (
                      <div key={id} className='getStarted__col'>
                        <div className='getStarted__col-container'>
                          <img src={icon} alt={title} className='getStarted__col-icon' />

                          <h4 className='getStarted__col-title'>{title}</h4>
                          <p className='getStarted__col-subtitle'>{subLabel}</p>
                          {id === 0 && (
                            <>
                              {detailsStatus.length < 1 && (
                                <SimpleButton
                                  label='Enter details'
                                  onClick={() => navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.PERSONAL_DETAILS}`)}
                                />
                              )}
                              {detailsStatus.filter((status) => status.status === 'inprogress').length > 0 && (
                                <SimpleButton
                                  label='In Progress'
                                  className='btn-outline-grey'
                                  onClick={() => navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.PERSONAL_DETAILS}`)}
                                />
                              )}
                              {detailsStatus.filter((status) => status.status === 'completed').length > 0 && (
                                <SimpleButton label='Completed' style={{ margin: '0.9rem 0' }} disabled={true} />
                              )}
                            </>
                          )}

                          {id === 1 && (
                            <>
                              {experiencesStatus.length < 1 && (
                                <SimpleButton
                                  label='Add experience'
                                  onClick={() => navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.EXPERT_EXPERIENCE}`)}
                                />
                              )}
                              {experiencesStatus.filter((status) => status.status === 'inprogress').length > 0 && (
                                <SimpleButton
                                  label='In Progress'
                                  className='btn-outline-grey'
                                  onClick={() => navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.EXPERT_EXPERIENCE}`)}
                                />
                              )}
                              {experiencesStatus.filter((status) => status.status === 'completed').length > 0 && (
                                <SimpleButton label='Completed' style={{ margin: '0.9rem 0' }} disabled={true} />
                              )}
                            </>
                          )}
                          {id === 2 && (
                            <SimpleButton
                              label='Start process'
                              onClick={() => navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.ACCOUNT_VERIFICATION}`)}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })
              : options
                  .filter((item) => item.id !== 1)
                  .map((ele) => {
                    const { id, icon, title, subLabel } = ele;
                    return (
                      <div key={id} className='getStarted__col'>
                        <div className='getStarted__col-container'>
                          <img src={icon} alt={title} className='getStarted__col-icon' />

                          <h4 className='getStarted__col-title'>{title}</h4>
                          <p className='getStarted__col-subtitle'>{subLabel}</p>
                          {id === 0 && (
                            <>
                              {detailsStatus.length < 1 && (
                                <SimpleButton
                                  label='Enter details'
                                  onClick={() => navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.PERSONAL_DETAILS}`)}
                                />
                              )}
                              {detailsStatus.filter((status) => status.status === 'inprogress').length > 0 && (
                                <SimpleButton
                                  label='In Progress'
                                  className='btn-outline-grey'
                                  onClick={() => navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.PERSONAL_DETAILS}`)}
                                />
                              )}
                              {detailsStatus.filter((status) => status.status === 'completed').length > 0 && (
                                <SimpleButton label='Completed' style={{ margin: '0.9rem 0' }} disabled={true} />
                              )}
                            </>
                          )}
                          {id === 2 && (
                            <>
                              {verificationStatus.length < 1 && (
                                <SimpleButton
                                  label='Start process'
                                  onClick={() =>
                                    navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.ACCOUNT_VERIFICATION}`)
                                  }
                                />
                              )}
                              {verificationStatus.filter((status) => status.status === 'inprogress').length > 0 && (
                                <SimpleButton
                                  label='In Progress'
                                  className='btn-outline-grey'
                                  style={{ margin: '0.9rem 0' }}
                                  disabled={true}
                                />
                              )}
                              {verificationStatus.filter((status) => status.status === 'completed').length > 0 && (
                                <SimpleButton label='Completed' style={{ margin: '0.9rem 0' }} disabled={true} />
                              )}
                            </>
                          )}
                          {id === 3 && (
                            <>
                              {paymentStatus.length < 1 && (
                                <SimpleButton
                                  label='Add method'
                                  onClick={() => navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.PAYMENT_METHOD}`)}
                                />
                              )}

                              {paymentStatus.filter((status) => status.status === 'completed').length > 0 && (
                                <SimpleButton label='Completed' style={{ margin: '0.9rem 0' }} disabled={true} />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
          </div>
        </section>
      </AppWrapper>
    </main>
  );
};

export default GetStarted;
