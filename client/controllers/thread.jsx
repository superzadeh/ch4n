const {
  RaisedButton
} = mui;


Thread = React.createClass({
  propTypes: {
    board: React.PropTypes.string,
    threadNumber: React.PropTypes.number
  },

  getInitialState() {
    return { posts: [] };
  },

  componentDidMount() {
    this.refresh();
  },

  componentWillReceiveProps(nextProps) {
    this.loadComments(nextProps.board, nextProps.threadNumber);
  },

  refresh() {
    this.loadComments(this.props.board, this.props.threadNumber);
  },

  loadComments(board, threadNumber) {
    var self = this;
    Meteor.call('GetThread', board, threadNumber, function(err, response) {
      if (err) {
        console.log(err);
      } else {
        self.setState({ posts: response.data.posts });
      }
    });
  },

  render() {
    return (
      <div>
        {this.state.posts.map((post, i) => {
          return (
            <PostCard key={'post' + i}
              ref={'post' + i}
              post={post}
              thumbnail={`http://t.4cdn.org/${this.props.board}/${post.tim}s.jpg`}
              fullimage={`http://t.4cdn.org/${this.props.board}/${post.tim}${post.ext}`} />);
        })
        }
      </div>
    );
  }
});
