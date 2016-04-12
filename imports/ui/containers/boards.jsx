import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';

import * as Actions from '../actions/actions';

class Boards extends Component {
  constructor(props) {
    super(props);
    this.handleBoardChange = this.handleBoardChange.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(Actions.fetchBoards());
  }

  handleBoardChange(e, index, value) {
    e.preventDefault();

    window.scrollTo(0, 0);
    this.props.dispatch(Actions.setCurrentBoard(value));
  }

  render() {
    return (
      <DropDownMenu value={this.props.activeBoard} onChange={this.handleBoardChange}>
        {this.props.boards.map((board, i) => {
          return (
            <MenuItem value={board.board} primaryText={board.title} key={i}></MenuItem>
          );
        }) }
      </DropDownMenu>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    activeBoard: state.boards.current,
    boards: state.boards.list
  };
};

export default connect(mapStateToProps)(Boards);
