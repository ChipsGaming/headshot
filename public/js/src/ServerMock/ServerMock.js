define(function(require){
  function ServerMock(client, latency, sprite){
    this.client = client;
    this.latency = latency;
    this.sprite = sprite;
  }

  ServerMock.prototype.action = function(action){
    var sprite = this.sprite,
      client = this.client,
      latency = this.latency / 2;

    setTimeout(function(){
      if(action.data.type == 'left'){
        sprite.update({
          x: sprite.state.x - 5
        });
      }
      else if(action.data.type == 'right'){
        sprite.update({
          x: sprite.state.x + 5
        });
      }
      setTimeout(function(){
        var snapshot = {
          id: action.id,
          state: sprite.state
        };

        client.exports.sync(snapshot);
      }, latency);
    }, latency);
  };

  return ServerMock;
});
