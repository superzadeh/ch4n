import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import App from '../imports/ui/app.jsx';

FlowRouter.route('/', {
  action(params) {
    mount(App, { board: 'diy' });
  }
});

FlowRouter.route('/:board', {
  action(params) {
    mount(App, { board: params.board });
  }
});
