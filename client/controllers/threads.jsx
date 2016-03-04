Threads = React.createClass({
  getInitialState() {
    return {threads: []};
  },
  
  componentDidMount() {
    console.log("Threads component did mount");
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
        console.log(`Component retrieved threads of board ${self.props.activeBoard}:`);
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
          return (
            <ThreadCard key={'thread' + i} 
                    id={thread.no} 
                    threadImageUrl={`http://i.4cdn.org/${this.props.activeBoard}/${thread.tim}${thread.ext}`} 
                    title={thread.sub} 
                    text={thread.com} 
                    viewThreadHandler={this.viewThread}/>);
        })}
      </div>
    );
  }
});
