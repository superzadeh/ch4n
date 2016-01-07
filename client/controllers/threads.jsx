Threads = React.createClass({
  propTypes: {
    BoardName: React.PropTypes.string
  },
  getInitialState() {
    return {threads: []};
  },
  getDefaultProps() {
    var defaultProps = {
      BoardName: "v"
    };
    return defaultProps;
  },
  componentWillMount() {
    console.log("Threads component will mount");
    var self = this;
    Meteor.call('GetCatalog', this.props.BoardName, function(err, response) {
      if (err) {
        console.log(err);
      } else {
        console.log("Component retrieved threads:");
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
            <Thread key={i} Id={thread.no}
            ThreadImageUrl={`http://t.4cdn.org/${this.props.BoardName}/src/${thread.tim}.jpg`}
            Title={thread.sub}
            Text={thread.com}
            ViewThreadHandler={this.viewThread}/>);
        })}
      </div>
    );
  }
});
