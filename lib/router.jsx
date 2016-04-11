import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { createStore } from 'redux';
import App from '../imports/ui/app.jsx';
import chanApp from '../imports/ui/reducers/chanApp.js';

let store = createStore(chanApp);

FlowRouter.route('/', {
  action(params) {
    mount(App, { board: 'diy', store: store });
  }
});

FlowRouter.route('/:board', {
  action(params) {
    mount(App, { board: params.board, store: store });
  }
});
