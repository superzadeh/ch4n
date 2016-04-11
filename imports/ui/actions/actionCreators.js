export const refreshBoards = () => {
  return {
    type: 'REFRESH_BOARDS'
  }
};

export const refreshThreads = () => {
  return {
    type: 'REFRESH_THREADS'
  }
};

export const showThread = (id, board) => {
  return {
    type: 'SHOW_THREAD',
    id,
    board
  }
};

export const expandImage = () => {
  return {
    type: 'EXPAND_IMAGE'
  }
};

export const collapseImage = () => {
  return {
    type: 'COLLAPSE_IMAGE'
  }
};

export const navigateToBoard = (board) => {
  return {
    type: 'NAVIGATE_TO_BOARD',
    board
  }
};
