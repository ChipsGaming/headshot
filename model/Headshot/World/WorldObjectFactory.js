/**
 * @author GebekovAS
 */
if(typeof define !== 'function'){
  var define = require('amdefine')(module);
}

define(function(require, exports, module){
    WorldObject = require('./WorldObject')
    function WorldObjectFactory(){
        this.idIterator=0;
    }

    WorldObjectFactory.prototype.create= function (id) {
        return new WorldObject(id||this.idIterator++);
    }    
    
    module.exports = WorldObjectFactory;
});