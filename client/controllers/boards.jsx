import React from 'react';
import { Meteor } from 'meteor/meteor';

import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';

Boards = React.createClass({
  propTypes: {
    onBoardChanged: React.PropTypes.func
  },
  getInitialState() {
    return { boards: [] };
  },
  componentDidMount() {
    var self = this;
    Meteor.call('GetBoards', function(err, response) {
      if (err) {
        console.log(err);
      } else {
        self.setState({
          boards: _.sortBy(response.data.boards, (b) => {
            return b.title;
          })
        });
      }
    });
  },
  handleChange(e, index, value) {
    this.props.onBoardChanged(value);
    FlowRouter.go(`/${value}`);
  },
  render() {
    return (
      <DropDownMenu value={this.props.activeBoard} onChange={this.handleChange}>
        {this.state.boards.map((board, i) => {
          return (
            <MenuItem value={board.board} primaryText={board.title} key={i}></MenuItem>
          );
        }) }
      </DropDownMenu>
    );
  }
});
