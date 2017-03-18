/**
 * @author GebekovAS
 */
if(typeof define !== 'function'){
  var define = require('amdefine')(module);
}

define(function(require, exports, module){
    function WorldObject(id,type){
        this.id=id;
        this.x = 0;
        this.y = 0;
        this.velocity = {};
        this.velocity.x = 0;
        this.velocity.y = 0;        
        this.type=type;
    }

    WorldObject.prototype.cloneTo=function(base) {
        base.id=base.id||this.id;
        base.x=base.x||this.x;
        base.y=base.y||this.y;
        base.velocity=base.velocity||this.velocity;
        base.velocity.x=base.velocity.x||this.velocity.x;
        base.velocity.y=base.velocity.y||this.velocity.y;
        base.type=base.type||this.type;
        return base;
    }

    module.exports = WorldObject;
});