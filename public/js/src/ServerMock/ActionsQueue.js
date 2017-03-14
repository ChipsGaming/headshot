define(function(require){
  function ActionsQueue(){
    this.queue = [];
  }

  ActionsQueue.prototype.push = function(action){
    this.queue.push(action);
  };

  ActionsQueue.prototype.shift = function(){
    return this.queue.shift();
  };

  ActionsQueue.prototype.has = function(){
    return this.queue.length > 0;
  };

  return ActionsQueue;
});
