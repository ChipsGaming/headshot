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

    module.exports = WorldObject;
});