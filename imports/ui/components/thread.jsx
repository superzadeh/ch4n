import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import RaisedButton from 'material-ui/lib/raised-button';

import PostCard from './postCard.jsx';

export default class Thread extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  componentDidMount() {
    this.refresh();
  }

  componentWillReceiveProps(nextProps) {
    this.loadComments(nextProps.board, nextProps.threadNumber);
  }

  refresh() {
    this.loadComments(this.props.board, this.props.threadNumber);
  }

  loadComments(board, threadNumber) {
    Meteor.call('GetThread', board, threadNumber, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ posts: response.data.posts });
      }
    });
  }

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
};

Thread.propTypes = {
  board: React.PropTypes.string,
  threadNumber: React.PropTypes.number
};