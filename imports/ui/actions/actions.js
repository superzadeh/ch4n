import fetch from 'isomorphic-fetch'

/*
 * action types
 */
export const INVALIDATE_BOARDS = 'INVALIDATE_BOARDS'
export const REQUEST_BOARDS = 'REQUEST_BOARDS'
export const RECEIVE_BOARDS = 'RECEIVE_BOARDS'
export const SET_CURRENT_BOARD = 'SET_CURRENT_BOARD'
export const GO_HOME = 'GO_HOME'
export const INVALIDATE_THREADS = 'INVALIDATE_THREADS'
export const SHOW_THREAD = 'SHOW_THREAD'
export const SET_CURRENT_THREAD = 'SET_CURRENT_THREAD'

/*
 * action creators
 */
export function invalidateBoards() {
  return {
    type: INVALIDATE_BOARDS
  }
}

export function requestBoards() {
  return {
    type: REQUEST_BOARDS
  }
}

export function receiveBoards(json) {
  return {
    type: RECEIVE_BOARDS,
    boards: _.sortBy(json.data.boards, (b) => { return b.title; })
  }
}

export function setCurrentBoard(board) {
  return {
    type: SET_CURRENT_BOARD,
    board
  }
}

export function goHome() {
  return {
    type: GO_HOME
  }
}

export function invalidateThreads() {
  return {
    type: INVALIDATE_THREADS
  }
}

export function showThread(id, board) {
  return {
    type: SHOW_THREAD,
    id,
    board
  }
}

export function setCurrentThread(thread) {
  return {
    type: SET_CURRENT_THREAD,
    thread
  }
}

/* 
 * Thunks
 */
export function fetchBoards() {
  return function(dispatch) {
    dispatch(requestBoards());
    return Meteor.promise('GetBoards')
      .then((response) => dispatch(receiveBoards(response)))
      .catch((err) => console.log(err));
  }
}
