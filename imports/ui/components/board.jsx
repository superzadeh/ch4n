import React from 'react';
import MenuItem from 'material-ui/lib/menus/menu-item';

Board = React.createClass({
  propTypes: {
    BoardName: React.PropTypes.string
  },
  render() {
    return (
      <MenuItem>{this.props.BoardName}</MenuItem>
    );
  }
});
