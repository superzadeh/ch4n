const {
  AppCanvas,
  AppBar,
  Styles,
  RaisedButton,
  Toolbar,
  ToolbarGroup,
  ToolbarTitle
} = mui;
const {ThemeManager, LightRawTheme} = Styles;

App = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getInitialState() {
    return {open: false, ActiveBoard: "p"};
  },
  getChildContext() {
    return {muiTheme: ThemeManager.getMuiTheme(LightRawTheme)};
  },
  boardChangedHandler(boardName) {
    this.setState({ActiveBoard: boardName});
  },
  render() {
    return (
      <AppCanvas>
        <Toolbar>
          <ToolbarGroup firstChild={true} float="left">
            <Boards ActiveBoard={this.state.ActiveBoard} onBoardChanged={this.boardChangedHandler}/>
          </ToolbarGroup>
        </Toolbar>
        <Threads ActiveBoard={this.state.ActiveBoard}/>
      </AppCanvas>
    );
  }
});

if (Meteor.isClient) {
  Meteor.startup(() => {
    ReactDOM.render(< App />, document.getElementById('react-root'));
  });
}
