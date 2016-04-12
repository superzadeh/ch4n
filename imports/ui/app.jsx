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

import {fetchThreads, goHome, setCurrentBoard} from './actions/actions';

import Boards from './containers/boards.jsx'
import Threads from './containers/threads.jsx'

const {ThemeManager, LightRawTheme} = Styles;

class App extends Component {

  constructor(props) {
    super(props);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentBoard !== this.props.currentBoard) {
      const { dispatch, selectedSubreddit } = nextProps
      dispatch(fetchThreads(nextProps.currentBoard));
    }
  }

  getChildContext() {
    return { muiTheme: ThemeManager.getMuiTheme(LightRawTheme) };
  }

  goHome() {
    this.props.dispatch(goHome());
  }

  handleRefresh(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
    this.props.dispatch(fetchThreads(this.props.currentBoard));
  }

  render() {
    return (
      <AppCanvas>
        <Toolbar className="fixed-nav-bar">
          <ToolbarGroup firstChild={true} float="left">
            <Boards
              activeBoard={this.props.currentBoard} />
          </ToolbarGroup>
          <ToolbarGroup float="right">
            <IconButton onClick={this.goHome}>
              <FontIcon className="material-icons">home</FontIcon>
            </IconButton>
            <IconButton onClick={this.handleRefresh}>
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

export default connect(mapStateToProps)(App);