const {AppCanvas, AppBar, Styles, RaisedButton} = mui;
const {ThemeManager, LightRawTheme} = Styles;

App = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getInitialState() {
    return {open: false};
  },
  getChildContext() {
    return {muiTheme: ThemeManager.getMuiTheme(LightRawTheme)};
  },
  handleToggle() {
    this.setState({
      open: !this.state.open
    });
  },
  render() {
    return (
      <AppCanvas>
        <AppBar title="ch4n" onLeftIconButtonTouchTap={this.handleToggle}/>
        <Boards open={this.state.open} handleToggle={this.handleToggle}/>
        <div style={{
          padding: '80px'
        }}>
          <Threads/>
        </div>
      </AppCanvas>
    );
  }
});

if (Meteor.isClient) {
  Meteor.startup(() => {
    ReactDOM.render(< App />, document.getElementById('react-root'));
  });
}
