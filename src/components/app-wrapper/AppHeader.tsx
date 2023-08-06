import React, { useCallback } from 'react';
import { Typography, Popover } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import NotifIcon from '../../assets/bell.png';
import User from '../../assets/svg/user.svg';
import { Seperator } from '../seperator';
import { formatName } from '../../utils/userUtil';
import { postLogout, switchRole } from '../../redux/slice/auth/authAction';
import { ROLES } from '../../utils/roles';
import { PATH_DASHBOARD, PATH_MAIN } from '../../router/pages';
import { useGlobalAuth } from '../../hooks/useGlobalAuth';

interface IAppWrapperProps {
  title?: string;
  user: {
    firstName: string;
    lastName: string;
    role: string;
  };
}

const AppHeader = ({ title, user }: IAppWrapperProps) => {
  // const {} = useSwitchRole(user.role);
  // const {} = useRoles();
  const dispatch = useDispatch();
  const { triggerLogout } = useGlobalAuth();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [role, setRole] = React.useState<string>(user.role);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleSwitchRole = useCallback(
    (role: string) => {
      dispatch(switchRole({ role }));
      handleClose();
    },
    [dispatch, role]
  );

  React.useEffect(() => {
    setRole(user.role);
  }, [user.role]);

  return (
    <div className='appHeader'>
      <div className='appHeader__title'>
        <Typography variant='h5' fontWeight={'bold'}>
          {title}
        </Typography>
      </div>
      <div className='appHeader__nav'>
        <Link to='#' className='appHeader__nav--notification'>
          <img src={NotifIcon} alt='notification' />
        </Link>
        <button className='appHeader__nav__user' aria-describedby={id} onClick={handleClick}>
          <img src={User} alt='user' className='appHeader__nav__user-avatar' />
          <div className='appHeader__nav__user-details'>
            <Typography variant='h5' fontWeight={'bold'} textTransform={'capitalize'}>
              {formatName(user)}
            </Typography>
            <Typography variant='h6' fontWeight={'400'} color={'#475467'} textTransform={'capitalize'}>
              {user.role}
            </Typography>
          </div>
          <div className='caret'>{open ? <BsChevronUp size={12} /> : <BsChevronDown size={12} />}</div>
        </button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          classes={{
            paper: 'appHeader__nav__popover'
          }}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
        >
          <div className='appHeader__nav__popover-content'>
            <a
              className='appHeader__nav__popover-content__item'
              onClick={() => handleSwitchRole(role === ROLES.FARMER ? ROLES.AGRIC_EXPERT : ROLES.FARMER)}
            >
              {user.role === ROLES.FARMER ? 'Switch to Expert' : `Switch to Farmer`}
            </a>
            <Seperator />
            <div className='appHeader__nav__popover-content-menuWrap'>
              <Link to='#' className='appHeader__nav__popover-content__item'>
                Visit our website
              </Link>
              <Link
                to={`${PATH_MAIN.DASHBOARD}${PATH_DASHBOARD.PROFILE_SETTINGS}`}
                className='appHeader__nav__popover-content__item'
              >
                Account settings
              </Link>
              <Link to='#' className='appHeader__nav__popover-content__item'>
                Support
              </Link>
            </div>
            <Seperator />
            <a
              className='appHeader__nav__popover-content__item'
              rel='noopener noreferrer'
              onClick={triggerLogout}
              style={{ cursor: 'pointer' }}
            >
              Logout
            </a>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default AppHeader;
