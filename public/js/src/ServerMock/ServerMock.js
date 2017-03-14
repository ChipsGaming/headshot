define(function(require){
  var $ = require('jquery');

  function ServerMock(client, sprite){
    this.client = client;
    this.sprite = sprite;
    this.actionsQueue = [];
    this.allActions = 0;
    this.latency = 0;
    this.update = 1;
    this.interval = undefined;
  }

  ServerMock.prototype.action = function(action){
    setTimeout($.proxy(function(){
      this.actionsQueue.push(action);
      this.allActions++;
    }, this), this.latency);
  };

  ServerMock.prototype.run = function(){
    this.interval = setInterval($.proxy(function(){
      if(this.actionsQueue.length == 0){
        return;
      }
      var action = this.actionsQueue[0];
      this.actionsQueue.splice(0, 1);

      this.applyAction(action);
    }, this), this.update);
  };

  ServerMock.prototype.stop = function(){
    if(this.interval === undefined){
      return;
    }
    clearInterval(this.interval);
    this.interval = undefined;
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
