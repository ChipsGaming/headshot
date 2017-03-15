var AbstractServer = require('./../Headshot/Server/AbstractServer'),
  Snapshot = require('./../Headshot/World/Snapshot');

function GameServer(worldState, clients){
  AbstractServer.constructor.apply(this);

  this.worldState = worldState;
  this.clients = clients;
}
GameServer.prototype = new AbstractServer;
GameServer.prototype.constructor = GameServer;

GameServer.prototype.simulateAction = function(action){
  if(action.data.type == 'left'){
    this.worldState = {
      x: this.worldState.x - 5
    };
  }
  else if(action.data.type == 'right'){
    this.worldState = {
      x: this.worldState.x + 5
    };
  }
};

GameServer.prototype.sync = function(id){
  var snapshot = new Snapshot(id, this.worldState);
  for(var id in this.clients){
    this.clients[id].sync(snapshot);
  }
};

module.exports = GameServer;
