/**
 * @author Artur Sh. Mamedbekov
 */
if(typeof define !== 'function'){
  var define = require('amdefine')(module);
}

define(function(require, exports, module){
  function Input(){
    this.keyboard = [];
    this.mouse = [];
  }

  module.exports = Input;
});
