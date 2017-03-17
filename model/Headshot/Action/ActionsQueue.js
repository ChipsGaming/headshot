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
    i=0;
    var nextEl=action;
    var lastEl=action;
    while (i<this.queue.length) {
      if (this.queue[i].id>action.id) {
        nextEl=this.queue[i];
        this.queue[i]=lastEl;
        lastEl=nextEl;
        i++;
        break;
      }
      i++;
    }

    while (i<this.queue.length) {
      nextEl=this.queue[i];
      this.queue[i]=lastEl;   
      lastEl=nextEl;
      i++;
    }
    this.queue[i]=lastEl;

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
