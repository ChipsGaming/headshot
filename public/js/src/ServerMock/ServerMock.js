define(function(require){
  var ActionsQueue = require('Action/ActionsQueue'),
    $ = require('jquery');

  function ServerMock(client, sprite){
    this.client = client;
    this.sprite = sprite;
    this.latency = 0;
    this.tickrate = 1;

    this.actionsQueue = new ActionsQueue;
    this.interval = undefined;
  }

  // Process
  ServerMock.prototype.tick = function(){
    if(!this.actionsQueue.has()){
      return;
    }
    var lastActionId = this.simulateQueue();
    this.sync(lastActionId);
  };

  ServerMock.prototype.simulateQueue = function(){
    var lastActionId = undefined;
    while(this.actionsQueue.has()){
      var action = this.actionsQueue.shift()
      this.simulateAction(action);
      lastActionId = action.id;
    }

    return lastActionId;
  };

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

  // Control
  ServerMock.prototype.run = function(){
    this.interval = setInterval(
      $.proxy(this.tick, this),
      this.tickrate
    );

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

  ServerMock.prototype.restart = function(){
    this.stop();
    this.run();
  };

  ServerMock.prototype.setTickrate = function(tickrate){
    this.tickrate = tickrate;

    if(this.interval !== undefined){
      this.restart();
    }
  };

  // Input
  ServerMock.prototype.action = function(action){
    setTimeout($.proxy(function(){
      this.actionsQueue.push(action);
    }, this), this.latency);
  };

  return ServerMock;
});
