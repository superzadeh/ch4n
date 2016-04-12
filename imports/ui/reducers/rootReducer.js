import { combineReducers } from 'redux';
import { Meteor } from 'meteor/meteor';
import * as Actions from '../actions/actions';

const initialState = {
  boards: {
    isFetching: false,
    didInvalidate: false,
    list: [],
    current: 'diy'
  },
  threads: {
    isFetching: false,
    didInvalidate: false,
    list: [],
    current: ''
  },
}

const selectBoard = (state = initialState.boards.current, action) => {
  switch (action.type) {
    case Actions.SET_CURRENT_BOARD:
      return action.board;
    default:
      return state;
  }
}
const selectThread = (state = initialState.threads.current, action) => {
  switch (action.type) {
    case Actions.SET_CURRENT_THREAD:
      return action.thread;
    default:
      return state;
  }
}

const boards = (state = initialState.boards, action) => {
  switch (action.type) {
    case Actions.INVALIDATE_BOARDS:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case Actions.REQUEST_BOARDS:
      return Object.assign({}, state, {
        didInvalidate: false,
        isFetching: true
      });
    case Actions.RECEIVE_BOARDS:
      return Object.assign({}, state, {
        list: action.boards,
        isFetching: false
      });
    default:
      return state;
  }
};

const threads = (state = initialState.threads, action) => {
  switch (action.type) {
    case Actions.INVALIDATE_THREADS:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case Actions.REQUEST_THREADS:
      return Object.assign({}, state, {
        didInvalidate: false,
        isFetching: true
      });
    case Actions.RECEIVE_THREADS:
      return Object.assign({}, state, {
        list: action.threads,
        isFetching: false
      });
    case Actions.SHOW_THREAD:
    // Meteor.call('GetThread', action.thread, action.id, (err, response) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     return [...state, { posts: response.data.posts }];
    //   }
    // });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  boards,
  threads,
  selectBoard,
  selectThread
});

export default rootReducer;
