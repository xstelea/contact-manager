import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IContact } from './contact.interface';

interface State {
  data: Record<string, IContact>;
  activeContact: string;
  searchQuery: string;
}

const initialState: State = { data: {}, activeContact: '', searchQuery: '' };

export const {
  reducer: contactsReducer,
  actions: contactsAction,
} = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    search: (state, action: PayloadAction<string>) => ({
      ...state,
      searchQuery: action.payload,
    }),
    upsertContacts: (
      state,
      {
        payload: { contacts },
      }: PayloadAction<{
        contacts: Record<string, IContact>;
        updateStore: boolean;
      }>,
    ) => ({
      ...state,
      data: { ...state.data, ...contacts },
    }),
    setActiveContact: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      activeContact: payload,
    }),
  },
});
