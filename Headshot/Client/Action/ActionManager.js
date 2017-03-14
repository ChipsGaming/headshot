define(function(require){
  var ActionFactory = require('Headshot/Action/ActionFactory');

  function ActionManager(server, actionFactory){
    this.server = server;
    this.actionFactory = actionFactory || new ActionFactory;
    this.actionsQueue = [];
  }

  ActionManager.prototype.add = function(action){
    this.actionsQueue.push(action);
  };

  ActionManager.prototype.action = function(data){
    var action = this.actionFactory.create(data);
    this.add(action);
    this.server.action(action);
  };

  return ActionManager;
});
