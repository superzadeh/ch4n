import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import ThreadCard from '../components/threadCard.jsx';
import Thread from '../components/thread.jsx';

import { fetchThreads, setCurrentThread } from '../actions/actions';


export default class Threads extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      viewingThread: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchThreads(this.props.activeBoard));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeBoard !== this.props.activeBoard) {
      this.props.dispatch(fetchThreads(nextProps.activeBoard));
    }  
  }

  toggleView(index, thread) {
    this.props.dispatch(setCurrentThread(thread.no));
    this.setState({ viewingThread: !this.state.viewingThread });
  }

  showList() {
    this.setState({ viewingThread: false });
  }

  refresh() {
    if (!this.state.viewingThread) {
      this.props.dispatch(fetchThreads(this.props.currentThread));
    } else {
      this.refs.currentThread.refresh();
    }
  }

  render() {
    return (
      <div className="threadCardsContainer">
        {(() => {
          if (this.state.viewingThread) {
            return (<Thread threadNumber={this.props.currentThread.id} ref="currentThread" />);
          } else {
            return this.props.threads.map((thread, i) => {
              return (
                <ThreadCard key={'thread' + i}
                  ref={'thread' + i}
                  thread={thread}
                  thumbnail={`http://t.4cdn.org/${this.props.activeBoard}/${thread.tim}s.jpg`}
                  fullimage={`http://t.4cdn.org/${this.props.activeBoard}/${thread.tim}${thread.ext}`}
                  viewThreadHandler={this.toggleView.bind(this, i, thread) } />);
            })
          }
        })() }
      </div>
    );
  }
};

Threads.propTypes = {
  activeBoard: React.PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    currentThread: state.threads.current,
    threads: state.threads.list,
    activeBoard: state.boards.current
  };
};

export default connect(mapStateToProps)(Threads);
