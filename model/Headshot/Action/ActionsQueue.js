/**
 * @author Artur Sh. Mamedbekov
 */
if(typeof define !== 'function'){
  var define = require('amdefine')(module);
}

define(function(require, exports, module){
  /**
   * @class ActionsQueue
   * @constructor
   */
  function ActionsQueue(){
    this.queue = [];
  }

  ActionsQueue.prototype.push = function(action){
    this.queue.push(action);
  };

  ActionsQueue.prototype.shift = function(){
    return this.queue.shift();
  };

  ActionsQueue.prototype.peep = function(){
    if(!this.has()){
      return undefined;
    }

    return this.queue[0];
  };

  ActionsQueue.prototype.has = function(){
    return this.queue.length > 0;
  };

  module.exports = ActionsQueue;
});
