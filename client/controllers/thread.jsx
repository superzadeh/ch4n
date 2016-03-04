const {
  RaisedButton
} = mui;


Thread = React.createClass({
  propTypes : {
    board: React.PropTypes.string,
    threadNumber: React.PropTypes.string
  },
  
  getInitialState() {
    return { posts: [] };
  },
  
  componentDidMount() {
    this.loadComments(this.props.board, this.props.threadNumber);
  },
  
  componentWillReceiveProps(nextProps) {
    this.loadComments(nextProps.board, nextProps.threadNumber);
  },
  
  loadComments(board, threadNumber) {
    var self = this;
    Meteor.call('GetThread', board, threadNumber, function(err, response) {
      if (err) {
        console.log(err);
      } else {
        console.log(`Component retrieved posts of thread ${self.props.threadNumber}:`);
        console.log(response);
      }
    });
  },
  
  render() {
    return (
      <div>
        <RaisedButton label="return" onClick={this.props.returnHandler}/>
        <br/>
        <span>Wow, much thread</span>
      </div>
    );
  }
});
