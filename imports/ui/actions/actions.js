/*
 * action types
 */
export const REFRESH_BOARDS = 'REFRESH_BOARDS';
export const SET_CURRENT_BOARD = 'SET_CURRENT_BOARD';
export const GO_HOME = 'GO_HOME';
export const REFRESH_THREADS = 'REFRESH_THREADS';
export const SHOW_THREAD = 'SHOW_THREAD';
export const SET_CURRENT_THREAD = 'SET_CURRENT_THREAD';

/*
 * action creators
 */
export function refreshBoards() {
  return {
    type: REFRESH_BOARDS
  }
};

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
};

export function refreshThreads() {
  return {
    type: REFRESH_THREADS
  }
};

export function showThread(id, board) {
  return {
    type: SHOW_THREAD,
    id,
    board
  }
};

export function setCurrentThread(thread) {
  return {
    type: SET_CURRENT_THREAD,
    thread
  }
};