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

import {requestBoards, goHome, requestThreads, setCurrentBoard} from './actions/actions';

import Boards from './containers/boards.jsx'
import Threads from './containers/threads.jsx'

const {ThemeManager, LightRawTheme} = Styles;

class App extends Component {

  constructor(props) {
    super(props);
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

  render() {
    return (
      <AppCanvas>
        <Toolbar className="fixed-nav-bar">
          <ToolbarGroup firstChild={true} float="left">
            <Boards
              activeBoard={this.props.currentBoard}
              onBoardChanged={this.boardChangedHandler.bind(this) } />
          </ToolbarGroup>
          <ToolbarGroup float="right">
            <IconButton onClick={this.goHome.bind(this) }>
              <FontIcon className="material-icons">home</FontIcon>
            </IconButton>
            <IconButton onClick={this.props.refresh }>
              <FontIcon className="material-icons">autorenew</FontIcon>
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <div className="app-container">
          <Threads activeBoard={this.props.currentBoard} ref="threads"/>
        </div>
      </AppCanvas>
    );
  }
}

App.propTypes = { board: React.PropTypes.string };
App.childContextTypes = { muiTheme: React.PropTypes.object };

const mapStateToProps = (state) => {
  return {
    currentBoard: state.boards.current
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    refresh: () => {
      window.scrollTo(0, 0);
      dispatch(requestThreads());
    }
  }
};
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;