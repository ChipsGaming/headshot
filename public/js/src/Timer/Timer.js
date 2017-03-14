define(function(require){
  function Timer(fps){
    this.fps = fps;
    this.timer = undefined;
  }

  Timer.prototype.update = function(){
  };

  Timer.prototype.run = function(){
    if(this.timer !== undefined){
      return;
    }
    this.timer = setInterval(this.update, 1000 / this.fps);
  };

  Timer.prototype.stop = function(){
    if(this.timer === undefined){
      return;
    }
    clearInterval(this.timer);
  };

  return Timer;
});
