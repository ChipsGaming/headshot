/**
 * @author Artur Sh. Mamedbekov
 */
if(typeof define !== 'function'){
  var define = require('amdefine')(module);
}

define(function(require, exports, module){
  function ClientList(){
    this.list = {};
  }

  ClientList.prototype.add = function(client){
    this.list[client.id] = client;
  };

  ClientList.prototype.hasId = function(id){
    return this.list[id] !== undefined;
  };

  ClientList.prototype.has = function(client){
    return this.hasId(client.id);
  };

  ClientList.prototype.remove = function(id){
    if(!this.hasId(id)){
      return;
    }

    delete this.list[id];
  };

  ClientList.prototype.forEach = function(callback){
    for(var id in this.list){
      callback.call(this, this.list[id]);
    }
  };

  module.exports = ClientList;
});