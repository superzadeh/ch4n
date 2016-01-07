Threads = React.createClass({
  getInitialState() {
    return {threads: []};
  },
  componentDidMount() {
    console.log("Threads component did mount");
    this.loadThreads(this.props.ActiveBoard);
  },
  componentWillReceiveProps(nextProps) {
    this.loadThreads(nextProps.ActiveBoard);
  },
  loadThreads(board) {
    var self = this;
    Meteor.call('GetCatalog', board, function(err, response) {
      if (err) {
        console.log(err);
      } else {
        console.log(`Component retrieved threads of board ${self.props.ActiveBoard}:`);
        console.log(response);
        self.setState({threads: response.data[0].threads});
      }
    });
  },
  viewThread(event, args) {
    console.log("Viewing thread ");
    console.log(event);
  },
  render() {
    return (
      <div className="threadsContainer">
        {this.state.threads.map((thread, i) => {
          return (<Thread key={i} Id={thread.no} ThreadImageUrl={`http://i.4cdn.org/${this.props.ActiveBoard}/${thread.tim}${thread.ext}`} Title={thread.sub} Text={thread.com} ViewThreadHandler={this.viewThread}/>);
        })}
      </div>
    );
  }
});
