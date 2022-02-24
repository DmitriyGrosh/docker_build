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
  reducers: {
    stopPending: (state) => {
      state.pending = false;
    },
    setLogin: (state, action: PayloadAction<{ name: string; email: string }>) => {
      const { email, name } = action.payload;

      return {
        ...state,
        email,
        name,
        isAuth: true,
        pending: false,
      };
    },
  },
  extraReducers: {
    [getRefresh.pending.type]: (state) => {
      state.pending = true;
    },
    [getRefresh.fulfilled.type]: (state, action: PayloadAction<IAxiosRefreshResponse>) => {
      const { email, name } = action.payload.user;

      return {
        ...state,
        email,
        name,
        isAuth: true,
        pending: false,
      };
    },
    [getRefresh.rejected.type]: (state) => {
      return {
        ...state,
        pending: false,
        isAuth: false,
        email: '',
        name: '',
      };
    },
  },
});

export const { stopPending, setLogin } = userSlicer.actions;

export default userSlicer.reducer;
