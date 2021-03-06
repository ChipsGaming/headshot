/**
 * @author Artur Sh. Mamedbekov
 */
if(typeof define !== 'function'){
  var define = require('amdefine')(module);
}

define(function(require, exports, module){
  function Client(id, proxy){
    this.id = id;
    this.proxy = proxy;
  }

  // Create client from connection
  Client.createFromConnection = function(connection){
    return new Client(connection.id, connection.clientProxy);
  };

  module.exports = Client;
});
