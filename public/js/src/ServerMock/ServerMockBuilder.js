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

  ServerMockBuilder.prototype.update = function(update){
    this.serverMock.update = update;

    return this;
  };

  ServerMockBuilder.prototype.build = function(){
    return this.serverMock;
  };

  return ServerMockBuilder;
});
