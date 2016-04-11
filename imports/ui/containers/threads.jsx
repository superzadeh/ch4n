import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';

import ThreadCard from '../components/threadCard.jsx';
import Thread from '../components/thread.jsx';

export default class Threads extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      threads: [],
      viewingThread: false,
      threadNumber: 0
    };
  }

  componentDidMount() {
    this.loadThreads(this.props.activeBoard);
  }

  componentWillReceiveProps(nextProps) {
    if (this.isMounted()) {
      this.loadThreads(nextProps.activeBoard);
    }
  }

  loadThreads(board) {
    let self = this;
    Meteor.call('GetCatalog', board, function(err, response) {
      if (err) {
        console.log(err);
      } else {
        self.setState({ threads: response.data[0].threads });
      }
    });
  }

  toggleView(index, thread) {
    this.setState({ threadNumber: thread.no, viewingThread: !this.state.viewingThread });
  }

  showList() {
    this.setState({ viewingThread: false });
  }

  refresh() {
    if (!this.state.viewingThread) {
      this.loadThreads(this.props.activeBoard);
    } else {
      this.refs.currentThread.refresh();
    }
  }

  render() {
    return (
      <div className="threadCardsContainer">
        {(() => {
          if (this.state.viewingThread) {
            return (<Thread board={this.props.activeBoard}
              threadNumber={this.state.threadNumber}
              ref="currentThread" />);
          } else {
            return this.state.threads.map((thread, i) => {
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