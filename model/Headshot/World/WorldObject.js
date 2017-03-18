/**
 * @author GebekovAS
 */
if(typeof define !== 'function'){
  var define = require('amdefine')(module);
}

define(function(require, exports, module){
    function WorldObject(id,enableTarget,type ){
        this.id=id;
        this.x = 0;
        this.y = 0;
        this.type=type;

        //Для интерполяции
        if (enableTarget||false) {
            this.target = {};
            this.target.updateTickRate=0;
            this.target.x = 0;
            this.target.y = 0;
            this.target.startX=0;
            this.target.starty=0;
        }
        
    }

    WorldObject.prototype.cloneTo=function(base) {
        base.id=base.id||this.id;
        base.x=base.x||this.x;
        base.y=base.y||this.y;
        base.type=base.type||this.type;

        if (this.target!=undefined) {
            base.target=base.target||this.target;     
            base.target.step=base.target.step||this.target.step;   
            base.target.x=base.target.x||this.target.x;
            base.target.y=base.target.y||this.target.y;
            base.target.startX=base.target.startX||this.target.startX;
            base.target.startY=base.target.startY||this.target.startY;
        }

        base.setPos=this.setPos;
        base.setTargetPos=this.setTargetPos;

        return base;
    }

    WorldObject.prototype.setTargetPos=function (pos) {
        this.target.startX=this.x;
        this.target.startY=this.y;
        this.target.x=pos.x;
        this.target.y=pos.y;
        this.target.updateTickRate=0;
    }

    WorldObject.prototype.setPos=function(pos) {
        this.x=pos.x;
        this.y=pos.y;
    }

    



    module.exports = WorldObject;
});