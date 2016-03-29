const {
  AppCanvas,
  AppBar,
  IconButton,
  IconStyles,
  FontIcon,
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

  propTypes: {
    board: React.PropTypes.string
  },

  getInitialState() {
    return { open: false };
  },

  getChildContext() {
    return { muiTheme: ThemeManager.getMuiTheme(LightRawTheme) };
  },

  boardChangedHandler(boardName) {
    this.setState({ activeBoard: boardName });
  },

  goHome() {
    this.refs.threads.showList();
    this.refresh();
  },

  refresh() {
    window.scrollTo(0, 0);
    this.refs.threads.refresh();
  },

  render() {
    return (
      <AppCanvas>
        <Toolbar className="fixed-nav-bar">
          <ToolbarGroup firstChild={true} float="left">
            <Boards
              activeBoard={this.props.board}
              onBoardChanged={this.boardChangedHandler} />
          </ToolbarGroup>
          <ToolbarGroup float="right">
            <IconButton onClick={this.goHome}>
              <FontIcon className="material-icons">home</FontIcon>
            </IconButton>
            <IconButton onClick={this.refresh}>
              <FontIcon className="material-icons">autorenew</FontIcon>
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <div className="app-container">
          <Threads activeBoard={this.props.board} ref="threads"/>
        </div>
      </AppCanvas>
    );
  }
});
