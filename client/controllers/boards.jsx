const {LeftNav, FlatButton, MenuItem} = mui;

Boards = React.createClass({
  getInitialState() {
    return {boards: []};
  },
  componentDidMount() {
    console.log("Boards component did mount");
    var self = this;
    Meteor.call('GetBoards', function(err, response) {
      if (err) {
        console.log(err);
      } else {
        console.log(`Retrieved list of boards:`);
        console.log(response);
        self.setState({boards: response.data.boards});
      }
    });
  },
  render() {
    return (
      <LeftNav open={this.props.open}>
        <FlatButton label="back" onClick={this.props.handleToggle}/>
        {this.state.boards.map((board, i) => {
          return (
            <MenuItem key={i}>{board.title}</MenuItem>
          );
        })}
      </LeftNav>
    );
  }
});
