import { createEpicMiddleware, ofType } from 'redux-observable';
import { Middleware } from 'redux';
import createImmutableStateInvariantMiddleware from 'redux-immutable-state-invariant';
import { configureStore } from '@reduxjs/toolkit';

import { mergeMap, takeUntil } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import rootReducer from './rootReducer';
import { rootEpic, dependencies } from './rootEpic';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const epicMiddleware = createEpicMiddleware({
  dependencies,
});

let middleware: Middleware[] = [epicMiddleware];

if (!IS_PRODUCTION) {
  middleware = [createImmutableStateInvariantMiddleware(), ...middleware];
}

const store = configureStore({
  devTools: { trace: !IS_PRODUCTION },
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

const epic$ = new BehaviorSubject(rootEpic);
// Since we're using mergeMap, by default any new
// epic that comes in will be merged into the previous
// one, unless an EPIC_END action is dispatched first,
// which would cause the old one(s) to be unsubscribed
const hotReloadingEpic = (action$: any, ...rest: any[]) =>
  epic$.pipe(
    mergeMap((epic) =>
      // @ts-ignore
      epic(action$, ...rest).pipe(takeUntil(action$.pipe(ofType('EPIC_END')))),
    ),
  );

if (!IS_PRODUCTION && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
  module.hot.accept('./rootEpic', () => {
    const nextRootEpic = require('./rootEpic').rootEpic;
    store.dispatch({ type: 'EPIC_END' });
    epic$.next(nextRootEpic);
  });
}

epicMiddleware.run(hotReloadingEpic as any);

export default store;
