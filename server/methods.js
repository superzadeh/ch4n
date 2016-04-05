import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.methods({
  GetCatalog: function(board) {
    let uri = `http://a.4cdn.org/${board}/catalog.json`;
    console.log(`Requesting ${uri}`);
    return HTTP.get(uri);
  },
  GetBoards: function(board) {
    let uri = `http://a.4cdn.org/boards.json`;
    console.log(`Requesting ${uri}`);
    return HTTP.get(uri);
  },
  GetThread: function(board, threadId) {
    let uri = `http://a.4cdn.org/${board}/thread/${threadId}.json`;
    console.log(`Requesting ${uri}`);
    return HTTP.get(uri);
  }
});
