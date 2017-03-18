/**
 * @author GebekovAS
 */
if(typeof define !== 'function'){
  var define = require('amdefine')(module);
}

define(function(require, exports, module){
    function WorldObject(id,type){
        
        var objectTypes={player:0, barrier:1};

        this.id=id;
        this.x = 0;
        this.y = 0;
        this.velocity = {};
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.immovable=false;
        this.type=type||objectTypes.player;
    }

    module.exports = WorldObject;
});