import fetch from 'isomorphic-fetch'

/*
 * action types
 */
export const REQUEST_BOARDS = 'REQUEST_BOARDS'
export const RECEIVE_BOARDS = 'RECEIVE_BOARDS'
export const SET_CURRENT_BOARD = 'SET_CURRENT_BOARD'
export const GO_HOME = 'GO_HOME'
export const SET_CURRENT_THREAD = 'SET_CURRENT_THREAD'
export const REQUEST_THREADS = 'REQUEST_THREADS'
export const RECEIVE_THREADS = 'RECEIVE_THREADS'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

/*
 * action creators
 */
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

export function requestThreads() {
  return {
    type: REQUEST_THREADS
  }
}

export function receiveThreads(json) {
  return {
    type: RECEIVE_THREADS,
    threads: json.data[0].threads,
  }
}

export function setCurrentThread(threadId) {
  return {
    type: SET_CURRENT_THREAD,
    threadId
  }
}

export function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

export function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json.data.posts,
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

export function fetchThreads(board) {
  return function(dispatch) {
    dispatch(requestThreads());
    return Meteor.promise('GetCatalog', board)
      .then((response) => dispatch(receiveThreads(response)))
      .catch((err) => console.log(err));
  }
}

export function fetchPosts(board, threadId) {
  return function(dispatch) {
    dispatch(requestPosts());
    return Meteor.promise('GetThread', board, threadId)
      .then((response) => dispatch(receivePosts(response)))
      .catch((err) => console.log(err));
  }
}
