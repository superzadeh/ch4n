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
    current: {
      id: 0,
      posts: [],
      isFetching: false
    }
  },
}

const boards = (state = initialState.boards, action) => {
  switch (action.type) {
    case Actions.REQUEST_BOARDS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case Actions.RECEIVE_BOARDS:
      return Object.assign({}, state, {
        list: action.boards,
        isFetching: false
      });
    case Actions.SET_CURRENT_BOARD:
      return Object.assign({}, state, {
        current: action.board
      });
    default:
      return state;
  }
};

const threads = (state = initialState.threads, action) => {
  switch (action.type) {
    case Actions.REQUEST_THREADS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case Actions.RECEIVE_THREADS:
      return Object.assign({}, state, {
        list: action.threads,
        isFetching: false
      });
    case Actions.REQUEST_POSTS:
    case Actions.RECEIVE_POSTS:
    case Actions.SET_CURRENT_THREAD:
     return Object.assign({}, state, {
        current: threadReducer(state.current, action)
      }); 
    default:
      return state;
  }
};

const threadReducer = (state = initialState.threads.current, action) => {
  switch (action.type) {
    case Actions.REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case Actions.RECEIVE_POSTS:
      return Object.assign({}, state, {
        posts: action.posts,
        isFetching: false
      });
    case Actions.SET_CURRENT_THREAD:
      return Object.assign({}, state, {
          id: action.threadId
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  boards,
  threads
});

export default rootReducer;
