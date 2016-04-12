import { combineReducers } from 'redux';
import { Meteor } from 'meteor/meteor';
import * as Actions from '../actions/actions';

const initialState = {
  boards: {
    list: [],
    current: 'diy'
  },
  threads: {
    list: [],
    current: ''
  },
}

const boards = (state = initialState.boards, action) => {
  switch (action.type) {
    case Actions.REFRESH_BOARDS:
      // Meteor.call('GetBoards', function(err, response) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     return [
      //       ...state,
      //       {
      //         boards: _.sortBy(response.data.boards, (b) => {
      //           return b.title;
      //         })
      //       }];
      //   }
      // });
      return state;
    case Actions.SET_CURRENT_BOARD:
      return Object.assign({}, state, { current: action.board });
    default:
      return state;
  }
};

const threads = (state = initialState.threads, action) => {
  switch (action.type) {
    case Actions.REFRESH_THREADS:
    // Meteor.call('GetThread', state.currentThread, (err, response) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     return [...state, { threads: response.data[0].threads }];
    //   }
    // });
    case Actions.SHOW_THREAD:
    // Meteor.call('GetThread', action.thread, action.id, (err, response) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     return [...state, { posts: response.data.posts }];
    //   }
    // });
    case Actions.SET_CURRENT_THREAD:
      return Object.assign({}, state, { current: action.thread });
    default:
      return state;
  }
};

const chanApp = combineReducers({
  boards,
  threads
});

export default chanApp;
