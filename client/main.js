import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from '../imports/ui/app';
import chanApp from '../imports/ui/reducers/chanApp';
import * as Actions from '../imports/ui/actions/actions';

Meteor.startup(() => {
  let store = createStore(chanApp);

  render(
    <Provider store={store} >
      <App />
    </Provider>, document.getElementById('render-target'));
  injectTapEventPlugin();
});
