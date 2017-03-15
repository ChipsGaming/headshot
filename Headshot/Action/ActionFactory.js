/**
 * @author Artur Sh. Mamedbekov
 */
if(typeof define !== 'function'){
  var define = require('amdefine')(module);
}

define(function(require, exports, module){
  var Action = require('./Action');

  /**
   * @class ActionFactory
   * @constructor
   */
  function ActionFactory(actionPrototype){
    this.actionPrototype = actionPrototype || Action;
  }

  ActionFactory.prototype.generateId = function(){
    return Date.now();
  };

  ActionFactory.prototype.create = function(data){
    return new this.actionPrototype(this.generateId(), data);
  };

  module.exports = ActionFactory;
});
