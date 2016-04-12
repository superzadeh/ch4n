import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppCanvas from 'material-ui/lib/app-canvas';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import Styles from 'material-ui/lib/styles';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

import {refreshBoards, goHome, refreshThreads, setCurrentBoard} from './actions/actions';

import Boards from './containers/boards.jsx'
import Threads from './containers/threads.jsx'

const {ThemeManager, LightRawTheme} = Styles;

class App extends Component {

  constructor(props) {
    super(props);
    this.props.dispatch(refreshBoards());
    this.state = { open: false };
  }

  getChildContext() {
    return { muiTheme: ThemeManager.getMuiTheme(LightRawTheme) };
  }

  boardChangedHandler(boardName) {
    this.props.dispatch(setCurrentBoard(boardName));
  }

  goHome() {
    this.props.dispatch(goHome());
  }

  refresh() {
    window.scrollTo(0, 0);
    this.props.dispatch(refreshThreads());
  }

  render() {
    return (
      <AppCanvas>
        <Toolbar className="fixed-nav-bar">
          <ToolbarGroup firstChild={true} float="left">
            <Boards
              activeBoard={this.props.store.currentBoard}
              onBoardChanged={this.boardChangedHandler.bind(this) } />
          </ToolbarGroup>
          <ToolbarGroup float="right">
            <IconButton onClick={this.goHome.bind(this) }>
              <FontIcon className="material-icons">home</FontIcon>
            </IconButton>
            <IconButton onClick={this.refresh.bind(this) }>
              <FontIcon className="material-icons">autorenew</FontIcon>
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <div className="app-container">
          <Threads activeBoard={this.props.store.currentBoard} ref="threads"/>
        </div>
      </AppCanvas>
    );
  }
}

App.propTypes = { board: React.PropTypes.string };
App.childContextTypes = { muiTheme: React.PropTypes.object };

App = connect()(App);

export default App;