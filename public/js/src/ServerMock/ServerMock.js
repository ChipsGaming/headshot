define(function(require){
  var $ = require('jquery');

  function ServerMock(client, latency, update, sprite){
    this.client = client;
    this.latency = latency;
    this.update = update;
    this.sprite = sprite;
    this.actions = [];
    this.allActions = 0;
    this.interval = undefined;
  }

  ServerMock.prototype.action = function(action){
    setTimeout($.proxy(function(){
      this.actions.push(action);
      this.allActions++;
    }, this), this.latency);
  };

  ServerMock.prototype.run = function(){
    this.interval = setInterval($.proxy(function(){
      if(this.actions.length == 0){
        return;
      }
      var action = this.actions[0];
      this.actions.splice(0, 1);

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
