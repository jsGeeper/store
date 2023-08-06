import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../../assets/logo.png';
import { PAGES } from '../../../router/pages';

interface IAuthScreenWrapperProps {
  children: React.ReactNode;
}

const AuthScreenWrapper: React.FC<IAuthScreenWrapperProps> = ({ children }: IAuthScreenWrapperProps) => {
  return (
    <main className='authWrapper'>
      <div className='authWrapper__image'></div>
      <div className='authWrapper__content'>
        <div className='authWrapper__logo'>
          <Link to={PAGES.ROOT}>
            <img src={Logo} alt='logo' />
          </Link>
        </div>
        <div className='authWrapper__content__inner'>{children}</div>
      </div>
    </main>
  );
};

export default AuthScreenWrapper;
