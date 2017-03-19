/**
 * @author Artur Sh. Mamedbekov
 */
if(typeof define !== 'function'){
  var define = require('amdefine')(module);
}

define(function(require, exports, module){
  function World(simulator, enableInterpolation){
    this.simulator = simulator;
    this.objects = {};

    //Временные метки необходимые для интерполяции
    this.worldTime=0;
    this.duration=0;

    this.updateTickRate=25;

    this.update=function () {};
    this.enableInterpolation=enableInterpolation||false;
    setInterval(update.bind(this),this.updateTickRate);    
  }

  //Задает новое время мира
  World.prototype.setWorldTime=function(newTime) {
    this.duration=this.worldTime==0?10:newTime-this.worldTime;
    this.worldTime=newTime;
  }

  function update () {
    //Интерполяция
    if (this.enableInterpolation) {
      for (var c in this.objects) {
        var player=this.objects[c];
        // Если у объекта есть "цель"
        // цель есть только у Интерполируемых объектов
        if ((player.target!=undefined)&&(this.duration>0)) {
          var duration=this.duration;
          if (player.target.step<=duration) {                      
            var n=player.target.step;

            player.target.step+=this.updateTickRate;

            var startX=player.target.startX;
            var startY=player.target.startY;
            var endX=player.target.x;
            var endY=player.target.y;

            player.setPos(interpolation(n, startX,startY, endX, endY, duration));          
          } else {
            player.setPos({x:player.target.x, y:player.target.y});
          }

        }
      }
    }
  }

  function interpolation(n, startX, startY, endX, endY, duration) {
    return {
      x: linear(startX, endX, n / duration),
      y: linear(startY, endY, n / duration)
    };
  }

  function linear (p0, p1, t) {
    return Math.round((p1 - p0) * t + p0);
  }

  // Controls
  World.prototype.add = function(worldObject){
    this.objects[worldObject.id] = worldObject;
  };

  World.prototype.hasId = function(id){
    return this.objects[id] !== undefined;
  };

  World.prototype.has = function(worldObject){
    return this.hasId(worldObject.id);
  };

  World.prototype.remove = function(id){
    if(!this.hasId(id)){
      return;
    }

    delete this.objects[id];
  };

  World.prototype.get = function(id){
    if(!this.hasId(id)){
      return undefined;
    }
    return this.objects[id];
  };

  // Actions
  World.prototype.simulate = function(action){
    this.simulator.simulate(this, action);
  };

  module.exports = World;
});
