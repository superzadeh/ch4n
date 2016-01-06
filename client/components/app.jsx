const {AppCanvas, AppBar, Styles, RaisedButton, DatePicker} = mui;
const {ThemeManager, LightRawTheme} = Styles;

App = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {muiTheme: ThemeManager.getMuiTheme(LightRawTheme)};
  },

  render() {
    return (
      <AppCanvas>
        <AppBar title="ch4n"/>
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
