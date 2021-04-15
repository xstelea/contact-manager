import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  hasInitiated: boolean;
  isNewUser: boolean;
}

const initialState: State = {
  hasInitiated: false,
  isNewUser: true,
};

export const {
  reducer: settingsReducer,
  actions: settingsAction,
} = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    bootstrapApplication: (state) => ({
      ...state,
      hasInitiated: false,
    }),
    bootstrapApplicationSuccess: (
      state,
      { payload }: PayloadAction<boolean>,
    ) => ({
      ...state,
      hasInitiated: true,
      isNewUser: payload,
    }),
  },
});
