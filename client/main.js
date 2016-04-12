import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import App from '../imports/ui/app';
import rootReducer from '../imports/ui/reducers/rootReducer';
import * as Actions from '../imports/ui/actions/actions';

Meteor.startup(() => {
  const loggerMiddleware = createLogger();

  let store = createStore(
    rootReducer,
    compose(
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  store.dispatch(Actions.fetchBoards());

  render(
    <Provider store={store}>
      <App />
    </Provider>, document.getElementById('render-target'));
});

injectTapEventPlugin();