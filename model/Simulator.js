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

    if(action.data.input.keyboard[37]){
      object.x -= 5;
      //object.velocity.x = -250;
    }
    if(action.data.input.keyboard[38]){
      object.y -= 5;
      //object.velocity.y = -250;
    }
    if(action.data.input.keyboard[39]){
      object.x += 5;
      //object.velocity.x = 250;
    }
    if(action.data.input.keyboard[40]){
      object.y += 5;
      //object.velocity.y = 250;
    }

    //Временная метка нужна для интерполяции
    world.worldTime=Date.now();

    /*
    if(action.data.input.keyboard[37] === undefined && action.data.input.keyboard[39] === undefined){
      object.velocity.x /= 2;
      if(object.velocity.x < 1 && object.velocity.x > -1){
        object.velocity.x = 0;
      }
    }
    
    if(action.data.input.keyboard[38] === undefined && action.data.input.keyboard[40] === undefined){
      object.velocity.y /= 2;
      if(object.velocity.y < 1 && object.velocity.y > -1){
        object.velocity.y = 0;
      }
    }
    */
  };

  module.exports = Simulator;
});
