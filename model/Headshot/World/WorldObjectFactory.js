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

    WorldObjectFactory.prototype.create= function (id,type) {
        return new WorldObject(id||this.idIterator++,
                                type||this.Types.player);
    }

    WorldObjectFactory.prototype.createFromBase=function (id, base, type) {
        var wObject= new WorldObject(id||this.idIterator++, type||this.Types.player);
        return wObject.cloneTo(base);
    }

    WorldObjectFactory.prototype.Types={player:0, barrier:1};
    
    module.exports = WorldObjectFactory;
});