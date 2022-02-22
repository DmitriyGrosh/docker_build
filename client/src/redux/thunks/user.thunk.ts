import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL, IAxiosRefreshResponse } from '../../shared/api';

export const getRefresh = createAsyncThunk('user/sendUser', async () => {
  const response = await axios.get<IAxiosRefreshResponse>(`${API_URL}/refresh`, { withCredentials: true });

  return response.data;
});
