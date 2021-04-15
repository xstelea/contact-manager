import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Action } from '@reduxjs/toolkit';
import { StateObservable } from 'redux-observable';
import { settingsAction } from './settings.store';
import { IEpicDependencies } from '../store/rootEpic';
import { RootState } from '../store/rootReducer';
import { StoreKey } from '../auth/auth.enums';

export const bootstrapApplicationEpic = (
  action$: Observable<Action>,
  _: StateObservable<RootState>,
  { authService: { getFromLocalStorage } }: IEpicDependencies,
) =>
  action$.pipe(
    filter(settingsAction.bootstrapApplication.match),
    map(() => {
      const data = getFromLocalStorage(StoreKey.Contacts);
      return settingsAction.bootstrapApplicationSuccess(!data);
    }),
  );
