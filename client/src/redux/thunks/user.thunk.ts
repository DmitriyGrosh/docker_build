import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL, IAxiosRefreshResponse } from '../../shared/api';

export const getRefresh = createAsyncThunk('user/getRefresh', async () => {
  const response = await axios.get<IAxiosRefreshResponse>(`${API_URL}/refresh`, { withCredentials: true });

  localStorage.setItem('token', response.data.accessToken);

  return response.data;
});
