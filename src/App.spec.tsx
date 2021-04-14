import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import { useRouter } from './hooks/useRouter';

jest.mock('./hooks/useRouter');

it('should render', () => {
  (useRouter as jest.Mock).mockReturnValue({
    query: { locale: 'sv_se' },
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
});
