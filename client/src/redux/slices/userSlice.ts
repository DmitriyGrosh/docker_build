import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  email: string;
  name: string;
  isAuth: boolean;
}

const initialState: IUser = {
  email: '',
  name: '',
  isAuth: false,
};

export const userSlicer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isAuth = action.payload.isAuth;
    },
  },
});

export const { setUser } = userSlicer.actions;

export default userSlicer.reducer;
