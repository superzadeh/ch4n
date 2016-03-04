Meteor.methods({
  GetCatalog: function (board) {
    return HTTP.get(`http://a.4cdn.org/${board}/catalog.json`);
  },
  GetBoards: function (board) {
    return HTTP.get(`http://a.4cdn.org/boards.json`);
  },
  GetThread : function(board, threadId) {
    return  HTTP.get(`http(s)://a.4cdn.org/${board}/thread/${threadId}.json`);
  }
});
