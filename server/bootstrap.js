if (Meteor.isServer) {
  Meteor.startup(() => {
    Meteor.methods({
      GetCatalog: function(boardName) {
        return HTTP.get(`http://a.4cdn.org/${boardName}/catalog.json`);
      },
      GetBoards: function(boardName) {
        return HTTP.get(`http://a.4cdn.org/boards.json`);
      }
    });
  });
}
