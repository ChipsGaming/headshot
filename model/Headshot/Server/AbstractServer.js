/**
 * @author Artur Sh. Mamedbekov
 */
if(typeof define !== 'function'){
  var define = require('amdefine')(module);
}

/**
 * @author Artur Sh. Mamedbekov
 */
define(function(require, exports, module){
  var ActionsQueue = require('./../Action/ActionsQueue');

  /**
   * @class AbstractServer
   * @constructor
   */
  function AbstractServer(world){
    this.world = world;
    this.tickrate = 100;
    this.actionsQueue = new ActionsQueue;
  }

  // Process
  AbstractServer.prototype.tick = function(){
    if(!this.actionsQueue.has()){
      return;
    }
    var lastActionsIdsMap = this.simulateQueue();
    this.sync(lastActionsIdsMap);
  };

  // Simulate game world by clients actions
  AbstractServer.prototype.simulateQueue = function(){
    var lastActionsIdsMap = {};
    // Iterate all actions in queue
    while(this.actionsQueue.has()) {
      // Delete action from queue
      var action = this.actionsQueue.shift()
      // Add action in map
      lastActionsIdsMap[action.data.clientId] = action.id;
      // Simulate action
      this.world.simulate(action);
    }

    return lastActionsIdsMap;
  };

  // Synchronization
  AbstractServer.prototype.sync = function(id){
  };

  // Start game server
  AbstractServer.prototype.run = function(){
    if(this.interval !== undefined){
      return;
    }

    this.interval = setInterval(
      this.tick.bind(this),
      this.tickrate
    );

    return this;
  };

  // Stop game server
  AbstractServer.prototype.stop = function(){
    if(this.interval === undefined){
      return;
    }

    clearInterval(this.interval);
    delete this.interval;

    return this;
  };

  // Restart game server
  AbstractServer.prototype.restart = function(){
    this.stop();
    this.run();

    return this;
  };

  // Set tick rate
  AbstractServer.prototype.setTickrate = function(tickrate){
    this.tickrate = tickrate;

    if(this.interval !== undefined){
      this.restart();
    }

    return this;
  };

  // When client input and server receive action from client
  AbstractServer.prototype.action = function(action){
    this.actionsQueue.push(action);
  };

  module.exports = AbstractServer;
});
