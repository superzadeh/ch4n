import React, { Component } from 'react';

import AppCanvas from 'material-ui/lib/app-canvas';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import Styles from 'material-ui/lib/styles';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

import injectTapEventPlugin from 'react-tap-event-plugin';

const {ThemeManager, LightRawTheme} = Styles;

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  getChildContext() {
    return { muiTheme: ThemeManager.getMuiTheme(LightRawTheme) };
  }

  boardChangedHandler(boardName) {
    this.setState({ activeBoard: boardName });
  }

  goHome() {
    this.refs.threads.showList();
    this.refresh();
  }

  refresh() {
    window.scrollTo(0, 0);
    this.refs.threads.refresh();
  }

  render() {
    return (
      <AppCanvas>
        <Toolbar className="fixed-nav-bar">
          <ToolbarGroup firstChild={true} float="left">
            <Boards
              activeBoard={this.props.board}
              onBoardChanged={this.boardChangedHandler.bind(this)} />
          </ToolbarGroup>
          <ToolbarGroup float="right">
            <IconButton onClick={this.goHome.bind(this)}>
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
}

App.propTypes = { board: React.PropTypes.string };
App.defaultProps = { board: 'diy' };
App.childContextTypes = { muiTheme: React.PropTypes.object };

injectTapEventPlugin();
