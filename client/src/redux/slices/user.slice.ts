import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getRefresh } from '../thunks';
import { IAxiosRefreshResponse } from '../../shared/api';

export interface IUser {
  email: string;
  name: string;
  isAuth: boolean;
  pending: boolean;
}

const initialState: IUser = {
  email: '',
  name: '',
  isAuth: false,
  pending: true,
};

export const userSlicer = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getRefresh.pending.type]: (state) => {
      state.pending = true;
    },
    [getRefresh.fulfilled.type]: (state, action: PayloadAction<IAxiosRefreshResponse>) => {
      state.email = action.payload.user.email;
      state.name = action.payload.user.name;
      state.isAuth = true;
      state.pending = false;
    },
    [getRefresh.rejected.type]: (state) => {
      state.pending = false;
      state.isAuth = false;
      state.email = '';
      state.name = '';
    },
  },
});

export default userSlicer.reducer;
