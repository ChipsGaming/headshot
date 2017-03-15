define(function(require){
  var AbstractServer = require('Server/AbstractServer');

  function ServerMock(client, sprite){
    AbstractServer.constructor.apply(this);

    this.client = client;
    this.sprite = sprite;
    this.latency = 0;
  }
  ServerMock.prototype = new AbstractServer;
  ServerMock.prototype.constructor = ServerMock;

  // Process
  ServerMock.prototype.simulateAction = function(action){
    if(action.data.type == 'left'){
      this.sprite.update({
        x: this.sprite.state.x - 5
      });
    }
    else if(action.data.type == 'right'){
      this.sprite.update({
        x: this.sprite.state.x + 5
      });
    }
  };

  ServerMock.prototype.sync = function(id){
    var snapshot = {
      id: id,
      state: this.sprite.state
    };
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
