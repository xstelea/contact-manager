import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { bootstrapApplicationEpic } from '../settings/settings.epics';

export const rootEpic = combineEpics(bootstrapApplicationEpic);

export interface IEpicDependencies {
  getJSON: <T>(
    url: string,
    headers?: Record<string, string | undefined> | undefined,
  ) => Observable<T>;
}

export const dependencies: IEpicDependencies = {
  getJSON: ajax.getJSON,
};
