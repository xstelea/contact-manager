import { combineEpics } from 'redux-observable';

import { authEpic, createEncryptedStoreEpic } from '../auth/auth.epics';
import { authService } from '../auth/auth.service';
import { updateStoreEpic } from '../contacts/contact.epics';
import { bootstrapApplicationEpic } from '../settings/settings.epics';

export const rootEpic = combineEpics(
  bootstrapApplicationEpic,
  authEpic,
  createEncryptedStoreEpic,
  updateStoreEpic,
);

export interface IEpicDependencies {
  authService: ReturnType<typeof authService>;
}

export const dependencies: IEpicDependencies = { authService: authService() };
