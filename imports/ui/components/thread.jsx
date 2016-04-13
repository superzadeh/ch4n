import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button';

import { fetchPosts } from '../actions/actions';
import PostCard from './postCard.jsx';

export default class Thread extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadComments();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.thread.id !== this.props.thread.id) {
      this.props.dispatch(fetchPosts(this.props.currentBoard, nextProps.thread.id));
    }
  }
  
  loadComments() {
    this.props.dispatch(fetchPosts(this.props.currentBoard, this.props.thread.id));
  }

  render() {
    if(this.props.thread.posts)
    {
      return (
        <div>
          {this.props.thread.posts.map((post, i) => {
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
    return (<div></div>);
  }
};

Thread.propTypes = {
  thread: React.PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    thread: state.threads.current,
    currentBoard : state.boards.current
  };
};

export default connect(mapStateToProps)(Thread);
