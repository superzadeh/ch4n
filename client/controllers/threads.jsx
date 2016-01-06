Threads = React.createClass({
  getInitialState() {
    return {threads: []};
  },
  componentWillMount() {
    console.log("Threads component will mount");
    var self = this;
    $.getJSON('data.json').done((data) => {
      console.log("Component retrieved threads:");
      console.log(data[0].threads);
      self.setState({threads: data[0].threads});
    });
  },
  viewThread(event, args) {
    console.log("Viewing thread ");
    console.log(event);
  },
  render() {
    return (
      <div className="threadsContainer">
        {this.state.threads.map(function(thread, i) {
          return (<Thread Id={thread.no} Title={"Thread n°" + i} ThreadImageUrl={i + ".jpg"} key={i} ViewThreadHandler={this.viewThread}/>);
        })}
      </div>
    );
  }
});
