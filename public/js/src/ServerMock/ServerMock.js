define(function(require){
  var AbstractServer = require('Headshot/Server/AbstractServer'),
    Simulator = require('Simulator'),
    Snapshot = require('Headshot/World/Snapshot');

  function ServerMock(world, client){
    AbstractServer.prototype.constructor.apply(this, [world]);

    this.client = client;
    this.latency = 0;
  }
  ServerMock.prototype = new AbstractServer;
  ServerMock.prototype.constructor = ServerMock;

  // Process
  ServerMock.prototype.sync = function(id){
    var snapshot = new Snapshot(id, this.world.get('Player'));

    this.client.exports.sync(snapshot);
  };

  // Input
  ServerMock.prototype.action = function(action){
    setTimeout((function(){
      this.actionsQueue.push(action);
    }).bind(this), this.latency);
  };

  return ServerMock;
});
