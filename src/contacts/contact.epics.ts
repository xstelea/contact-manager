import { Observable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { Action } from '@reduxjs/toolkit';
import { StateObservable } from 'redux-observable';
import { contactsAction } from './contacts.store';
import { IEpicDependencies } from '../store/rootEpic';
import { getContacts, getEncryptionKey, RootState } from '../store/rootReducer';
import { StoreKey } from '../auth/auth.enums';

export const updateStoreEpic = (
  action$: Observable<Action>,
  state$: StateObservable<RootState>,
  { authService: { encryptData, addToLocalStorage } }: IEpicDependencies,
) =>
  action$.pipe(
    filter(contactsAction.upsertContacts.match),
    filter((action) => action.payload.updateStore),
    withLatestFrom(state$),
    map(([{ payload }, state]) => {
      const contacts = getContacts(state);
      const key = getEncryptionKey(state);
      const encryptedData = encryptData(
        key,
        JSON.stringify({ ...contacts, ...payload.contacts }),
      );
      addToLocalStorage(StoreKey.Contacts, encryptedData);
      return contactsAction.setActiveContact(Object.keys(payload.contacts)[0]);
    }),
  );
