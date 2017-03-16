var AbstractServer = require('./Headshot/Server/AbstractServer'),
  Snapshot = require('./Headshot/World/Snapshot');

function GameServer(world, clients){
  AbstractServer.prototype.constructor.apply(this, [world]);

  this.clients = clients;
}
GameServer.prototype = new AbstractServer;
GameServer.prototype.constructor = GameServer;

GameServer.prototype.sync = function(id){
  var snapshot = new Snapshot(id, this.world.objects);

  this.clients.forEach(function(client){
    client.proxy.sync(snapshot);
  });
};

module.exports = GameServer;
