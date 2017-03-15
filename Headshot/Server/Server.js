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
  var ActionsQueue = require('./../Action/ActionsQueue'),
    Action = require('./../Action/Action');

  /**
   * @class Server
   * @constructor
   */
  function Server(){
    this.tickrate = 100;
    this.actionsQueue = new ActionsQueue;
    this.interval = undefined;
  }

  // Process
  Server.prototype.tick = function(){
    if(!this.actionsQueue.has()){
      return;
    }
    var lastActionId = this.simulateQueue();
    this.sync(lastActionId);
  };

  Server.prototype.simulateQueue = function(){
    var lastActionId = undefined;
    while(this.actionsQueue.has()){
      var action = this.actionsQueue.shift()
      this.simulateAction(action);
      lastActionId = action.id;
    }

    return lastActionId;
  };

  Server.prototype.simulateAction = function(action){
  };

  Server.prototype.sync = function(id){
  };

  // Control
  Server.prototype.run = function(){
    this.interval = setInterval(
      this.tick.bind(this),
      this.tickrate
    );

    return this;
  };

  Server.prototype.stop = function(){
    if(this.interval === undefined){
      return;
    }
    clearInterval(this.interval);
    this.interval = undefined;

    return this;
  };

  Server.prototype.restart = function(){
    this.stop();
    this.run();

    return this;
  };

  Server.prototype.setTickrate = function(tickrate){
    this.tickrate = tickrate;

    if(this.interval !== undefined){
      this.restart();
    }
  };

  // Input
  Server.prototype.action = function(action){
    this.actionsQueue.push(action);
  };

  module.exports = Server;
});
