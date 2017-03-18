/**
 * @author Artur Sh. Mamedbekov
 */
if(typeof define !== 'function'){
  var define = require('amdefine')(module);
}

define(function(require, exports, module){
  function World(simulator){
    this.simulator = simulator;
    this.objects = {};
  }

  // Controls
  World.prototype.add = function(worldObject){
    this.objects[worldObject.id] = worldObject;
  };

  World.prototype.hasId = function(id){
    return this.objects[id] !== undefined;
  };

  World.prototype.has = function(worldObject){
    return this.hasId(worldObject.id);
  };

  World.prototype.remove = function(id){
    if(!this.hasId(id)){
      return;
    }

    delete this.objects[id];
  };

  World.prototype.get = function(id){
    if(!this.hasId(id)){
      return undefined;
    }
    return this.objects[id];
  };

  // Actions
  World.prototype.simulate = function(action){
    this.simulator.simulate(this, action);
  };

  module.exports = World;
});
