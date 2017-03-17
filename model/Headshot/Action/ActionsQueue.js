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
    var newQueue=[];
    i=this.queue.length-1;
    while (i>0) {
      if (this.queue[i].id<action.id) break;
      this.queue[i+1]=this.queue[i];
      i--;
    }
    this.queue[i+1]=action;

    //this.queue.push(action);
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
