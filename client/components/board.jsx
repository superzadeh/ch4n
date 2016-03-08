const {MenuItem} = mui;

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
