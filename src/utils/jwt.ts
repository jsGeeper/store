import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded: any = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    Cookies.set('accessToken', accessToken, {
      expires: 1
      // sameSite: 'strict',
      // Domain: 'gogeeper.com',
      // priority: 'high',
      // secure: false,
      // path: '/'
    });
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    Cookies.remove('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
