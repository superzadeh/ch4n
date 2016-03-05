Meteor.methods({
  GetCatalog: function (board) {
    return HTTP.get(`http://a.4cdn.org/${board}/catalog.json`);
  },
  GetBoards: function (board) {
    return HTTP.get(`http://a.4cdn.org/boards.json`);
  },
  GetThread : function(board, threadId) {
    console.log(`http://a.4cdn.org/${board}/thread/${threadId}.json`);
    return HTTP.get(`http://a.4cdn.org/${board}/thread/${threadId}.json`);
  }
});
