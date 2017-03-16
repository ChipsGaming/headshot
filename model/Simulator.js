/**
 * @author Artur Sh. Mamedbekov
 */
if(typeof define !== 'function'){
  var define = require('amdefine')(module);
}

define(function(require, exports, module){
  var AbstractSimulator = require('./Headshot/World/AbstractSimulator');

  function Simulator(){
    AbstractSimulator.prototype.constructor.apply(this);
  }
  Simulator.prototype = new AbstractSimulator;
  Simulator.prototype.constructor = Simulator;

  Simulator.prototype.simulate = function(world, action){
    var object = world.get(action.data.objectId);
    if(object === undefined){
      return;
    }

    if(action.data.type == 'left'){
      object.x -= 5;
    }
    else if(action.data.type == 'right'){
      object.x += 5;
    }
  };

  module.exports = Simulator;
});
