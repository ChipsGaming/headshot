define(function(require){
  var Action = require('Headshot/Action/Action');

  function ActionFactory(actionPrototype){
    this.actionPrototype = actionPrototype || Action;
    this.currentId = 0;
  }

  ActionFactory.prototype.generateId = function(){
    return this.currentId++;
  };

  ActionFactory.prototype.create = function(data){
    return new this.actionPrototype(this.generateId(), data);
  };

  return ActionFactory;
});
