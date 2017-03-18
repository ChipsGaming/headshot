var AbstractServer = require('./Headshot/Server/AbstractServer'),
  Snapshot = require('./Headshot/World/Snapshot');

function GameServer(world, clients){
  AbstractServer.prototype.constructor.apply(this, [world]);
  this.clients = clients;
}
GameServer.prototype = new AbstractServer;
GameServer.prototype.constructor = GameServer;

GameServer.prototype.sync = function(lastActionsIdsMap){
  var worldState = this.world.objects;
  var world = this.world;
  this.clients.forEach(function(client){
    var id = lastActionsIdsMap[client.id] || 0,
      snapshot = new Snapshot(id, worldState,world.changeTime);

    client.proxy.sync(snapshot);
  });
};

module.exports = GameServer;
