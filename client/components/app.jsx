const {
  AppCanvas,
  AppBar,
  Styles,
  RaisedButton,
  Toolbar,
  ToolbarGroup,
  ToolbarTitle
} = mui;
const {ThemeManager, DarkRawTheme} = Styles;

App = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getInitialState() {
    var board = window.location.hash
      ? window.location.hash.replace("#", "")
      : "biz";
    return {open: false, activeBoard: board};
  },
  getChildContext() {
    return {muiTheme: ThemeManager.getMuiTheme(DarkRawTheme)};
  },
  boardChangedHandler(boardName) {
    this.setState({activeBoard: boardName});
  },
  render() {
    return (
      <AppCanvas>
        <Toolbar>
          <ToolbarGroup firstChild={true} float="left">
            <Boards activeBoard={this.state.activeBoard} onBoardChanged={this.boardChangedHandler}/>
          </ToolbarGroup>
        </Toolbar>
        <Threads activeBoard={this.state.activeBoard}/>
      </AppCanvas>
    );
  }
});

if (Meteor.isClient) {
  Meteor.startup(() => {
    ReactDOM.render(< App />, document.getElementById('react-root'));
  });
}
