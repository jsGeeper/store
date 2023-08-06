import axios, { AxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://staging.gogeeper.co.uk/api/v1'
});

// Function to set the token in the request headers
function retrieveToken() {
  const getCookie = (name: string) => {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  };

  // Get the access token from the cookie
  const accessToken = getCookie('accessToken');
  return accessToken;
}

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${retrieveToken()}`;

class APIClient<T, K = undefined> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  //  get all data....
  getAll = () => {
    return axiosInstance.get<T[]>(this.endpoint).then((response) => response.data);
  };
  //   create single data....
  post = (data: K, config?: AxiosRequestConfig) => {
    return axiosInstance.post<T>(this.endpoint, data, config).then((response) => response.data);
  };
  //   create single data....
  put = (data: K, config?: AxiosRequestConfig) => {
    return axiosInstance.put<T>(this.endpoint, data).then((response) => response.data);
  };

  //   get single item
  get = () => {
    return axiosInstance.get<T>(this.endpoint).then((response) => response.data);
  };
}

export { APIClient };
