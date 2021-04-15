import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Action } from '@reduxjs/toolkit';
import { StateObservable } from 'redux-observable';
import { authAction } from './auth.store';
import { RootState } from '../store/rootReducer';
import { IEpicDependencies } from '../store/rootEpic';
import { FailReason, StoreKey } from './auth.enums';
import { contactsAction } from '../contacts/contacts.store';
import { IContact } from '../contacts/contact.interface';
import { noop } from '../utils/noop-operator';

export const authEpic = (
  action$: Observable<Action>,
  _: StateObservable<RootState>,
  { authService: { decryptData, getFromLocalStorage } }: IEpicDependencies,
) =>
  action$.pipe(
    filter(authAction.authenticate.match),
    switchMap(({ payload: key }) => {
      try {
        const encrypted = getFromLocalStorage(StoreKey.Contacts);
        if (encrypted) {
          const data = decryptData(key, encrypted);
          const parsed: Record<string, IContact> = JSON.parse(data);
          return [
            authAction.authenticateSuccess(key),
            contactsAction.upsertContacts({
              contacts: parsed,
              updateStore: false,
            }),
            contactsAction.setActiveContact(Object.keys(parsed)[0]),
          ];
        }
        return [authAction.authenticateFail(FailReason.MissingData)];
      } catch (error) {
        return [authAction.authenticateFail(FailReason.WrongPassword)];
      }
    }),
  );

export const createEncryptedStoreEpic = (
  action$: Observable<Action>,
  _: StateObservable<RootState>,
  { authService: { addToLocalStorage, encryptData } }: IEpicDependencies,
) =>
  action$.pipe(
    filter(authAction.createStore.match),
    tap(({ payload: key }) => {
      const encryptedData = encryptData(key, JSON.stringify({}));
      addToLocalStorage(StoreKey.Contacts, encryptedData);
    }),
    noop,
  );
