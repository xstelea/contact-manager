import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Action } from '@reduxjs/toolkit';
import { settingsAction } from './settings.store';

export const bootstrapApplicationEpic = (action$: Observable<Action>) =>
  action$.pipe(
    filter(settingsAction.bootstrapApplication.match),
    map(() => settingsAction.bootstrapApplicationSuccess()),
  );
