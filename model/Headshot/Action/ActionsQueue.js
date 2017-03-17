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

  ActionsQueue.prototype.sort = function(){
    var i = this.queue.length - 1;
    while(this.queue[i - 1].id > this.queue[i].id){
      var prev = this.queue[i - 1];
      this.queue[i - 1] = this.queue[i];
      this.queue[i] = prev;
      i--;
    }
  };

  ActionsQueue.prototype.push = function(action){
    this.queue.push(action);
    this.sort();
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
