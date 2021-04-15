import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FailReason } from './auth.enums';

interface State {
  isAuthenticated: boolean;
  key: string;
  failReason: FailReason;
}

const initialState: State = {
  isAuthenticated: false,
  key: '',
  failReason: FailReason.None,
};

export const { reducer: authReducer, actions: authAction } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    createStore: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      key: payload,
      isAuthenticated: true,
    }),
    authenticate: (state, _: PayloadAction<string>) => ({
      ...state,
      failReason: FailReason.None,
    }),
    authenticateSuccess: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      isAuthenticated: true,
      key: payload,
      failReason: FailReason.None,
    }),
    authenticateFail: (state, { payload }: PayloadAction<FailReason>) => ({
      ...state,
      failReason: payload,
    }),
  },
});
