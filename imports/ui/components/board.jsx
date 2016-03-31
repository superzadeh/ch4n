import React, { Component } from 'react';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class Board extends Component {
  render() {
    return (
      <MenuItem>{this.props.BoardName}</MenuItem>
    );
  }
};

Board.propsTypes = { BoardName: React.PropTypes.string };