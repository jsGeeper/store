import React, { useEffect } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { Loader } from '@gogeepernpm/storybook/lib';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppWrapperContext } from '../../../contexts';
import AppHeader from '../../app-wrapper/AppHeader';
import Logo from '../../../assets/logo.png';
import ShortLogo from '../../../assets/short-logo.png';
import { IconPlaceholder } from '../../icon-placeholder';

import {
  ExpertsIcon,
  Explore,
  ExploreActive,
  FlagIcon,
  InsightIcon,
  JobsIcon,
  LogoutIcon,
  MessageIcon,
  OrderIcon,
  StoreIcon,
  TeamIcon,
  WalletIcon
} from '../../../graphics/dashboard';
import { Seperator } from '../../seperator';
import { Typography } from '@mui/material';
import { PATH_DASHBOARD, PATH_MAIN } from '../../../router/pages';
import { postLogout } from '../../../redux/slice/auth/authAction';
import { IRootReducerState } from '../../../redux/IRootReducer';
import { ROLES } from '../../../utils/roles';
import { boolean } from 'yup';
import { getStallList } from '../../../redux/slice/stall/stallActions';

interface IAppWrapperProps {
  children: React.ReactNode;
  title?: string;
  isLoading?: boolean;
}

const AppWrapper = ({ children, title, isLoading = false }: IAppWrapperProps) => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStallList());
  }, []);

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { user, loading } = useSelector((state: IRootReducerState) => state.auth);
  const {
    listStores: { hasStore }
  } = useSelector((state: IRootReducerState) => state.stall);

  const middleMenu = [
    {
      id: 1,
      label: 'Jobs',
      path: `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.JOBS}`,
      icon: <JobsIcon isActive={location.pathname === `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.JOBS}`} />
    },
    // {
    //   id: 2,
    //   label: 'Experts',
    //   path: `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.EXPERTS}`,
    //   icon: <ExpertsIcon isActive={location.pathname === `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.EXPERTS}`} />
    // },
    {
      id: 3,
      label: 'Messages',
      // path: `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.MESSAGES}`,
      path: `#`,
      icon: <MessageIcon isActive={location.pathname === `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.MESSAGES}`} />
    },
    {
      id: 4,
      label: 'Wallet',
      path: `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.WALLET}`,
      icon: <WalletIcon isActive={location.pathname === `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.WALLET}`} />
    }
  ];

  const expertsMiddleMenu = [
    {
      id: 1,
      label: 'Explore',
      path: `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.EXPLORE}`,
      icon: location.pathname === `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.EXPLORE}` ? <ExploreActive /> : <Explore />
    },
    {
      id: 2,
      label: 'My Jobs',
      path: `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.MY_JOBS}`,
      icon: <JobsIcon isActive={location.pathname === `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.MY_JOBS}`} />
    },
    {
      id: 3,
      label: 'Messages',
      // path: `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.MESSAGES}`,
      path: `#`,
      icon: <MessageIcon isActive={location.pathname === `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.MESSAGES}`} />
    },
    {
      id: 4,
      label: 'Wallet',
      path: `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.WALLET}`,
      icon: <WalletIcon isActive={location.pathname === `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.WALLET}`} />
    }
  ];
  function determineStorePath() {
    return hasStore
      ? `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.STORE}`
      : `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.STORE_SETUP}`;
  }
  const bottomMenu = [
    {
      id: 1,
      label: 'Store',
      path: determineStorePath(),
      icon: <StoreIcon isActive={location.pathname === `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.STORE}`} />
    },
    {
      id: 2,
      label: 'Orders',
      path: `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.ORDERS}`,
      icon: <OrderIcon isActive={location.pathname === `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.ORDERS}`} />
    },
    {
      id: 3,
      label: 'Insight',
      path: `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.INSIGHT}`,
      icon: <InsightIcon isActive={location.pathname === `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.INSIGHT}`} />
    },
    {
      id: 4,
      label: 'Teams',
      path: `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.TEAM}`,
      icon: <TeamIcon isActive={location.pathname === `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.TEAM}`} />
    }
  ];

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const activeClass = (isActive: boolean): string =>
    `nav-items noLine text--md ${isActive ? 'active' : ''} ${isOpen ? 'open' : ''}`;

  return (
    <AppWrapperContext.Provider value={{ isOpen, toggle }}>
      {loading && <Loader loading={loading} />}
      {isLoading && <Loader loading={isLoading} />}
      <div className={`grid-container ${isOpen ? 'is-open' : ''}`}>
        <header className='header'>
          <AppHeader title={title} user={user} />
        </header>
        <aside className='sidenav'>
          <div className='sidenav__controller'>
            <IconPlaceholder onClick={toggle} pointer={true}>
              {!isOpen ? <MdArrowBackIos size={10} fill={'#fff'} /> : <MdArrowForwardIos size={10} fill={'#fff'} />}
            </IconPlaceholder>
          </div>
          <div className='sidenav__header'>
            {!isOpen ? (
              <img src={Logo} alt='logo' className='sidenav__logo' />
            ) : (
              <img src={ShortLogo} alt='logo' className='sidenav__logo' />
            )}
          </div>
          <div className='sidenav__navigation'>
            <div className='sidenav__navigation-topSection'>
              <NavLink
                to={PATH_MAIN.DASHBOARD + PATH_DASHBOARD.GET_STARTED}
                className={({ isActive }) => activeClass(isActive)}
              >
                <div className={`${!isOpen && 'nav-items__icon'}`}>
                  <FlagIcon isActive={location.pathname === `${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.GET_STARTED}`} />
                </div>
                {!isOpen && <span className='nav__item-text'>Get Started</span>}
              </NavLink>
            </div>
            <Seperator />

            <div className='sidenav__navigation-middleSection'>
              <div className='title'>
                {!isOpen && (
                  <Typography variant='h5' component='h5' fontWeight={'500'} color={'#475467'}>
                    Menu
                  </Typography>
                )}
              </div>
              {user.role === ROLES.AGRIC_EXPERT
                ? expertsMiddleMenu.map((item) => {
                    return (
                      <NavLink to={item.path} className={({ isActive }) => activeClass(isActive)} key={item.path}>
                        <div className={`${!isOpen && 'nav-items__icon'}`}>{item.icon}</div>
                        {!isOpen && <span className='nav__item-text'>{item.label}</span>}
                      </NavLink>
                    );
                  })
                : middleMenu.map((item) => {
                    return (
                      <NavLink to={item.path} className={({ isActive }) => activeClass(isActive)} key={item.path}>
                        <div className={`${!isOpen && 'nav-items__icon'}`}>{item.icon}</div>
                        {!isOpen && <span className='nav__item-text'>{item.label}</span>}
                      </NavLink>
                    );
                  })}

              <Seperator />
            </div>

            <div className='sidenav__navigation-bottomSection'>
              <div className='title'>
                {!isOpen && (
                  <Typography variant='h5' component='h5' fontWeight={'500'} color={'#475467'}>
                    Marketplace
                  </Typography>
                )}
              </div>
              {user.role === ROLES.AGRIC_EXPERT
                ? bottomMenu
                    .filter((item) => item.id !== 4)
                    .map((item) => {
                      return (
                        <NavLink to={item.path} className={({ isActive }) => activeClass(isActive)} key={item.path}>
                          <div className={`${!isOpen && 'nav-items__icon'}`}>{item.icon}</div>
                          {!isOpen && <span className='nav__item-text'>{item.label}</span>}
                        </NavLink>
                      );
                    })
                : bottomMenu.map((item) => {
                    return (
                      <NavLink to={item.path} className={({ isActive }) => activeClass(isActive)} key={item.path}>
                        <div className={`${!isOpen && 'nav-items__icon'}`}>{item.icon}</div>
                        {!isOpen && <span className='nav__item-text'>{item.label}</span>}
                      </NavLink>
                    );
                  })}

              <Seperator />
            </div>
          </div>
          {/* <div className='sidenav__footer'>*/}
          {/*  <a*/}
          {/*    className={`nav-items noLine text--md ${isOpen ? 'open' : ''}`}*/}
          {/*    style={{ cursor: 'pointer' }}*/}
          {/*    rel='noopener noreferrer'*/}
          {/*    onClick={() => dispatch(postLogout())}*/}
          {/*  >*/}
          {/*    <div className={`${!isOpen && 'nav-items__icon'}`}>*/}
          {/*      <LogoutIcon />*/}
          {/*    </div>*/}
          {/*    {!isOpen && <span className='nav__item-text'>Log out</span>}*/}
          {/*  </a>*/}
          {/* </div>*/}
        </aside>
        <main className='main' style={{ margin: 0 }}>
          <div className='main-content'>{children}</div>
        </main>
      </div>
    </AppWrapperContext.Provider>
  );
};

export default AppWrapper;
