FlowRouter.route('/', {
  action(params) {
    ReactLayout.render(App, { board: 'diy' });
  }
});

FlowRouter.route('/:board', {
  action(params) {
    ReactLayout.render(App, { board: params.board });
  }
});
