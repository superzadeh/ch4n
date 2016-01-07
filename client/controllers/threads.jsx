Threads = React.createClass({
  getInitialState() {
    return {threads: [], BoardName: "v"};
  },
  componentWillMount(){
    if (window.location.hash) {
      this.setState({BoardName: window.location.hash.replace("#", "")});
    }
  },
  componentDidMount() {
    console.log("Threads component did mount");

    var self = this;
    Meteor.call('GetCatalog', self.state.BoardName, function(err, response) {
      if (err) {
        console.log(err);
      } else {
        console.log(`Component retrieved threads of board ${self.state.BoardName}:`);
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
          return (<Thread key={i} Id={thread.no} ThreadImageUrl={`http://i.4cdn.org/${this.state.BoardName}/${thread.tim}${thread.ext}`} Title={thread.sub} Text={thread.com} ViewThreadHandler={this.viewThread}/>);
        })}
      </div>
    );
  }
});
