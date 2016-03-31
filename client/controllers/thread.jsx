import React from 'react';
import { Meteor } from 'meteor/meteor';

import RaisedButton from 'material-ui/lib/raised-button';

import PostCard from '../../imports/ui/components/postCard.jsx';

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
    // This is bad. Need to add Redux and handle pub/sub instead 
    if (this.isMounted()) {
      this.loadComments(this.props.board, this.props.threadNumber);
    }
  },

  loadComments(board, threadNumber) {
    Meteor.call('GetThread', board, threadNumber, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        // This is bad. Need to add Redux and handle pub/sub instead 
        if (this.isMounted()) {
          this.setState({ posts: response.data.posts });
        }
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
