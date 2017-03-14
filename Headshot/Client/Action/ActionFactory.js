define(function(require){
  var Action = require('Headshot/Action/Action');

  function ActionFactory(actionPrototype){
    this.actionPrototype = actionPrototype || Action;
  }

  ActionFactory.prototype.generateId = function(){
    return Date.now();
  };

  ActionFactory.prototype.create = function(data){
    return new this.actionPrototype(this.generateId(), data);
  };

  return ActionFactory;
});
