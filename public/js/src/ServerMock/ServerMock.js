define(function(require){
  var ActionsQueue = require('app/ServerMock/ActionsQueue'),
    $ = require('jquery');

  function ServerMock(client, sprite){
    this.client = client;
    this.sprite = sprite;
    this.latency = 0;
    this.update = 1;

    this.actionsQueue = new ActionsQueue;
    this.interval = undefined;
  }

  ServerMock.prototype.action = function(action){
    setTimeout($.proxy(function(){
      this.actionsQueue.push(action);
    }, this), this.latency);
  };

  ServerMock.prototype.run = function(){
    this.interval = setInterval($.proxy(function(){
      if(!this.actionsQueue.has()){
        return;
      }

      var action = this.actionsQueue.shift()
      this.applyAction(action);
    }, this), this.update);

    return this;
  };

  ServerMock.prototype.stop = function(){
    if(this.interval === undefined){
      return;
    }
    clearInterval(this.interval);
    this.interval = undefined;

    return this;
  };

  ServerMock.prototype.applyAction = function(action){
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

    var snapshot = {
      id: action.id,
      state: this.sprite.state
    };
    this.client.exports.sync(snapshot);
  };

  return ServerMock;
});
