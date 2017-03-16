/**
 * @author Artur Sh. Mamedbekov
 */
if(typeof define !== 'function'){
  var define = require('amdefine')(module);
}

define(function(require, exports, module){
  function AbstractSimulator(){
  }

  AbstractSimulator.prototype.simulate = function(world, action){
  };

  module.exports = AbstractSimulator;
});
