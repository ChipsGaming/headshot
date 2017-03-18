/**
 * @author GebekovAS
 */
if(typeof define !== 'function'){
  var define = require('amdefine')(module);
}

define(function(require, exports, module){
    WorldObject = require('./WorldObject');
    
    function WorldObjectFactory(){
        this.idIterator=0;
    }

    WorldObjectFactory.prototype.Types={
      player: 0,
      barrier: 1
    };

    WorldObjectFactory.prototype.create= function (id, enableTarget, type) {
      var id = id || this.idIterator++,
        type = type || this.Types.player;

      return new WorldObject(id, type, enableTarget);
    }

    WorldObjectFactory.prototype.createFromBase = function (id, base, enableTarget, type){
      var wObject = new WorldObject(id, enableTarget, type);

      return wObject.cloneTo(base);
    }

    module.exports = WorldObjectFactory;
});
