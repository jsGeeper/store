import axios from 'axios';
import Cookies from 'js-cookie';

const setAuthorization = () => {
  const accessToken = Cookies.get('accessToken');

  if (accessToken) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }

  return accessToken;
};

export default setAuthorization;
