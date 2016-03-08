Meteor.methods({
  GetCatalog: function(board) {
    var uri = `http://a.4cdn.org/${board}/catalog.json`;
    console.log(`Requesting ${uri}`);
    return HTTP.get(uri);
  },
  GetBoards: function(board) {
    var uri = `http://a.4cdn.org/boards.json`;
    console.log(`Requesting ${uri}`);
    return HTTP.get(uri);
  },
  GetThread: function(board, threadId) {
    var uri = `http://a.4cdn.org/${board}/thread/${threadId}.json`;
    console.log(`Requesting ${uri}`);
    return HTTP.get(uri);
  }
});
