import axios, { AxiosRequestConfig } from 'axios';

export interface IAxiosRefreshResponse {
  refreshToken: string;
  accessToken: string;
}

export const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

// eslint-disable-next-line consistent-return
api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

    return config;
  }
});

api.interceptors.response.use(
  (config) => config,
  // eslint-disable-next-line consistent-return
  async (error) => {
    try {
      const originalRequest = error.config;
      if (error.response.status === 401) {
        const response = await axios.get<IAxiosRefreshResponse>(`${API_URL}/refresh`, { withCredentials: true });

        localStorage.setItem('token', response.data.accessToken);

        return api.request(originalRequest);
      }
    } catch (e) {
      console.log('==========>e', e);
    }
  },
);

export default api;
