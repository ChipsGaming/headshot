define(function(require){
  var ServerMock = require('app/ServerMock/ServerMock'),
    Simulator = require('Simulator');

  function ServerMockBuilder(world, client, sprite){
    this.serverMock = new ServerMock(world, client, sprite);
  }

  ServerMockBuilder.getInstance = function(world, client, sprite){
    return new ServerMockBuilder(world, client, sprite);
  };

  ServerMockBuilder.prototype.latency = function(latency){
    this.serverMock.latency = latency;

    return this;
  };

  ServerMockBuilder.prototype.tickrate = function(tickrate){
    this.serverMock.setTickrate(tickrate);

    return this;
  };

  ServerMockBuilder.prototype.build = function(){
    return this.serverMock;
  };

  return ServerMockBuilder;
});
