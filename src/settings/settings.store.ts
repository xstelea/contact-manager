import { createSlice } from '@reduxjs/toolkit';

export const {
  reducer: settingsReducer,
  actions: settingsAction,
} = createSlice({
  name: 'settings',
  initialState: {
    hasInitiated: false,
  },
  reducers: {
    bootstrapApplication: (state) => ({
      ...state,
      hasInitiated: false,
    }),
    bootstrapApplicationSuccess: (state) => ({
      ...state,
      hasInitiated: true,
    }),
  },
});
