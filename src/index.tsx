import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, HashRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import { MainPage } from './pages/MainPage';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App>
        <main>
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
          </Switch>
        </main>
      </App>
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);
