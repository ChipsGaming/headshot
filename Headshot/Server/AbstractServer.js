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
   * @class AbstractServer
   * @constructor
   */
  function AbstractServer(){
    this.tickrate = 100;
    this.actionsQueue = new ActionsQueue;
    this.interval = undefined;
  }

  // Process
  AbstractServer.prototype.tick = function(){
    if(!this.actionsQueue.has()){
      return;
    }
    var lastActionId = this.simulateQueue();
    this.sync(lastActionId);
  };

  AbstractServer.prototype.simulateQueue = function(){
    var lastActionId = undefined;
    while(this.actionsQueue.has()){
      var action = this.actionsQueue.shift()
      this.simulateAction(action);
      lastActionId = action.id;
    }

    return lastActionId;
  };

  AbstractServer.prototype.simulateAction = function(action){
  };

  AbstractServer.prototype.sync = function(id){
  };

  // Control
  AbstractServer.prototype.run = function(){
    this.interval = setInterval(
      this.tick.bind(this),
      this.tickrate
    );

    return this;
  };

  AbstractServer.prototype.stop = function(){
    if(this.interval === undefined){
      return;
    }
    clearInterval(this.interval);
    this.interval = undefined;

    return this;
  };

  AbstractServer.prototype.restart = function(){
    this.stop();
    this.run();

    return this;
  };

  AbstractServer.prototype.setTickrate = function(tickrate){
    this.tickrate = tickrate;

    if(this.interval !== undefined){
      this.restart();
    }

    return this;
  };

  // Input
  AbstractServer.prototype.action = function(action){
    this.actionsQueue.push(action);
  };

  module.exports = AbstractServer;
});
