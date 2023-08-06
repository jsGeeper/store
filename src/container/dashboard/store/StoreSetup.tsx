import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '@mui/material';
/*
 * ? Local imports
 */
import { AppWrapper } from '../../../components/layouts/app-wrapper';
import ShopImg from '../../../assets/store-icon.png';
import { SimpleButton } from '../../../components/button/SimpleButton';
import { postAcceptAgreement } from '../../../redux/slice/stall/stallActions';
import { IRootReducerState } from '../../../redux/IRootReducer';
import { PATH_DASHBOARD, PATH_MAIN } from '../../../router/pages';

const StoreSetup = () => {
  const [checked, setChecked] = useState<'0' | '1'>('0');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: IRootReducerState) => state.auth);

  const handleSubmit = useCallback(async () => {
    await dispatch(postAcceptAgreement({ id: user.id, agree: checked }));
    navigate(`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.STORE_SETUP_INITIALIZE}`);
  }, [checked, user.id]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Store | Go-Geeper</title>
      </Helmet>
      <main id='storeSetup'>
        <AppWrapper title={'Store'}>
          <div className='setup__wrapper'>
            <div className='setup__wrapper-content'>
              <div className='content'>
                <img src={ShopImg} alt='store' />
                <span className='title'>Open a Go-Geeper Store in 3 Easy Steps</span>
                <span className='subtitle'>
                  Reach millions of consumers every day by selling your products on the Go-Geeper’s marketplace.
                </span>
                <SimpleButton label={'Open Store'} disabled={checked === '0'} onClick={handleSubmit} />
                <Link to={'#'} className='cta-text'>
                  Learn more about Go-Geeper stores
                </Link>
              </div>
            </div>
            <div className='setup__wrapper-footer'>
              <Checkbox
                checked={checked === '1'}
                onChange={() => setChecked(checked === '1' ? '0' : '1')}
                sx={{
                  '& .MuiSvgIcon-root': { fontSize: 24 },
                  '&.Mui-checked': {
                    color: '#039855'
                  },
                  marginLeft: '-1rem'
                }}
              />
              <span>
                I accept Go-Geeper&apos;s{' '}
                <Link to={'#'} className={'link'}>
                  Sellers Policy
                </Link>{' '}
                and{' '}
                <Link to={'#'} className={'link'}>
                  Payments Policy,
                </Link>{' '}
                as well as our{' '}
                <Link to={'#'} className={'link'}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to={'#'} className={'link'}>
                  Privacy Policy
                </Link>
                .
              </span>
            </div>
          </div>
        </AppWrapper>
      </main>
    </React.Fragment>
  );
};

export default StoreSetup;
