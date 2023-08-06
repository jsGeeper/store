import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export class ClientRequestHandler {
  constructor(private readonly apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  public async get(url: string, params?: any) {
    return await axios.get(`${this.apiUrl}${url}`, params);
  }

  public async post(url: string, data?: any, config?: any) {
    return await axios.post(`${this.apiUrl}${url}`, data, config);
  }

  public async put(url: string, data?: any) {
    return await axios.put(`${this.apiUrl}${url}`, data);
  }

  public async delete(url: string, data?: any) {
    return await axios.delete(`${this.apiUrl}${url}`, data);
  }

  public async patch(url: string, data?: any) {
    return await axios.patch(`${this.apiUrl}${url}`, data);
  }

  public async head(url: string, data?: any) {
    return await axios.head(`${this.apiUrl}${url}`, data);
  }

  public async options(url: string, data?: any) {
    return await axios.options(`${this.apiUrl}${url}`, data);
  }
}
