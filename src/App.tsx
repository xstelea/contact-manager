import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from './hooks';
import { settingsAction } from './settings/settings.store';

const App: FunctionComponent = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter<{ locale: string }>();

  useEffect(() => {
    dispatch(settingsAction.bootstrapApplication());
  }, []);

  return <>{children}</>;
};

export default App;
