import { combineReducers } from 'redux';
import { Meteor } from 'meteor/meteor';

const boardsReducer = (state = [], action) => {
  switch (action.type) {
    case 'REFRESH_BOARDS':
      Meteor.call('GetBoards', function(err, response) {
        if (err) {
          console.log(err);
        } else {
          return [...state, {
            boards: _.sortBy(response.data.boards, (b) => {
              return b.title;
            })
          }];
        }
      });
      break;
    case 'NAVIGATE_TO_BOARD':
      return state;
    default:
      return state;
  }
  return state;
};

const threadsReducer = (state = [], action) => {
  switch (action.type) {
    case 'REFRESH_THREADS':

      break;
    case 'REFRESH_THREAD':

      break;
    case 'SHOW_THREAD':

      break;
    default:
      return state;
  }
  return state;
};

const threadReducer = (state = [], action) => {
  switch (action.type) {
    case 'EXPAND_IMAGE':

      break;
    case 'COLLAPSE_IMAGE':

      break;
    default:
      return state;
  }
  return state;
};

const chanApp = combineReducers({
  boardsReducer,
  threadsReducer,
  threadReducer
});

export default chanApp;
