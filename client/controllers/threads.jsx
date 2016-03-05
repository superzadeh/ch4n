Threads = React.createClass({
  propTypes : {
    activeBoard: React.PropTypes.string
  },
  
  getInitialState() {
    return {
      threads: [], 
      viewingThread: false, 
      threadNumber: null
    };
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
  
  toggleView(event, args) {
    this.setState({viewingThread: !this.state.viewingThread});
  },
  
  refresh() {
    if(!this.state.viewingThread){
      this.loadThreads(this.props.activeBoard);      
    } else {
      console.log('refresh current thread');
      this.refs.currentThread.refresh();
    }
  },
  
  render() {
    return (
      <div className="threadCardsContainer">
      {(() => {
        if(this.state.viewingThread) {
          return (<Thread board={this.props.activeBoard} 
                      threadNumber={this.state.threadNumber} 
                      returnHandler={this.toggleView}
                      ref="currentThread" />);
        } else {
          return this.state.threads.map((thread, i) => {
            return (
              <ThreadCard key={'thread' + i} 
                    id={thread.no} 
                    threadImageUrl={`http://t.4cdn.org/${this.props.activeBoard}/${thread.tim}s.jpg`} 
                    title={thread.sub} 
                    text={thread.com} 
                    viewThreadHandler={this.toggleView} />);
            })            
        }
      })()}              
      </div>
    );
  }
});
