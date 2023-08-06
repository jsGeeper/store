import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducerState } from '../redux/IRootReducer';
import { initialize, postLogout } from '../redux/slice/auth/authAction';
import { authContext } from '../contexts';
import eventBus from '../utils/event';
import AccessScreen from '../components/access-screen/accessScreen';
const redirectUrl = 'https://marketplace.gogeeper.com';
// const authBaseUrl = 'https://auth.gogeeper.com/oauth/authorize';
const authBaseUrl = 'http://localhost:3000/oauth/authorize';
const rolesToRedirect = ['buyer'];

interface AuthContext {
  children: React.ReactNode;
}

function removeItem(sKey: string, sPath: string, sDomain: string) {
  document.cookie =
    encodeURIComponent(sKey) +
    '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
    (sDomain ? '; domain=' + sDomain : '') +
    (sPath ? '; path=' + sPath : '');
}

const AuthProvider = ({ children }: AuthContext) => {
  const dispatch = useDispatch();
  const [stableCookie, setStableCookie] = useState<any>(document.cookie);

  const { isAuthenticated, user } = useSelector((state: IRootReducerState) => state.auth);

  let newWin: Window | any;

  useEffect(() => {
    if (!isAuthenticated) {
      setInterval(() => {
        setStableCookie(document.cookie);
      }, 1000);
    }
  }, [document.cookie]);

  function openPopup({
    url,
    title,
    w = 1000,
    h = 700,
    eventName
  }: {
    url: string;
    title: string;
    w?: number;
    h?: number;
    eventName: string;
  }) {
    document.onmousedown = focusPopup;
    document.onkeyup = focusPopup;
    document.onmousemove = focusPopup;

    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    newWin = window.open(
      url,
      title,
      `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
    );

    eventBus.emit(eventName, {
      newWin
    });
  }

  function focusPopup() {
    if (!newWin.closed) {
      newWin.focus();
    }
  }

  useEffect(() => {
    function handleCookieChange() {
      const cookies = Object.fromEntries(stableCookie.split('; ').map((c: string) => c.split('=')));

      // Check if user is logged in based on the presence of the session cookie
      if (cookies['accessToken']) {
        dispatch(initialize());
      }
    }

    handleCookieChange();
  }, [stableCookie, newWin, isAuthenticated, Cookies.get('accessToken')]);

  useEffect(() => {
    if (isAuthenticated) {
      if (Cookies.get('firstTimer') || Cookies.get('user_role')) {
        if (rolesToRedirect.includes(user.role)) {
          Cookies.remove('firstTimer');
          Cookies.remove('user_role');
          removeItem('user_role', '/', 'gogeeper.com');
          removeItem('firstTimer', '/', 'gogeeper.com');
          window.location.href = redirectUrl;
        }
      }
    }
  }, [Cookies, isAuthenticated, window]);

  const initiatorID = nanoid(35);
  const fromProduct = 'FaMaaS';

  const accessibleRoles = ['expert', 'farmer'];

  const loginUrl = `${authBaseUrl}/login/fromUmlAssign/${fromProduct}/initiator_id/${initiatorID}`;
  const signupUrl = `${authBaseUrl}/onboarding/fromUmlAssign/${fromProduct}/initiator_id/${initiatorID}`;

  const triggerlogin = () => {
    openPopup({ url: loginUrl, eventName: 'loginAuthTriggerEvt', title: 'gogeeper--login' });
  };

  const triggerSignUp = () => {
    openPopup({ url: signupUrl, eventName: 'signupAuthTriggerEvt', title: 'gogeeper--signup' });
  };

  const triggerLogout = () => {
    function removeItem(sKey: string, sPath: string, sDomain: string) {
      document.cookie =
        encodeURIComponent(sKey) +
        '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
        (sDomain ? '; domain=' + sDomain : '') +
        (sPath ? '; path=' + sPath : '');
    }

    removeItem('accessToken', '/', 'gogeeper.com');
    Cookies.remove('accessToken');
    dispatch(postLogout());
  };

  if (isAuthenticated && !accessibleRoles.includes(user?.role)) {
    return <AccessScreen url={redirectUrl} />;
  }

  return <authContext.Provider value={{ triggerlogin, triggerSignUp, triggerLogout }}>{children}</authContext.Provider>;
};

export default AuthProvider;
