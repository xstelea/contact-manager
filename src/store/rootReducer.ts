import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { queueReducer } from '../queue/queue.store';
import { settingsReducer } from '../settings/settings.store';

const rootReducer = combineReducers({
  settings: settingsReducer,
  queue: queueReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

const settingsState = (state: RootState) => state.settings;
export const getHasInitiated = createDraftSafeSelector(
  settingsState,
  (state) => state.hasInitiated,
);

const queueState = (state: RootState) => state.queue;
export const getQueueItems = createDraftSafeSelector(
  queueState,
  (state) => state.items,
);
export const getCurrentInQueue = createDraftSafeSelector(
  queueState,
  (state) => state.current,
);
