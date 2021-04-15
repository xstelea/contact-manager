import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { FailReason } from '../auth/auth.enums';
import { authReducer } from '../auth/auth.store';
import { contactsReducer } from '../contacts/contacts.store';
import { settingsReducer } from '../settings/settings.store';

const rootReducer = combineReducers({
  settings: settingsReducer,
  contacts: contactsReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

const settingsState = (state: RootState) => state.settings;
export const getHasInitiated = createDraftSafeSelector(
  settingsState,
  (state) => state.hasInitiated,
);

export const getIsNewUser = createDraftSafeSelector(
  settingsState,
  (state) => state.isNewUser,
);

const authState = (state: RootState) => state.auth;
export const getIsAuthenticated = createDraftSafeSelector(
  authState,
  (state) => state.isAuthenticated,
);
export const getIsWrongPassword = createDraftSafeSelector(
  authState,
  (state) => state.failReason === FailReason.WrongPassword,
);
export const getEncryptionKey = createDraftSafeSelector(
  authState,
  (state) => state.key,
);

const contactState = (state: RootState) => state.contacts;
export const getContacts = createDraftSafeSelector(
  contactState,
  (state) => state.data,
);
export const getActiveContactId = createDraftSafeSelector(
  contactState,
  (state) => state.activeContact,
);
export const getActiveContact = createDraftSafeSelector(
  getContacts,
  getActiveContactId,
  (contacts, activeId) => ({ id: activeId, values: contacts[activeId] }),
);
export const getSearchQuery = createDraftSafeSelector(
  contactState,
  (state) => state.searchQuery,
);
export const getFilteredContactList = createDraftSafeSelector(
  contactState,
  getSearchQuery,
  (state, searchQuery) =>
    Object.entries(state.data)
      .map(([id, item]) => ({ id, ...item }))
      .filter((item) => {
        const text = Object.values(item).join(' ').toLowerCase();
        return searchQuery === '' ? item : text.includes(searchQuery);
      }),
);
