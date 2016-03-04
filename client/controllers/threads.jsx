Threads = React.createClass({
  getInitialState() {
    return {threads: []};
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
      <div className="threadCardsContainer">
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
