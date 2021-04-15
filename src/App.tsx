import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthPage } from './auth/AuthPage';
import { ContactsPage } from './contacts/ContactsPage';
import { settingsAction } from './settings/settings.store';
import { getHasInitiated, getIsAuthenticated } from './store/rootReducer';

const App: FunctionComponent = () => {
  const dispatch = useDispatch();
  const hasInitiated = useSelector(getHasInitiated);
  const isAuthenticated = useSelector(getIsAuthenticated);

  useEffect(() => {
    dispatch(settingsAction.bootstrapApplication());
  }, []);

  return (
    <div className="bg-gray-800 w-screen h-screen text-white text-center flex justify-center">
      {hasInitiated && <>{isAuthenticated ? <ContactsPage /> : <AuthPage />}</>}
    </div>
  );
};

export default App;
