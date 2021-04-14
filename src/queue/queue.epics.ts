import { Observable, of } from 'rxjs';
import { filter, withLatestFrom, map, exhaustMap } from 'rxjs/operators';
import { Action } from '@reduxjs/toolkit';
import { StateObservable } from 'redux-observable';
import {
  getCurrentInQueue,
  getQueueItems,
  RootState,
} from '../store/rootReducer';
import { queueAction } from './queue.store';
import { noop } from '../utils';

const runNextItemInQueueEpic = (
  action$: Observable<Action>,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    withLatestFrom(state$),
    map(([, state]) => ({
      items: getQueueItems(state),
      current: getCurrentInQueue(state),
    })),
    filter(({ items, current }) => items.length > 0 && !current),
    exhaustMap(() => [queueAction.run()]),
  );

const dispatchCurrentActionEpic = (
  action$: Observable<Action>,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    filter(queueAction.run.match),
    withLatestFrom(state$),
    exhaustMap(([, state]) => {
      const nextAction = state.queue.current?.action;
      if (nextAction) {
        return [nextAction];
      }
      return of([]).pipe(noop);
    }),
  );

const listenToActionCallbacksEpic = (
  action$: Observable<Action<string>>,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    withLatestFrom(state$),
    map(([action, state]) => ({ action, current: getCurrentInQueue(state) })),
    filter(
      ({ action, current }) =>
        !!(current && current.listenFor.includes(action.type)),
    ),
    exhaustMap(() => {
      return [queueAction.run()];
    }),
  );

export default [
  runNextItemInQueueEpic,
  dispatchCurrentActionEpic,
  listenToActionCallbacksEpic,
];
