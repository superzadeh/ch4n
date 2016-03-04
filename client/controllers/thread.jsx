Threads = React.createClass({
  getInitialState() {
    return {posts: []};
  },
  
  componentDidMount() {
    this.loadThreads(this.props.activeBoard);
  },
  
  componentWillReceiveProps(nextProps) {
    this.loadThreads(nextProps.activeBoard);
  },
  
  loadThreads(board) {
    var self = this;
    Meteor.call('GetCatalog', board, function(err, response) {
      if (err) {
        console.log(err);
      } else {
        console.log(`Component retrieved posts of thread ${self.props.threadId}:`);
        console.log(response);
      }
    });
  },
  
  render() {
    return (
      <div>       
      </div>
    );
  }
});
