define(function(require){
  var ServerMock = require('app/ServerMock/ServerMock');

  function ServerMockBuilder(client, sprite){
    this.serverMock = new ServerMock(client, sprite);
  }

  ServerMockBuilder.getInstance = function(client, sprite){
    return new ServerMockBuilder(client, sprite);
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
