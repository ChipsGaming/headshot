/**
 * @author GebekovAS
 */
if(typeof define !== 'function'){
  var define = require('amdefine')(module);
}

define(function(require, exports, module){
    function D2() {
      
    }

    //Нужно дописать метод
    D2.prototype.enable = function (worldObject) {
      worldObject.body={};
      worldObject.immovable=false;
    }

    module.exports = D2;
});
  